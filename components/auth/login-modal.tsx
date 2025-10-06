"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOTPAuth } from "@/lib/auth-otp";
import { Loader2, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { OTPVerification } from "./otp-verification";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "name">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { sendOTP } = useOTPAuth();

  const cleanPhone = (val: string) => val.replace(/\D/g, "");

  const formatPhone = (val: string) => {
    const c = cleanPhone(val);
    if (c.length === 0) return "";
    if (c.length <= 3) return `+${c}`;
    if (c.length <= 6) return `+${c.slice(0, 3)} ${c.slice(3)}`;
    return `+${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6, 9)} ${c.slice(
      9,
      12
    )}`;
  };

  const handleSendCode = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await sendOTP(phone, isSignUp ? fullName : undefined);
      if (res.success) setStep("otp");
      else setError(res.message);
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = async () => {
    // For now, always go to name step for new users
    // You can modify this logic based on your API response
    setStep("name");
  };

  const handleSaveName = async () => {
    if (!fullName.trim()) return;
    setLoading(true);
    // Appel API pour mettre à jour le nom
    await fetch("/api/auth/update-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ fullName }),
    });
    setLoading(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhone("");
      setFullName("");
      setError("");
      setIsSignUp(false);
    }
  }, [isOpen]);

  if (step === "otp")
    return (
      <OTPVerification
        phoneNumber={phone}
        isSignUp={isSignUp}
        fullName={fullName}
        onSuccess={handleOTPVerified}
        onBack={() => setStep("phone")}
        onClose={onClose}
      />
    );

  if (step === "name")
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md rounded-2xl bg-white/70 backdrop-blur-xl dark:bg-black/70 border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Un dernier détail</DialogTitle>
            <DialogDescription>
              Comment souhaitez-vous être appelé ?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="name">Prénom ou nom complet</Label>
            <Input
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jean Dupont"
              className="text-lg"
            />
            <Button
              onClick={handleSaveName}
              disabled={loading || !fullName.trim()}
              className="w-full bg-[#a99df1] hover:bg-red-600 text-white"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Commencer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-white/70 backdrop-blur-xl dark:bg-black/70 border border-white/20 shadow-2xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl">
            {isSignUp ? "Créer un compte" : "Se connecter"}
          </DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Créez votre compte pour commencer"
              : "Entrez votre numéro pour recevoir un code par SMS"}
          </DialogDescription>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-0 right-0"
          >
            {/* <X className="w-4 h-4" /> */}
          {/* </Button> */}
        </DialogHeader>

        <Tabs
          value={isSignUp ? "signup" : "signin"}
          onValueChange={(value) => setIsSignUp(value === "signup")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-4">
            <div className="relative">
              <Label htmlFor="phone-signin" className="mb-2">
                Numéro de téléphone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone-signin"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="+243 810 98 09 44"
                  maxLength={17}
                  className="pl-10 text-lg"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-[#a99df1] bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              onClick={handleSendCode}
              disabled={loading || cleanPhone(phone).length < 10}
              className="w-full bg-[#a99df1] hover:bg-red-600 text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Recevoir le code"
              )}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-4">
            <div className="relative">
              <Label htmlFor="name-signup" className="mb-2">
                Nom complet
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name-signup"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="pl-10 text-lg"
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="phone-signup" className="mb-2">
                Numéro de téléphone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone-signup"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="+243 810 98 09 44"
                  maxLength={17}
                  className="pl-10 text-lg"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-[#a99df1] bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              onClick={handleSendCode}
              disabled={
                loading || cleanPhone(phone).length < 10 || !fullName.trim()
              }
              className="w-full bg-[#a99df1] hover:bg-red-600 text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Créer le compte"
              )}
            </Button>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-center text-gray-400">
          En continuant, vous acceptez nos{" "}
          <a href="#" className="underline">
            Conditions
          </a>{" "}
          et{" "}
          <a href="#" className="underline">
            Confidentialité
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
