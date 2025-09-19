"use client";

import { Button } from "@/components/ui/button";
import { Car, ChevronDown, DollarSign, Filter, Search } from "lucide-react";
import { useState } from "react";

export function CarSearch() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Toutes les voitures", icon: Car },
    { id: "new", label: "Voitures neuves", icon: Car },
    { id: "used", label: "Voitures d'occasion", icon: Car },
  ];

  const dropdowns = [
    { id: "makes", label: "Choisir la marque", icon: Filter },
    { id: "models", label: "Choisir le modèle", icon: Filter },
    { id: "price", label: "Prix", icon: DollarSign },
  ];

  return (
    <div className="relative -mt-6 mx-4 md:mx-8 lg:mx-16 z-20">
      <div className="bg-white rounded-tl-sm shadow-2xl border border-gray-100">
        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold text-sm rounded-tl-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-b-sm px-8 py-6 shadow-2xl">
        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dropdowns.map((dropdown) => {
            const Icon = dropdown.icon;
            return (
              <div key={dropdown.id} className="relative group">
                <button className="w-full bg-white rounded-sm px-4 py-4 text-left text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-red-600" />
                    <span className="text-sm">{dropdown.label}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
            );
          })}

          {/* Search Button */}
          <div className="lg:col-span-1">
            <Button className="w-full bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-6 rounded-sm flex items-center justify-center gap-3 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white">
              <Search className="h-5 w-5" />
              RECHERCHER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
