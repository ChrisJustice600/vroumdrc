import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uid = req.cookies.get("session_uid")?.value;
    if (!uid) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    const cars = await prisma.car.findMany({
      where: { sellerId: uid },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
