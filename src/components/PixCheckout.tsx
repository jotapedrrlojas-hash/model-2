import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Loader2, Lock, X, RefreshCw } from "lucide-react";

import { createPix, checkPix } from "@/lib/pix.functions";

type Step = "loading" | "pix" | "paid" | "error";

export function PixCheckout({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createPixFn = useServerFn(createPix);
  const checkPixFn = useServerFn(checkPix);

  const [step, setStep] = useState<Step>("loading");
  const [error, setError] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState("");
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [groupUrl, setGroupUrl] = useState("");
  const txRef = useRef<string | null>(null);

  const generate = useCallback(async () => {
    setStep("loading");
    setError(null);
    try {
      const res = await createPixFn({});
      txRef.current = res.transactionId;
      setPixCode(res.pixCode);
      setStep("pix");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar o Pix. Tente novamente.");
      setStep("error");
    }
  }, [createPixFn]);

  // Gera o Pix assim que o modal abre
  useEffect(() => {
    if (!open) return;
    if (txRef.current) return;
    void generate();
  }, [open, generate]);

  // QR code rendering
  useEffect(() => {
    if (!pixCode) return;
    let active = true;
    void import("qrcode").then((m) =>
      m.toDataURL(pixCode, { width: 480, margin: 1 }).then((url) => {
        if (active) setQr(url);
      }),
    );
    return () => {
      active = false;
    };
  }, [pixCode]);

  // Payment polling
  useEffect(() => {
    if (step !== "pix" || !txRef.current) return;
    const id = setInterval(async () => {
      try {
        const res = await checkPixFn({ data: { transactionId: txRef.current as string } });
        if (res.paid) {
          setGroupUrl(res.groupUrl ?? "");
          setStep("paid");
        }
      } catch {
        /* silencioso: continua tentando */
      }
    }, 4000);
    return () => clearInterval(id);
  }, [step, checkPixFn]);

  if (!open) return null;

  async function copyCode() {
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/60 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-background p-5 sm:rounded-2xl">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-bold">
            {step === "paid" ? "Pagamento aprovado!" : "Pagar com Pix — R$ 16,00"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="ml-auto rounded-full p-1 text-muted-foreground hover:bg-secondary"
          >
            <X className="size-5" />
          </button>
        </div>

        {step === "loading" && (
          <div className="flex flex-col items-center gap-3 py-12">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Gerando seu Pix...</p>
          </div>
        )}

        {step === "error" && (
          <div className="space-y-4 py-6 text-center">
            <p className="text-sm font-medium text-destructive">{error}</p>
            <button
              onClick={() => void generate()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-base font-bold uppercase text-primary-foreground"
            >
              <RefreshCw className="size-5" /> Tentar novamente
            </button>
          </div>
        )}

        {step === "pix" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-fit rounded-xl border border-border bg-card p-3">
              {qr ? (
                <img src={qr} alt="QR Code Pix" width={220} height={220} className="size-56" />
              ) : (
                <div className="flex size-56 items-center justify-center">
                  <Loader2 className="size-7 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Escaneie o QR Code no app do seu banco ou use o Pix copia e cola.
            </p>
            <p className="break-all rounded-lg bg-secondary p-3 text-left text-xs text-muted-foreground">
              {pixCode}
            </p>
            <button
              onClick={copyCode}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-base font-bold uppercase text-primary-foreground"
            >
              {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
              {copied ? "Código copiado" : "Copiar código Pix"}
            </button>
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Aguardando confirmação do pagamento...
            </p>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3.5" /> Pagamento processado com segurança
            </p>
          </div>
        )}

        {step === "paid" && (
          <div className="space-y-4 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15">
              <Check className="size-8 text-success" />
            </span>
            <p className="text-sm text-muted-foreground">
              Seu acesso vitalício foi liberado. Entre agora no grupo privado:
            </p>
            <a
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-primary py-4 text-base font-bold uppercase text-primary-foreground"
            >
              Entrar no Telegram Privê
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
