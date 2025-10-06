import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Récupérer toutes les marques distinctes des voitures actives
    const brands = await prisma.car.findMany({
      where: { status: "ACTIVE" },
      select: { brand: true },
      distinct: ["brand"],
      orderBy: { brand: "asc" },
    });

    // Extraire seulement les noms des marques
    const brandNames = brands.map((car: { brand: string }) => car.brand);

    return NextResponse.json(brandNames);
  } catch (error) {
    console.error("Erreur lors de la récupération des marques:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des marques" },
      { status: 500 }
    );
  }
}
