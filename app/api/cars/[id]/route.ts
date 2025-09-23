import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      return new Response(JSON.stringify({ error: "Car non trouvée" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
