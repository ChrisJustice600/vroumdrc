// Configuration pour Google Analytics et autres outils de suivi SEO

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Google Analytics
export const gtag = {
  // Page view tracking
  pageview: (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    }
  },

  // Event tracking
  event: (action: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, parameters);
    }
  },
};

// Événements spécifiques pour le site automobile
export const trackCarSearch = (
  searchTerm: string,
  filters: Record<string, any>
) => {
  gtag.event("car_search", {
    search_term: searchTerm,
    filters: JSON.stringify(filters),
    event_category: "search",
    event_label: "car_search",
  });
};

export const trackCarView = (
  carId: string,
  carBrand: string,
  carModel: string,
  carPrice: number
) => {
  gtag.event("view_item", {
    item_id: carId,
    item_name: `${carBrand} ${carModel}`,
    value: carPrice,
    currency: "EUR",
    event_category: "engagement",
    event_label: "car_view",
  });
};

export const trackCarContact = (carId: string, contactMethod: string) => {
  gtag.event("contact_seller", {
    item_id: carId,
    contact_method: contactMethod,
    event_category: "conversion",
    event_label: "seller_contact",
  });
};

// Core Web Vitals tracking
export const trackWebVitals = (metric: any) => {
  gtag.event("web_vitals", {
    name: metric.name,
    value: Math.round(metric.value),
    event_category: "performance",
    event_label: metric.name,
  });
};

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
