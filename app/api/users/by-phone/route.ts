import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");
  if (!phone) {
    return new Response(JSON.stringify({ error: "paramètre 'phone' requis" }), {
      status: 400,
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phone },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
