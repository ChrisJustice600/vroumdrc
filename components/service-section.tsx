import { Building2, Car, Wrench } from "lucide-react";
import Image from "next/image";

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large sélection de voitures */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Large sélection de voitures
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Des milliers de voitures neuves et d'occasion proposées par des
              vendeurs vérifiés. Trouvez facilement le véhicule qui correspond à
              vos besoins et votre budget.
            </p>
          </div>

          {/* Vérification des véhicules */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center relative transform translate-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Vérification des véhicules
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tous les véhicules sont vérifiés par nos experts pour garantir
              leur état et leur conformité. Achetez en toute confiance grâce à
              nos rapports détaillés.
            </p>
            {/* Orange underline accent */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#a99df1] rounded-t"></div>
          </div>

          {/* Mise en relation sécurisée */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Mise en relation sécurisée
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connectez-vous directement avec des acheteurs et vendeurs de
              confiance. Notre plateforme facilite les échanges et sécurise les
              transactions.
            </p>
          </div>
        </div>

        {/* Car Service Image */}
        <div className="flex justify-center">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/car-service.png"
              alt="Service de voiture"
              width={600}
              height={400}
              className="w-full h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
