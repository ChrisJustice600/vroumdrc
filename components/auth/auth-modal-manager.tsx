"use client";

import { auth } from "@/lib/firebase";
import { fetchUserByPhone, upsertUserServer } from "@/lib/serverUser";
import { setSessionCookie } from "@/lib/sessionClient";
import { useSessionUser } from "@/lib/useSessionUser";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SimpleLoginModal } from "./simple-login-modal";
import { SimpleOTPModal } from "./simple-otp-modal";
import { SimpleSignupModal } from "./simple-signup-modal";

type ModalStep = "closed" | "login" | "signup" | "otp";

interface AuthModalManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModalManager({ isOpen, onClose }: AuthModalManagerProps) {
  const [currentStep, setCurrentStep] = useState<ModalStep>("login");
  const [userData, setUserData] = useState({
    phone: "",
    fullName: "",
    isSignup: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const { refresh } = useSessionUser();

  const buttonId = useMemo(() => "sign-in-button", []);
  const recaptchaReadyRef = useRef(false);

  useEffect(() => {
    try {
      auth.languageCode = "fr";
    } catch {}
  }, []);

  const ensureInvisibleRecaptcha = useCallback(() => {
    if (recaptchaReadyRef.current) return;
    if (typeof window === "undefined") return;
    // Ne créer le verifier que si le bouton existe (modale ouverte)
    const el = document.getElementById(buttonId);
    if (!el) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!w.recaptchaVerifier) {
      try {
        w.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
          size: "invisible",
          callback: () => {},
        });
        recaptchaReadyRef.current = true;
      } catch {}
    } else {
      recaptchaReadyRef.current = true;
    }
  }, [buttonId]);

  // Initialiser reCAPTCHA uniquement quand la modale d'auth est ouverte
  useEffect(() => {
    if (!isOpen) return;
    if (currentStep !== "login" && currentStep !== "signup") return;
    ensureInvisibleRecaptcha();
  }, [isOpen, currentStep, ensureInvisibleRecaptcha]);

  const handleClose = () => {
    setCurrentStep("login");
    setUserData({ phone: "", fullName: "", isSignup: false });
    onClose();
  };

  const handleLogin = async (phone: string) => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (!phone.startsWith("+")) {
        throw new Error("Utilisez le format international, ex: +33612345678");
      }

      const existing = await fetchUserByPhone(phone);
      if (!existing) {
        setError("Compte non trouvé. Veuillez vous inscrire.");
        return;
      }

      ensureInvisibleRecaptcha();
      // s'assurer que le container existe
      const el = document.getElementById(buttonId);
      if (!el) {
        throw new Error("reCAPTCHA non prêt, réessayez");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      const appVerifier = w.recaptchaVerifier as RecaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setUserData({ phone, fullName: "", isSignup: false });
      setConfirmation(result);
      setInfo("SMS envoyé. Entrez le code reçu.");
      setCurrentStep("otp");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Échec d'envoi du SMS";
      setError(msg);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (w.recaptchaVerifier?.render) {
          const widgetId = await w.recaptchaVerifier.render();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).grecaptcha?.reset?.(widgetId);
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (fullName: string, phone: string) => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (!phone.startsWith("+")) {
        throw new Error("Utilisez le format international, ex: +33612345678");
      }
      if (fullName.trim().length < 2) {
        throw new Error("Nom trop court");
      }
      const existing = await fetchUserByPhone(phone);
      if (existing) {
        throw new Error("Un compte existe déjà avec ce numéro");
      }

      ensureInvisibleRecaptcha();
      const el = document.getElementById(buttonId);
      if (!el) {
        throw new Error("reCAPTCHA non prêt, réessayez");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      const appVerifier = w.recaptchaVerifier as RecaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setUserData({ phone, fullName, isSignup: true });
      setConfirmation(result);
      setInfo("SMS envoyé. Entrez le code reçu.");
      setCurrentStep("otp");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Échec d'envoi du SMS";
      setError(msg);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (w.recaptchaVerifier?.render) {
          const widgetId = await w.recaptchaVerifier.render();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).grecaptcha?.reset?.(widgetId);
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    setError(null);
    setInfo(null);
    if (!confirmation) {
      setError("Aucune demande en cours");
      return;
    }
    setLoading(true);
    try {
      const cred = await confirmation.confirm(otp);
      const firebaseUser = cred.user;
      const uid = firebaseUser.uid;

      let serverUser = await fetchUserByPhone(userData.phone);
      if (!serverUser) {
        serverUser = await upsertUserServer({
          id: uid,
          phoneNumber: userData.phone,
          displayName:
            userData.fullName || firebaseUser.displayName || undefined,
        });
      } else {
        serverUser = await upsertUserServer({
          id: uid,
          phoneNumber: userData.phone,
          displayName:
            serverUser.displayName ?? (userData.fullName || undefined),
        });
      }
      await setSessionCookie(serverUser.id);
      setInfo("Connecté avec succès");
      setConfirmation(null);
      handleClose();
      // notifier la navbar/session
      try {
        await refresh();
        window.dispatchEvent(new Event("session:updated"));
      } catch {}
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Code invalide";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setError(null);
      setInfo(null);
      setLoading(true);
      await handleLogin(userData.phone);
      setInfo("Code renvoyé");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToAuth = () => {
    setCurrentStep(userData.isSignup ? "signup" : "login");
  };

  if (currentStep === "otp") {
    return (
      <SimpleOTPModal
        isOpen={isOpen}
        onClose={handleClose}
        onVerify={handleOTPVerify}
        onBack={handleBackToAuth}
        onResend={handleResendOTP}
        phoneNumber={userData.phone}
        isSignup={userData.isSignup}
        loading={loading}
        error={error}
        info={info}
      />
    );
  }

  if (currentStep === "signup") {
    return (
      <SimpleSignupModal
        isOpen={isOpen}
        onClose={handleClose}
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentStep("login")}
        loading={loading}
        error={error}
        info={info}
        submitButtonId={buttonId}
      />
    );
  }

  return (
    <SimpleLoginModal
      isOpen={isOpen}
      onClose={handleClose}
      onLogin={handleLogin}
      onSwitchToSignup={() => setCurrentStep("signup")}
      loading={loading}
      error={error}
      info={info}
      submitButtonId={buttonId}
    />
  );
}
