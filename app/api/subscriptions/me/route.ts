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

    const sub = await prisma.subscription.findFirst({
      where: { userId: uid },
      orderBy: { createdAt: "desc" },
    });

    if (!sub) {
      return new Response(
        JSON.stringify({ hasSubscription: false, isActive: false }),
        { status: 200 }
      );
    }

    const now = new Date();
    const isActive = !!sub.isActive && new Date(sub.endDate) > now;

    return new Response(
      JSON.stringify({
        hasSubscription: true,
        isActive,
        planType: sub.planType,
        amount: sub.amount,
        startDate: sub.startDate,
        endDate: sub.endDate,
        paymentId: sub.paymentId,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

