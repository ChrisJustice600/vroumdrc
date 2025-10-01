import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment views
    const car = await prisma.car.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return new Response(JSON.stringify({ views: car.views }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
