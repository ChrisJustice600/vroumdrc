"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOTPAuth } from "@/lib/auth-otp";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Phone,
  RefreshCw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface OTPVerificationProps {
  phoneNumber: string;
  isSignUp: boolean;
  fullName?: string;
  onSuccess: () => void;
  onBack: () => void;
  onClose: () => void;
}

export function OTPVerification({
  phoneNumber,
  isSignUp,
  fullName,
  onSuccess,
  onBack,
  onClose,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { verifyOTP, resendOTP } = useOTPAuth();

  // Timer pour le renvoi
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setStatus("idle");
    setMessage("");
  };

  const handleVerify = useCallback(
    async (otpCode: string) => {
      setIsLoading(true);
      setStatus("idle");
      setMessage("");

      try {
        const result = await verifyOTP(phoneNumber, otpCode);

        if (result.success) {
          setStatus("success");
          setMessage(result.message || "Code vérifié avec succès");
          onSuccess();
        } else {
          setStatus("error");
          setMessage(result.message || "Code incorrect");
          setOtp("");
        }
        return result;
      } catch {
        setStatus("error");
        setMessage("Erreur lors de la vérification. Veuillez réessayer.");
        setOtp("");
        return {
          success: false,
          message: "Erreur lors de la vérification. Veuillez réessayer.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [verifyOTP, phoneNumber, onSuccess]
  );

  const handleResend = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setStatus("idle");
    setMessage("");

    try {
      const result = await resendOTP(phoneNumber);

      if (result.success) {
        setOtp("");
        setTimeLeft(60);
        setCanResend(false);
        setMessage(result.message || "Nouveau code envoyé");
      } else {
        setStatus("error");
        setMessage(result.message || "Erreur lors du renvoi");
      }
      return result;
    } catch {
      setStatus("error");
      setMessage("Erreur lors du renvoi du code. Veuillez réessayer.");
      return {
        success: false,
        message: "Erreur lors du renvoi du code. Veuillez réessayer.",
      };
    } finally {
      setIsResending(false);
    }
  };

  // Auto-vérification quand le code est complet
  useEffect(() => {
    if (otp.length === 6 && !isLoading) {
      handleVerify(otp);
    }
  }, [otp, isLoading, handleVerify]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Vérification du code
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-600">
            Nous avons envoyé un code de vérification à{" "}
            <span className="font-semibold text-gray-900">{phoneNumber}</span>
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#a99df1]" />
              Code de vérification
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? `Bienvenue ${fullName} ! Entrez le code reçu par SMS`
                : "Entrez le code à 6 chiffres reçu par SMS"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Code de vérification
                </h3>
                <p className="text-sm text-gray-600">
                  Entrez le code à 6 chiffres reçu par SMS
                </p>
              </div>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => handleOtpChange(value)}
                  disabled={isLoading}
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} value={otp[0] || ""} />
                    <InputOTPSlot index={1} value={otp[1] || ""} />
                    <InputOTPSlot index={2} value={otp[2] || ""} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} value={otp[3] || ""} />
                    <InputOTPSlot index={4} value={otp[4] || ""} />
                    <InputOTPSlot index={5} value={otp[5] || ""} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Messages de statut */}
            {message && (
              <div
                className={`flex items-center gap-2 text-sm p-3 rounded-sm ${
                  status === "success"
                    ? "text-green-700 bg-green-50 border border-green-200"
                    : status === "error"
                    ? "text-[#3a3367] bg-red-50 border border-red-200"
                    : "text-blue-700 bg-blue-50 border border-blue-200"
                }`}
              >
                {status === "success" && <CheckCircle className="h-4 w-4" />}
                {status === "error" && <X className="h-4 w-4" />}
                {message}
              </div>
            )}

            {/* Bouton de renvoi */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-[#a99df1] hover:text-red-600 text-sm font-medium disabled:opacity-50"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                      Renvoi en cours...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="inline mr-2 h-4 w-4" />
                      Renvoyer le code
                    </>
                  )}
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Renvoyer le code dans {timeLeft}s
                </p>
              )}
            </div>

            {/* Bouton retour */}
            <div className="pt-4 border-t">
              <button
                onClick={onBack}
                className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Modifier le numéro de téléphone
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Vous n'avez pas reçu le code ? Vérifiez vos messages SMS.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
