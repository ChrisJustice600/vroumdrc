"use client";

import { useState } from "react";
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

  const handleClose = () => {
    setCurrentStep("login");
    setUserData({ phone: "", fullName: "", isSignup: false });
    onClose();
  };

  const handleLogin = (phone: string) => {
    setUserData({ phone, fullName: "", isSignup: false });
    setCurrentStep("otp");
  };

  const handleSignup = (fullName: string, phone: string) => {
    setUserData({ phone, fullName, isSignup: true });
    setCurrentStep("otp");
  };

  const handleOTPVerify = (otp: string) => {
    // Ici vous pourrez ajouter la logique de vérification OTP
    console.log("Code OTP:", otp);
    console.log("Données utilisateur:", userData);

    // Simuler une vérification réussie
    alert(`${userData.isSignup ? "Inscription" : "Connexion"} réussie !`);
    handleClose();
  };

  const handleResendOTP = () => {
    // Ici vous pourrez ajouter la logique de renvoi du code OTP
    console.log("Renvoi du code OTP pour:", userData.phone);
    alert("Code OTP renvoyé !");
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
      />
    );
  }

  return (
    <SimpleLoginModal
      isOpen={isOpen}
      onClose={handleClose}
      onLogin={handleLogin}
      onSwitchToSignup={() => setCurrentStep("signup")}
    />
  );
}
