"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP } from "@/components/ui/input-otp";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";

interface SimpleOTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
  phoneNumber: string;
  isSignup?: boolean;
  loading?: boolean;
  error?: string | null;
  info?: string | null;
}

export function SimpleOTPModal({
  isOpen,
  onClose,
  onVerify,
  onBack,
  onResend,
  phoneNumber,
  isSignup = false,
  loading = false,
  error = null,
  info = null,
}: SimpleOTPModalProps) {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    await onResend();
    // Simuler un délai pour l'UX
    setTimeout(() => setIsResending(false), 1000);
  };

  const handleClose = () => {
    setOtp("");
    onClose();
  };

  const handleBack = () => {
    setOtp("");
    onBack();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-2xl text-center">
                Vérification
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-center">
            Nous avons envoyé un code de vérification à<br />
            <span className="font-medium text-gray-800">{phoneNumber}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          {info && (
            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
              {info}
            </div>
          )}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            aria-busy={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            {loading
              ? "Vérification..."
              : isSignup
                ? "Créer le compte"
                : "Se connecter"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Vous n'avez pas reçu le code ?
            </p>
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Renvoyer le code"
              )}
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400">
          Le code expire dans 5 minutes
        </p>
      </DialogContent>
    </Dialog>
  );
}
