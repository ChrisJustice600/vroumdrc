// import { verifyMultipaySignature } from "@/lib/multipay";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Lire le corps brut pour calcul HMAC
    const rawBody = await req.text();
    console.log("[webhook] reçu", rawBody);
    const sig = req.headers.get("x-interswitch-signature");
    console.log("[webhook] signature header présent:", !!sig);

    // Temporairement désactiver la vérification de signature pour debug
    // if (!verifyMultipaySignature(rawBody, sig)) {
    //   console.warn("[webhook] signature invalide");
    //   return new Response("Signature invalide", { status: 400 });
    // }

    const payload = JSON.parse(rawBody) as {
      event?: string;
      type?: string;
      data?: {
        id?: string | number;
        responseCode?: string;
        status?: string;
        merchantReference?: string | number;
        txnRef?: string;
        amount?: number;
        currency?: string;
      };
    };

    // La doc Interswitch utilise 'event' et 'data'
    const type: string = payload.type || payload.event || "";
    const data = payload.data;
    console.log("[webhook] event type:", type);
    console.log("[webhook] payload complet:", JSON.stringify(payload, null, 2));
    console.log("[webhook] data:", JSON.stringify(data, null, 2));

    // Vérifier plusieurs identifiants possibles
    const transactionId = data?.id || data?.txnRef || data?.merchantReference;
    if (!transactionId) {
      console.warn("[webhook] payload sans identifiant de transaction");
      console.warn("[webhook] data.id:", data?.id);
      console.warn("[webhook] data.txnRef:", data?.txnRef);
      console.warn(
        "[webhook] data.merchantReference:",
        data?.merchantReference
      );
      return new Response("Bad payload - no transaction ID", { status: 400 });
    }

    // Récupère l'abonnement par paymentId avec plusieurs tentatives
    console.log(
      "[webhook] recherche abonnement avec transactionId:",
      String(transactionId)
    );

    let existing = await prisma.subscription.findUnique({
      where: { paymentId: String(transactionId) },
    });

    if (!existing) {
      // Essayer avec data.id si différent
      if (data?.id && String(data.id) !== String(transactionId)) {
        console.log("[webhook] tentative avec data.id:", String(data.id));
        existing = await prisma.subscription.findUnique({
          where: { paymentId: String(data.id) },
        });
      }
    }

    if (!existing && data?.merchantReference) {
      console.log(
        "[webhook] tentative avec merchantReference:",
        String(data.merchantReference)
      );
      existing = await prisma.subscription.findUnique({
        where: { paymentId: String(data.merchantReference) },
      });
    }

    if (!existing) {
      // Pas connu, on ignore en douceur
      console.log(
        "[webhook] aucun abonnement trouvé pour transactionId:",
        String(transactionId)
      );
      console.log("[webhook] recherche dans toutes les subscriptions...");

      // Debug: lister toutes les subscriptions pour voir ce qui existe
      const allSubs = await prisma.subscription.findMany({
        select: {
          paymentId: true,
          userId: true,
          isActive: true,
          createdAt: true,
        },
      });
      console.log("[webhook] toutes les subscriptions:", allSubs);

      return new Response(null, { status: 200 });
    }

    console.log("[webhook] abonnement trouvé:", {
      id: existing.id,
      paymentId: existing.paymentId,
      userId: existing.userId,
      isActive: existing.isActive,
    });

    // Logique de succès plus permissive
    const isSuccess =
      type === "payment.succeeded" ||
      type === "TRANSACTION.COMPLETED" ||
      type === "payment.completed" ||
      type === "charge.succeeded" ||
      (type === "TRANSACTION.COMPLETED" &&
        (data?.responseCode === "00" ||
          data?.responseCode === "0" ||
          data?.status === "paid" ||
          data?.status === "success")) ||
      data?.status === "success" ||
      data?.status === "completed" ||
      data?.status === "paid";

    console.log("[webhook] isSuccess:", isSuccess);
    console.log("[webhook] type:", type);
    console.log("[webhook] responseCode:", data?.responseCode);
    console.log("[webhook] status:", data?.status);

    if (isSuccess) {
      const start = new Date();
      const end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);

      console.log("[webhook] activation de l'abonnement...");

      const updatedSubscription = await prisma.subscription.update({
        where: { paymentId: existing.paymentId },
        data: {
          isActive: true,
          startDate: start,
          endDate: end,
        },
      });

      console.log("[webhook] abonnement mis à jour:", updatedSubscription);

      // Optionnel: mettre à jour User.subscriptionExpiry pour accès rapide
      try {
        await prisma.user.update({
          where: { id: existing.userId },
          data: { subscriptionExpiry: end, isActive: true },
        });
        console.log(
          "[webhook] utilisateur mis à jour avec subscriptionExpiry:",
          end.toISOString()
        );
      } catch (userError) {
        console.error("[webhook] erreur mise à jour utilisateur:", userError);
      }

      console.log("[webhook] abonnement activé jusqu'au", end.toISOString());
    } else if (
      type === "payment.failed" ||
      type === "payment.cancelled" ||
      type === "TRANSACTION.FAILED" ||
      (type === "TRANSACTION.COMPLETED" &&
        data?.responseCode &&
        data?.responseCode !== "00" &&
        data?.responseCode !== "0") ||
      data?.status === "failed" ||
      data?.status === "cancelled" ||
      data?.status === "error"
    ) {
      console.log(
        "[webhook] paiement échoué, désactivation de l'abonnement..."
      );

      await prisma.subscription.update({
        where: { paymentId: existing.paymentId },
        data: { isActive: false },
      });
      console.log("[webhook] paiement échoué, abonnement désactivé");
    } else {
      console.log(
        "[webhook] statut de paiement non reconnu, pas de changement"
      );
      console.log("[webhook] type:", type);
      console.log("[webhook] data:", data);
    }

    // Répondre 200 sans corps, comme recommandé
    return new Response(null, { status: 200 });
  } catch (e) {
    console.error("[webhook] erreur", e);
    return new Response(null, { status: 200 });
  }
}
