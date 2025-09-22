"use client";

import { OTPVerification } from "@/components/auth/otp-verification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DemoOTPPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async (otpCode: string) => {
    setIsLoading(true);
    setMessage("");

    // Simulation de vérification
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (otpCode === "123456") {
      setMessage("Code vérifié avec succès !");
      return { success: true, message: "Code vérifié avec succès !" };
    } else {
      setMessage("Code incorrect. Veuillez réessayer.");
      return { success: false, message: "Code incorrect. Veuillez réessayer." };
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessage("Nouveau code envoyé !");
    setIsLoading(false);
    return { success: true, message: "Nouveau code envoyé !" };
  };

  const handleSimpleVerify = async () => {
    if (otp.length !== 6) {
      setMessage("Veuillez entrer le code complet");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (otp === "123456") {
      setMessage("Code vérifié avec succès !");
    } else {
      setMessage("Code incorrect. Veuillez réessayer.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Démonstration des composants OTP
          </h1>
          <p className="text-lg text-gray-600">
            Testez les différents composants OTP avec notre thème rouge
            personnalisé
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Composant OTP simple */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-red-500" />
                InputOTP Simple
              </CardTitle>
              <CardDescription>
                Composant OTP basique avec séparateur et auto-focus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Code de vérification</Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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

              <Button
                onClick={handleSimpleVerify}
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  "Vérifier le code"
                )}
              </Button>

              {message && (
                <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-sm">
                  {message}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Composant OTP complet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-red-500" />
                OTP Complet
              </CardTitle>
              <CardDescription>
                Composant OTP avec auto-vérification et renvoi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OTPVerification
                phoneNumber="+243 810 98 09 44"
                isSignUp={true}
                fullName="Jean Dupont"
                onSuccess={() => setMessage("Connexion réussie !")}
                onBack={() => setMessage("Retour à la saisie du numéro")}
                onClose={() => setMessage("Modal fermé")}
              />
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Instructions de test</CardTitle>
            <CardDescription>
              Utilisez le code{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">123456</code> pour
              tester la vérification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Fonctionnalités :
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Auto-focus sur les champs vides</li>
                  <li>Support du collage (paste) de codes complets</li>
                  <li>Navigation au clavier (flèches, backspace)</li>
                  <li>Auto-vérification quand le code est complet</li>
                  <li>Compteur de temps pour le renvoi</li>
                  <li>Messages d'état (succès, erreur, info)</li>
                  <li>Thème rouge personnalisé</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Codes de test :
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      123456
                    </code>{" "}
                    - Code valide
                  </li>
                  <li>Tout autre code - Code invalide</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
