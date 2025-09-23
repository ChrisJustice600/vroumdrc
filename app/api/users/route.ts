import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, phoneNumber, displayName } = body as {
      id: string;
      phoneNumber: string;
      displayName?: string | null;
    };
    if (!id || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: "id et phoneNumber requis" }),
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { phoneNumber, displayName: displayName ?? undefined },
      create: { id, phoneNumber, displayName: displayName ?? undefined },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
