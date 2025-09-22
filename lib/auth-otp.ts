// Services d'authentification OTP
export interface OTPResponse {
  success: boolean;
  message: string;
  data?: {
    phoneNumber: string;
    expiresAt: Date;
  };
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      phoneNumber: string;
      fullName?: string;
      verified: boolean;
      isRegistered: boolean;
    };
    token?: string;
  };
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
  data?: {
    phoneNumber: string;
    expiresAt: Date;
  };
}

// Simulation des appels API - À remplacer par de vrais appels
export class AuthOTPService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  // Envoyer un code OTP
  static async sendOTP(
    phoneNumber: string,
    fullName?: string
  ): Promise<OTPResponse> {
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ici vous feriez un vrai appel API :
      // const response = await fetch(`${this.baseUrl}/auth/send-otp`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phoneNumber: this.cleanPhoneNumber(phoneNumber),
      //     fullName,
      //   }),
      // });

      // Pour la démo, on simule un succès
      return {
        success: true,
        message: "Code OTP envoyé avec succès",
        data: {
          phoneNumber: this.cleanPhoneNumber(phoneNumber),
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
      };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'OTP:", error);
      return {
        success: false,
        message: "Erreur lors de l'envoi du code. Veuillez réessayer.",
      };
    }
  }

  // Vérifier un code OTP
  static async verifyOTP(
    phoneNumber: string,
    otpCode: string
  ): Promise<VerifyOTPResponse> {
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Ici vous feriez un vrai appel API :
      // const response = await fetch(`${this.baseUrl}/auth/verify-otp`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phoneNumber: this.cleanPhoneNumber(phoneNumber),
      //     code: otpCode,
      //   }),
      // });

      // Pour la démo, on accepte le code "123456"
      if (otpCode === "123456") {
        return {
          success: true,
          message: "Code vérifié avec succès",
          data: {
            user: {
              id: "user_" + Date.now(),
              phoneNumber: this.cleanPhoneNumber(phoneNumber),
              fullName: "Utilisateur Test",
              verified: true,
              isRegistered: true,
            },
            token: "demo_token_" + Date.now(),
          },
        };
      } else {
        return {
          success: false,
          message: "Code incorrect. Veuillez réessayer.",
        };
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'OTP:", error);
      return {
        success: false,
        message: "Erreur lors de la vérification. Veuillez réessayer.",
      };
    }
  }

  // Renvoyer un code OTP
  static async resendOTP(phoneNumber: string): Promise<ResendOTPResponse> {
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ici vous feriez un vrai appel API :
      // const response = await fetch(`${this.baseUrl}/auth/resend-otp`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phoneNumber: this.cleanPhoneNumber(phoneNumber),
      //   }),
      // });

      return {
        success: true,
        message: "Nouveau code OTP envoyé",
        data: {
          phoneNumber: this.cleanPhoneNumber(phoneNumber),
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
      };
    } catch (error) {
      console.error("Erreur lors du renvoi de l'OTP:", error);
      return {
        success: false,
        message: "Erreur lors du renvoi du code. Veuillez réessayer.",
      };
    }
  }

  // Nettoyer le numéro de téléphone
  private static cleanPhoneNumber(phoneNumber: string): string {
    // Supprimer tous les caractères non numériques sauf le +
    return phoneNumber.replace(/[^\d+]/g, "");
  }

  // Valider le format du numéro de téléphone
  static validatePhoneNumber(phoneNumber: string): boolean {
    const cleaned = this.cleanPhoneNumber(phoneNumber);
    // Format basique pour les numéros internationaux
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(cleaned) && cleaned.length >= 10;
  }

  // Valider le nom complet
  static validateFullName(fullName: string): boolean {
    return fullName.trim().length >= 2 && fullName.trim().length <= 50;
  }

  // Valider le code OTP
  static validateOTPCode(otpCode: string): boolean {
    return /^\d{6}$/.test(otpCode);
  }
}

// Hook personnalisé pour l'authentification OTP
export function useOTPAuth() {
  const sendOTP = async (phoneNumber: string, fullName?: string) => {
    if (!AuthOTPService.validatePhoneNumber(phoneNumber)) {
      throw new Error("Format de numéro de téléphone invalide");
    }

    if (fullName && !AuthOTPService.validateFullName(fullName)) {
      throw new Error("Le nom doit contenir entre 2 et 50 caractères");
    }

    return await AuthOTPService.sendOTP(phoneNumber, fullName);
  };

  const verifyOTP = async (phoneNumber: string, otpCode: string) => {
    if (!AuthOTPService.validatePhoneNumber(phoneNumber)) {
      throw new Error("Format de numéro de téléphone invalide");
    }

    if (!AuthOTPService.validateOTPCode(otpCode)) {
      throw new Error("Le code doit contenir 6 chiffres");
    }

    return await AuthOTPService.verifyOTP(phoneNumber, otpCode);
  };

  const resendOTP = async (phoneNumber: string) => {
    if (!AuthOTPService.validatePhoneNumber(phoneNumber)) {
      throw new Error("Format de numéro de téléphone invalide");
    }

    return await AuthOTPService.resendOTP(phoneNumber);
  };

  return {
    sendOTP,
    verifyOTP,
    resendOTP,
    validatePhoneNumber: AuthOTPService.validatePhoneNumber,
    validateFullName: AuthOTPService.validateFullName,
    validateOTPCode: AuthOTPService.validateOTPCode,
  };
}
