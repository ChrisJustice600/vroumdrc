"use client";

import { AuthModalManager } from "@/components/auth/auth-modal-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSessionUser } from "@/lib/useSessionUser";
import {
  Camera,
  Car,
  Euro,
  Loader2,
  MapPin,
  Settings,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Données mockées pour les options
const mockData = {
  brands: [
    "BMW",
    "Audi",
    "Mercedes",
    "Volkswagen",
    "Toyota",
    "Honda",
    "Nissan",
    "Ford",
    "Peugeot",
    "Renault",
    "Citroën",
    "Opel",
  ],
  fuelTypes: ["Essence", "Diesel", "Hybride", "Électrique", "GPL"],
  transmissions: ["Manuelle", "Automatique", "Semi-automatique"],
  bodyTypes: [
    "Berline",
    "SUV",
    "Break",
    "Coupé",
    "Cabriolet",
    "Monospace",
    "Pick-up",
    "Utilitaire",
  ],
  conditions: ["Occasion", "Sans plaque", "Reconditionné", "Neuf"],
  colors: [
    "Blanc",
    "Noir",
    "Gris",
    "Rouge",
    "Bleu",
    "Vert",
    "Jaune",
    "Orange",
    "Marron",
    "Beige",
    "Argent",
  ],
};

interface CarFormData {
  // Informations générales
  brand: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  condition: string;

  // Caractéristiques techniques
  fuel: string;
  transmission: string;
  bodyType: string;
  color: string;
  engineSize: string;
  doors: string;
  cylinders: string;

  // Localisation et contact
  location: string;
  phone: string;
  email: string;

  // Description
  description: string;
  features: string;

  // Images
  images: File[];
}

export function CarSellForm() {
  const { user, loading } = useSessionUser();
  const [authOpen, setAuthOpen] = useState(false);
  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    condition: "",
    fuel: "",
    transmission: "",
    bodyType: "",
    color: "",
    engineSize: "",
    doors: "",
    cylinders: "",
    location: "",
    phone: "",
    email: "",
    description: "",
    features: "",
    images: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: keyof CarFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10), // Max 10 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!user && !loading) {
      toast.error("Connectez-vous via OTP avant de publier une annonce.");
      setAuthOpen(true);
      return;
    }
    setSubmitting(true);
    const fd = new FormData();

    // Champs requis backend
    fd.append("title", `${formData.brand} ${formData.model}`.trim());
    fd.append("description", formData.description || "");
    fd.append("brand", formData.brand);
    fd.append("model", formData.model);
    fd.append("year", formData.year);
    fd.append("mileage", formData.mileage);
    fd.append("price", formData.price);
    fd.append("location", formData.location);
    fd.append("whatsappNumber", formData.phone);

    // Enums optionnels
    if (formData.fuel) fd.append("fuel", formData.fuel);
    if (formData.transmission) fd.append("transmission", formData.transmission);
    if (formData.bodyType) fd.append("bodyType", formData.bodyType);
    if (formData.condition) fd.append("condition", formData.condition);

    // Images
    formData.images.forEach((img) => fd.append("images", img, img.name));

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        body: fd,
      });

      if (res.status === 401) {
        toast.error("Veuillez vous connecter pour publier une annonce.");
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Erreur" }));
        toast.error(err.error || "Échec de création de l'annonce");
        return;
      }

      const car = await res.json();
      toast.success("Annonce publiée avec succès");
      window.location.href = `/car/${car.id}`;
    } catch (error) {
      toast.error("Erreur réseau, réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2 text-red-500" />
              Informations générales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marque *</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => handleInputChange("brand", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sélectionnez une marque" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">Modèle *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Ex: Golf, A4, Classe C..."
                  className="h-10"
                />
              </div>

              <div>
                <Label htmlFor="year">Année *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="Ex: 2020"
                  min="1990"
                  max="2024"
                  className="h-10"
                />
              </div>

              <div>
                <Label htmlFor="mileage">Kilométrage *</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                  placeholder="Ex: 50000"
                  className="h-10"
                />
              </div>

              <div>
                <Label htmlFor="price">Prix ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Ex: 15000"
                  className="h-10"
                />
              </div>

              <div>
                <Label htmlFor="condition">État *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) =>
                    handleInputChange("condition", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sélectionnez l'état" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-red-500" />
              Caractéristiques techniques
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fuel">Type de carburant *</Label>
                <Select
                  value={formData.fuel}
                  onValueChange={(value) => handleInputChange("fuel", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sélectionnez le carburant" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transmission">Transmission *</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) =>
                    handleInputChange("transmission", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sélectionnez la transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.transmissions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bodyType">Carrosserie *</Label>
                <Select
                  value={formData.bodyType}
                  onValueChange={(value) =>
                    handleInputChange("bodyType", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sélectionnez la carrosserie" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.bodyTypes.map((bodyType) => (
                      <SelectItem key={bodyType} value={bodyType}>
                        {bodyType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color">Couleur *</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => handleInputChange("color", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sélectionnez la couleur" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="engineSize">Taille du moteur</Label>
                <Input
                  id="engineSize"
                  value={formData.engineSize}
                  onChange={(e) =>
                    handleInputChange("engineSize", e.target.value)
                  }
                  placeholder="Ex: 2.0L, 1.6L..."
                  className="h-10"
                />
              </div>

              <div>
                <Label htmlFor="doors">Nombre de portes</Label>
                <Input
                  id="doors"
                  type="number"
                  value={formData.doors}
                  onChange={(e) => handleInputChange("doors", e.target.value)}
                  placeholder="Ex: 4, 5..."
                  min="2"
                  max="7"
                  className="h-10"
                />
              </div>

              <div>
                <Label htmlFor="cylinders">Nombre de cylindres</Label>
                <Input
                  id="cylinders"
                  type="number"
                  value={formData.cylinders}
                  onChange={(e) =>
                    handleInputChange("cylinders", e.target.value)
                  }
                  placeholder="Ex: 4, 6, 8..."
                  min="2"
                  max="12"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              Localisation et contact
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Adresse complète *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Ex: 123 Rue de la Paix, 75001 Paris"
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Ex: 06 12 34 56 78"
                    className="h-10"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Ex: votre@email.com"
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description du véhicule *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Décrivez votre véhicule, son historique, ses points forts..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div>
                <Label htmlFor="features">Équipements et options</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) =>
                    handleInputChange("features", e.target.value)
                  }
                  placeholder="Climatisation, GPS, sièges cuir, etc. (séparés par des virgules)"
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-red-500" />
              Photos du véhicule
            </h3>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Ajoutez des photos de votre véhicule
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Maximum 10 photos (JPG, PNG)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Choisir des photos
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AuthModalManager isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <Card className="shadow-lg">
        <CardHeader className="bg-red-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Mettre en vente votre véhicule
          </CardTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep
                      ? "bg-white text-red-500"
                      : "bg-white/30 text-white"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStepContent()}

            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Précédent
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={submitting}
                >
                  Suivant
                </Button>
              ) : user ? (
                <Button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publication...
                    </>
                  ) : (
                    <>
                      <Euro className="w-4 h-4 mr-2" />
                      Publier l'annonce
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setAuthOpen(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-8"
                  >
                    Se connecter pour publier
                  </Button>
                  <Button
                    type="button"
                    className="bg-gray-200 text-gray-500 px-8"
                    disabled
                  >
                    Publier l'annonce
                  </Button>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
