import { MultipayWebhookEvent, verifyMultipaySignature } from "@/lib/multipay";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Lire le corps brut pour calcul HMAC
    const rawBody = await req.text();
    console.log("[webhook] reçu", rawBody);
    const sig = req.headers.get("x-interswitch-signature");
    console.log("[webhook] signature header présent:", !!sig);
    if (!verifyMultipaySignature(rawBody, sig)) {
      console.warn("[webhook] signature invalide");
      return new Response("Signature invalide", { status: 400 });
    }

    const payload = JSON.parse(rawBody) as MultipayWebhookEvent | any;
    // La doc Interswitch utilise 'event' et 'data'
    const type: string = payload.type || payload.event || "";
    const data = payload.data;
    console.log("[webhook] event type:", type);

    if (!data?.id) {
      console.warn("[webhook] payload sans data.id");
      return new Response("Bad payload", { status: 400 });
    }

    // Récupère l'abonnement par paymentId
    let existing = await prisma.subscription.findUnique({
      where: { paymentId: String(data.id) },
    });
    if (!existing && (data as any)?.merchantReference) {
      existing = await prisma.subscription.findUnique({
        where: { paymentId: String((data as any).merchantReference) },
      });
    }

    if (!existing) {
      // Pas connu, on ignore en douceur
      console.log("[webhook] aucun abonnement trouvé pour", data.id);
      return new Response(null, { status: 200 });
    }

    const isSuccess =
      type === "payment.succeeded" ||
      (type === "TRANSACTION.COMPLETED" &&
        (data?.responseCode === "00" || data?.status === "paid"));

    if (isSuccess) {
      const start = new Date();
      const end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);

      await prisma.subscription.update({
        where: { paymentId: data.id },
        data: {
          isActive: true,
          startDate: start,
          endDate: end,
        },
      });

      // Optionnel: mettre à jour User.subscriptionExpiry pour accès rapide
      await prisma.user.update({
        where: { id: existing.userId },
        data: { subscriptionExpiry: end, isActive: true },
      });
      console.log("[webhook] abonnement activé jusqu'au", end.toISOString());
    } else if (
      type === "payment.failed" ||
      (type === "TRANSACTION.COMPLETED" && data?.responseCode !== "00") ||
      data.status === "failed"
    ) {
      await prisma.subscription.update({
        where: { paymentId: data.id },
        data: { isActive: false },
      });
      console.log("[webhook] paiement échoué, abonnement désactivé");
    }

    // Répondre 200 sans corps, comme recommandé
    return new Response(null, { status: 200 });
  } catch (e) {
    console.error("[webhook] erreur", e);
    return new Response(null, { status: 200 });
  }
}
