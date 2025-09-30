import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const uid = req.cookies.get("session_uid")?.value;
    if (!uid) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    const car = await prisma.car.findUnique({ where: { id } });
    if (!car || car.sellerId !== uid) {
      return new Response(JSON.stringify({ error: "Accès refusé" }), {
        status: 403,
      });
    }

    const updated = await prisma.car.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
