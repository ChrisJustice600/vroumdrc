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
import { Phone, User } from "lucide-react";
import { useState } from "react";

interface SimpleSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (fullName: string, phone: string) => void;
  onSwitchToLogin: () => void;
}

export function SimpleSignupModal({
  isOpen,
  onClose,
  onSignup,
  onSwitchToLogin,
}: SimpleSignupModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const cleanPhone = (val: string) => val.replace(/\D/g, "");

  const formatPhone = (val: string) => {
    const c = cleanPhone(val);
    if (c.length === 0) return "";
    if (c.length <= 3) return `+${c}`;
    if (c.length <= 6) return `+${c.slice(0, 3)} ${c.slice(3)}`;
    return `+${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6, 9)} ${c.slice(9, 12)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && cleanPhone(phone).length >= 10) {
      onSignup(fullName.trim(), phone);
    }
  };

  const handleClose = () => {
    setFullName("");
    setPhone("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">S'inscrire</DialogTitle>
          <DialogDescription className="text-center">
            Créez votre compte pour commencer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
                className="pl-10 mt-2 text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="+243 810 98 09 44"
                maxLength={17}
                className="pl-10 mt-2 text-lg"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!fullName.trim() || cleanPhone(phone).length < 10}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Créer le compte
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Se connecter
            </button>
          </p>
        </div>

        <p className="text-xs text-center text-gray-400">
          En continuant, vous acceptez nos{" "}
          <a href="#" className="underline hover:text-gray-600">
            Conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="#" className="underline hover:text-gray-600">
            Politique de confidentialité
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
