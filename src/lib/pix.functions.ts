import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PRICE = 16;

export const createPix = createServerFn({ method: "POST" }).handler(async () => {
  const { createPixCharge } = await import("./omega.server");
  const identifier = `bia-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const charge = await createPixCharge({
    identifier,
    amount: PRICE,
    productName: "Telegram Privê Bia Fit — Acesso vitalício",
    client: {
      name: "Assinante Telegram",
      email: `${identifier}@telegram.local`,
      phone: "(11) 99999-9999",
      document: "12345678909",
    },
  });
  return {
    transactionId: charge.transactionId,
    pixCode: charge.pixCode,
    expiresAt: charge.expiresAt,
    amount: PRICE,
  };
});

export const checkPix = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ transactionId: z.string().min(5) }).parse(data))
  .handler(async ({ data }) => {
    const { getTransactionStatus, getGroupUrl } = await import("./omega.server");
    const status = await getTransactionStatus(data.transactionId);
    const paid = status === "OK" || status === "COMPLETED" || status === "PAID";
    return { status, paid, groupUrl: paid ? getGroupUrl() : null };
  });
