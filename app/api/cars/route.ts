import { getUser } from "@/lib/auth-server";
import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

function normalizeEnum(value: string | null): string | undefined {
  if (!value) return undefined;
  // Remove diacritics, trim, upper, replace separators
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toUpperCase()
    .replace(/[-\s]/g, "_");
}

function mapTransmission(value: string | null): string | undefined {
  const v = normalizeEnum(value);
  if (!v) return undefined;
  const map: Record<string, string> = {
    MANUELLE: "MANUAL",
    AUTOMATIQUE: "AUTOMATIC",
    SEMI_AUTOMATIQUE: "SEMI_AUTOMATIC",
  };
  return map[v] || v; // fallback if already correct
}

export async function POST(req: NextRequest) {
  try {
    const sessionUser = await getUser();
    const cookieUid = req.cookies.get("session_uid")?.value;
    if (!sessionUser?.id && !cookieUid) {
      return new Response(
        JSON.stringify({ error: "Non authentifié. Veuillez vous connecter." }),
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const requiredFields = [
      "title",
      "description",
      "brand",
      "model",
      "year",
      "mileage",
      "price",
      "location",
      "whatsappNumber",
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return new Response(
          JSON.stringify({ error: `Champ requis manquant: ${field}` }),
          { status: 400 }
        );
      }
    }

    const title = String(formData.get("title"));
    const description = String(formData.get("description"));
    const brand = String(formData.get("brand"));
    const model = String(formData.get("model"));
    const year = Number(formData.get("year"));
    const mileage = Number(formData.get("mileage"));
    const price = Number(formData.get("price"));
    const location = String(formData.get("location"));
    const whatsappNumber = String(formData.get("whatsappNumber"));

    const fuel = normalizeEnum(formData.get("fuel") as string | null);
    const transmission = mapTransmission(
      formData.get("transmission") as string | null
    );
    const bodyType = normalizeEnum(formData.get("bodyType") as string | null);
    const condition = normalizeEnum(formData.get("condition") as string | null);

    const imageFiles = formData.getAll("images") as File[];
    if (imageFiles.length === 0) {
      return new Response(
        JSON.stringify({ error: "Au moins une image est requise" }),
        { status: 400 }
      );
    }
    if (imageFiles.length > 10) {
      return new Response(JSON.stringify({ error: "Maximum 10 images" }), {
        status: 400,
      });
    }

    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = file.name || `car-${Date.now()}`;
      const result = await uploadImage(buffer, filename, "cars");
      uploadedUrls.push(result.secure_url);
    }

    const car = await prisma.car.create({
      data: {
        sellerId: (sessionUser?.id as string) ?? (cookieUid as string),
        title,
        description,
        brand,
        model,
        year,
        mileage,
        price,
        location,
        images: uploadedUrls,
        whatsappNumber,
        fuel: fuel as any,
        transmission: transmission as any,
        bodyType: bodyType as any,
        condition: condition as any,
      },
    });

    return new Response(JSON.stringify(car), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const location = searchParams.get("location");
    const fuel = searchParams.get("fuel");
    const transmission = searchParams.get("transmission");
    const bodyType = searchParams.get("bodyType");
    const condition = searchParams.get("condition");

    const where: any = { isActive: true };
    if (brand) where.brand = { contains: brand, mode: "insensitive" };
    if (model) where.model = { contains: model, mode: "insensitive" };
    if (location) where.location = { contains: location, mode: "insensitive" };
    if (year) where.year = Number(year);
    if (minPrice)
      where.price = { ...(where.price || {}), gte: Number(minPrice) };
    if (maxPrice)
      where.price = { ...(where.price || {}), lte: Number(maxPrice) };
    if (fuel) where.fuel = normalizeEnum(fuel);
    if (transmission) where.transmission = mapTransmission(transmission);
    if (bodyType) where.bodyType = normalizeEnum(bodyType);
    if (condition) where.condition = normalizeEnum(condition);

    const sortBy = searchParams.get("sortBy");
    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "price-low") orderBy = { price: "asc" };
    else if (sortBy === "price-high") orderBy = { price: "desc" };
    else if (sortBy === "oldest") orderBy = { createdAt: "asc" };

    const cars = await prisma.car.findMany({ where, orderBy });
    console.log("carss::::", cars);

    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
