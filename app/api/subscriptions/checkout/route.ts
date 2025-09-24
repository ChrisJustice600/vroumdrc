import { buildMultipayRedirectRequest } from "@/lib/multipay";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("[checkout] nouvelle requête");
    const uid = req.cookies.get("session_uid")?.value;
    if (!uid) {
      console.warn("[checkout] pas de session_uid");
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    // Assurez-vous que l'utilisateur existe (création lazy si besoin)
    console.log("[checkout] upsert user", uid);
    await prisma.user.upsert({
      where: { id: uid },
      create: { id: uid, phoneNumber: uid },
      update: {},
    });

    const origin = req.headers.get("origin") || req.nextUrl.origin;
    console.log("[checkout] origin", origin);

    // Générer txn_ref unique (utiliser paymentId logique interne)
    const txnRef = `sub_${uid}_${Date.now()}`;
    console.log("[checkout] txn_ref", txnRef);

    const siteRedirectUrl = `${origin}/abonnement/success?ref=${encodeURIComponent(
      txnRef
    )}`;
    console.log("[checkout] siteRedirectUrl", siteRedirectUrl);

    // 10$ => 100000 en minor (ex: cents) selon doc DRC
    const redirectReq = buildMultipayRedirectRequest({
      txnRef,
      amountMinor: 100000,
      currencyNumeric: "976", // CDF (DRC); ajustez si vous utilisez USD => 840
      siteRedirectUrl,
      customerId: uid,
    });
    console.log("[checkout] redirect action", redirectReq.actionUrl);
    console.log("[checkout] redirect fields", Object.keys(redirectReq.fields));

    // Enregistrer l'intention avec paymentId = txnRef pour rapprochement webhook
    await prisma.subscription.create({
      data: {
        userId: uid,
        planType: "MONTHLY",
        amount: 10,
        startDate: new Date(),
        endDate: new Date(), // mis à jour après confirmation
        isActive: false,
        paymentId: txnRef,
      },
    });
    console.log("[checkout] intent enregistrée pour", uid);

    return new Response(JSON.stringify(redirectReq), { status: 200 });
  } catch (e) {
    console.error("[checkout] erreur serveur", e);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
