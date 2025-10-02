interface CarSEOProps {
  car: {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuel: string | null;
    transmission: string | null;
    images: string[];
    condition: string | null;
    location?: string;
    description?: string;
  };
}

export function CarSEO({ car }: CarSEOProps) {
  const carName = `${car.brand} ${car.model} ${car.year}`;
  const carDescription =
    car.description ||
    `${carName} - ${car.fuel || "Essence"} - ${car.transmission || "Manuelle"} - ${car.mileage.toLocaleString()} km - ${car.price.toLocaleString("fr-CD")}$`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: carName,
    description: carDescription,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.model,
    vehicleModelDate: car.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileage,
      unitCode: "KMT",
    },
    fuelType: car.fuel || "Essence",
    vehicleTransmission: car.transmission || "Manuelle",
    vehicleCondition:
      car.condition === "OCCASION"
        ? "https://schema.org/UsedCondition"
        : "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: " VroumDRC",
        url: "https:// Vroumdrc.com",
      },
      url: `https:// Vroumdrc.com/car/${car.id}`,
    },
    image: car.images?.[0] || "/car-service.png",
    url: `https:// Vroumdrc.com/car/${car.id}`,
    datePosted: new Date().toISOString(),
    locationCreated: car.location
      ? {
          "@type": "Place",
          name: car.location,
          addressCountry: "CD",
        }
      : undefined,
  };

  return (
    <>
      {/* Meta tags */}
      <title>{carName} - VroumDRC</title>
      <meta name="description" content={carDescription} />
      <meta
        name="keywords"
        content={`${car.brand}, ${car.model}, ${car.year}, voiture occasion, automobile Congo Kinshasa,  VroumDRC`}
      />
      <link rel="canonical" href={`https:// Vroumdrc.com/car/${car.id}`} />

      {/* Open Graph */}
      <meta property="og:title" content={carName} />
      <meta property="og:description" content={carDescription} />
      <meta property="og:url" content={`https:// Vroumdrc.com/car/${car.id}`} />
      <meta property="og:type" content="product" />
      <meta
        property="og:image"
        content={car.images?.[0] || "/car-service.png"}
      />
      <meta property="product:price:amount" content={car.price.toString()} />
      <meta property="product:price:currency" content="USD" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={carName} />
      <meta name="twitter:description" content={carDescription} />
      <meta
        name="twitter:image"
        content={car.images?.[0] || "/car-service.png"}
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
