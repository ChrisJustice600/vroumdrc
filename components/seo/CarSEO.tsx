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
    `${carName} - ${car.fuel || "Essence"} - ${
      car.transmission || "Manuelle"
    } - ${car.mileage.toLocaleString()} km - ${car.price.toLocaleString(
      "fr-CD"
    )}$`;

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
        url: "https://vroumdrc.com",
      },
      url: `https://vroumdrc.com/car/${car.id}`,
    },
    image: car.images?.[0] || "/car-service.png",
    url: `https://vroumdrc.com/car/${car.id}`,
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
      <title key="title">{carName} - VroumDRC</title>
      <meta key="description" name="description" content={carDescription} />
      <meta
        key="keywords"
        name="keywords"
        content={`${car.brand}, ${car.model}, ${car.year}, voiture occasion, automobile Congo Kinshasa,  VroumDRC`}
      />
      <link
        key="canonical"
        rel="canonical"
        href={`https://vroumdrc.com/car/${car.id}`}
      />

      {/* Open Graph */}
      <meta key="og:title" property="og:title" content={carName} />
      <meta
        key="og:description"
        property="og:description"
        content={carDescription}
      />
      <meta
        key="og:url"
        property="og:url"
        content={`https://vroumdrc.com/car/${car.id}`}
      />
      <meta key="og:type" property="og:type" content="product" />
      <meta
        key="og:image"
        property="og:image"
        content={car.images?.[0] || "/car-service.png"}
      />
      <meta
        key="product:price:amount"
        property="product:price:amount"
        content={car.price.toString()}
      />
      <meta
        key="product:price:currency"
        property="product:price:currency"
        content="USD"
      />

      {/* Twitter Card */}
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={carName} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={carDescription}
      />
      <meta
        key="twitter:image"
        name="twitter:image"
        content={car.images?.[0] || "/car-service.png"}
      />

      {/* Structured Data */}
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
