const BASE = "https://app.omegapayments.com.br/api/v1/gateway";

function headers() {
  const publicKey = "jotapedrrlojas_j2e58wm9dpkh3u5l";
const secretKey = "7wve2s4hvu1r9tmihur9zanx287n0rm2k11vzr6s56avpqzybfuk2w5oqvcs4pqq";
  if (!publicKey || !secretKey) throw new Error("Credenciais da OmegaPay não configuradas");
  return {
    "Content-Type": "application/json",
    "x-public-key": publicKey,
    "x-secret-key": secretKey,
  };
}

export type OmegaPixCharge = {
  transactionId: string;
  status: string;
  pixCode: string;
  expiresAt: string | null;
};

export async function createPixCharge(input: {
  identifier: string;
  amount: number;
  productName: string;
  client: { name: string; email: string; phone: string; document: string };
}): Promise<OmegaPixCharge> {
  const res = await fetch(`${BASE}/pix/receive`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      identifier: input.identifier,
      amount: input.amount,
      client: input.client,
      products: [
        { id: "acesso-vitalicio", name: input.productName, quantity: 1, price: input.amount },
      ],
    }),
  });

  const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;

  if (!res.ok || !body) {
    console.error("OmegaPay create charge failed", res.status, body);
    throw new Error("Não foi possível gerar o Pix. Tente novamente em instantes.");
  }

  const pix = (body["pix"] ?? {}) as { code?: string; expiresAt?: string };
  if (!pix.code) {
    console.error("OmegaPay response without pix code", body);
    throw new Error("Não foi possível gerar o Pix. Tente novamente em instantes.");
  }

  return {
    transactionId: String(body["transactionId"] ?? ""),
    status: String(body["status"] ?? "PENDING"),
    pixCode: pix.code,
    expiresAt: pix.expiresAt ?? null,
  };
}

export async function getTransactionStatus(transactionId: string): Promise<string> {
  const res = await fetch(`${BASE}/transactions?id=${encodeURIComponent(transactionId)}`, {
    headers: headers(),
  });
  const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  if (!res.ok || !body) {
    console.error("OmegaPay status failed", res.status, body);
    return "PENDING";
  }
  return String(body["status"] ?? "PENDING");
}

export function getGroupUrl(): string {
  return process.env["TELEGRAM_GROUP_URL"] ?? "";
}
