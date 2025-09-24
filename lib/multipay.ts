import { createHmac, timingSafeEqual } from "crypto";
import "server-only";

type EnsureEnvOptions = { optional?: boolean };

export const ensureEnv = (name: string, options: EnsureEnvOptions = {}) => {
  const value = process.env[name];
  if (!value && !options.optional) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value as string;
};

export type MultipayCreatePaymentArgs = {
  amountCents: number; // e.g., 1000 for $10.00
  currency: string; // e.g., "USD"
  customerId: string; // our user id
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
};

export type MultipayCreatePaymentResponse = {
  paymentId: string;
  paymentUrl: string;
  status: "pending" | "paid" | "failed";
};

/**
 * Wrapper d'intégration Multipay. Adaptez les endpoints/champs selon la doc.
 */
export async function multipayCreatePayment(
  args: MultipayCreatePaymentArgs
): Promise<MultipayCreatePaymentResponse> {
  const baseUrl = ensureEnv("MULTIPAY_BASE_URL");
  const apiKey = ensureEnv("MULTIPAY_API_KEY");

  // Exemple d'endpoint générique; adaptez selon la doc Multipay
  const resp = await fetch(`${baseUrl}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      amount: args.amountCents,
      currency: args.currency,
      success_url: args.successUrl,
      cancel_url: args.cancelUrl,
      customer_reference: args.customerId,
      metadata: args.metadata ?? {},
    }),
    cache: "no-store",
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Multipay create payment failed: ${resp.status} ${text}`);
  }
  const data = (await resp.json()) as {
    id: string;
    checkout_url: string;
    status: string;
  };
  return {
    paymentId: data.id,
    paymentUrl: data.checkout_url,
    status: (data.status as "pending" | "paid" | "failed") ?? "pending",
  };
}

export type MultipayWebhookEvent = {
  type: string; // e.g., "payment.succeeded"
  data: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    metadata?: Record<string, string>;
    customer_reference?: string; // user id we set earlier
  };
};

/**
 * Vérifie la signature du webhook Multipay. Adaptez selon la doc.
 */
export function verifyMultipaySignature(
  rawBody: string,
  signatureHeader?: string | null
): boolean {
  const secret = ensureEnv("MULTIPAY_WEBHOOK_SECRET", { optional: true });
  if (!secret) return true; // fallback si non configuré
  if (!signatureHeader) return false;
  try {
    const computed = createHmac("sha512", secret)
      .update(rawBody, "utf8")
      .digest("hex");

    // Comparaison sûre en timing constant si longueurs identiques
    const a = Buffer.from(computed, "hex");
    const b = Buffer.from(signatureHeader, "hex");
    if (a.length !== b.length) {
      return computed.toLowerCase() === signatureHeader.toLowerCase();
    }
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ---- Web Redirect helper (Form based) ----
export type MultipayRedirectRequest = {
  actionUrl: string;
  fields: Record<string, string>;
};

export function buildMultipayRedirectRequest(params: {
  txnRef: string;
  amountMinor: number; // e.g., 1000 for $10.00
  currencyNumeric: string; // e.g., "840" for USD, "976" for CDF
  siteRedirectUrl: string;
  customerId?: string;
  customerEmail?: string;
}): MultipayRedirectRequest {
  const mode = process.env.MULTIPAY_MODE ?? "TEST"; // TEST | LIVE (fallback TEST)
  const merchantCode = ensureEnv("MULTIPAY_MERCHANT_CODE");
  const payItemId = ensureEnv("MULTIPAY_PAY_ITEM_ID");

  const actionUrl =
    mode === "LIVE"
      ? "https://webpay.interswitchng.com/collections/w/pay"
      : "https://webpay-multipay-ui.k8.isw.la/collections/w/pay";

  const fields: Record<string, string> = {
    merchant_code: merchantCode,
    pay_item_id: payItemId,
    txn_ref: params.txnRef,
    amount: String(params.amountMinor),
    currency: params.currencyNumeric,
    site_redirect_url: params.siteRedirectUrl,
  };

  if (params.customerId) fields["cust_id"] = params.customerId;
  if (params.customerEmail) fields["cust_email"] = params.customerEmail;

  return { actionUrl, fields };
}
