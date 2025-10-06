import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <Image
                src="/logo-k Vroum.png"
                alt="K Vroum Logo"
                width={120}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </div>
            <p className="text-gray-300 mb-8 max-w-lg leading-relaxed text-lg">
              Trouvez votre voiture idéale ou vendez la vôtre en toute
              simplicité. K Vroum connecte acheteurs et vendeurs de voitures
              avec une plateforme transparente et sécurisée.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#a99df1] transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#a99df1] transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#a99df1] transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative">
              Liens rapides
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#a99df1] rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#a99df1] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#a99df1] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/achat"
                  className="text-gray-300 hover:text-[#a99df1] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#a99df1] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Acheter une voiture
                </Link>
              </li>
              <li>
                <Link
                  href="/vente"
                  className="text-gray-300 hover:text-[#a99df1] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#a99df1] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Vendre sa voiture
                </Link>
              </li>
              <li>
                <Link
                  href="/abonnement"
                  className="text-gray-300 hover:text-[#a99df1] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#a99df1] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Abonnement
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-[#a99df1] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#a99df1] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#a99df1] rounded-full"></div>
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-[#a99df1]/80 rounded-lg group-hover:bg-[#a99df1]/70 transition-colors">
                  <Mail className="h-5 w-5 text-[#3a3367]/80" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  support@k Vroum.com
                </span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-[#a99df1]/80 rounded-lg group-hover:bg-[#a99df1]/70 transition-colors">
                  <Phone className="h-5 w-5 text-[#3a3367]/80" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-[#a99df1]/80 rounded-lg group-hover:bg-[#a99df1]/70 transition-colors">
                  <MapPin className="h-5 w-5 text-[#3a3367]/80" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  123 Avenue des Voitures, 75001 Paris
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 K Vroum. Tous droits réservés.
              </p>
              <Heart className="h-4 w-4 text-[#a99df1]" />
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 gap-y-2">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#a99df1] text-sm transition-all duration-300 hover:underline"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-[#a99df1] text-sm transition-all duration-300 hover:underline"
              >
                Conditions d'utilisation
              </Link>
              <Link
                href="/legal"
                className="text-gray-400 hover:text-[#a99df1] text-sm transition-all duration-300 hover:underline"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
