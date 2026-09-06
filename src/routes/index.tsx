import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ShieldCheck,
  BadgeCheck,
  Images,
  Video,
  Lock,
  ShoppingBag,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { PixCheckout } from "@/components/PixCheckout";
import cover from "@/assets/capaft.jpeg";
import avatar from "@/assets/perfilft.jpeg";
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BiBi Fontinni — Telegram Privê por R$16" },
      {
        name: "description",
        content:
          "Acesso vitalício ao grupo privado de treinos, dietas e lives da Bia Fit. Pagamento único de R$16,00, sem mensalidade.",
      },
      { property: "og:title", content: "Bia Fit — Telegram Privê de Treinos por R$16" },
      {
        property: "og:description",
        content: "367 treinos e 245 vídeos liberados com um pagamento único. Sem assinatura mensal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const items = [
  { img: w1, video: "/video12.mp4", dur: "32min", title: "SAFADO ME DEIXOU PELADA A FORÇA* (tentava sair e ele não deixava)" },
  { img: w2, video: "/video5.mp4", dur: "18min", title: "ENGOLINDO TUDO DEPOIS DO SEXO AMARRADA" },
  { img: w3, video: "/dançvideo.mp4", dur: "14min", title: "DANÇANDO PRO ASSINANTE" },
  { img: w4, video: "/video13.mp4", dur: "19min", title: "GRELO DURINHO" },
  { img: w1, video: "/video3.mp4", dur: "41min", title: "TROCA DE CASAL COM A PRIMA" },
  { img: w2, video: "/video11.mp4", dur: "16min", title: "FUI PRA FAVELA DAR PRO GERENTE" },
  { img: w3, video: "/exibvideo.mp4", dur: "25min", title: "STRIP PARA O PADRASTO" },
  { img: w4, video: "/sacadavideo.mp4", dur: "30min", title: "NA VARANDA COM VIZINHO OLHANDO" },
  { img: w1, video: "/d4video.mp4", dur: "20min", title: "PLUG ESCALONADO + CONSOLO VIBRATORIO (velocidade maxima)" },
  { img: w2, video: "/video10.mp4", dur: "45min", title: "EXIBICIONISMO + FETICHISMO PRIVADO" }
];

const buyers = [
  "Luan S. acabou de comprar",
  "Rafael N. acabou de comprar",
  "Juliano R. acabou de comprar",
  "Marcos L. acabou de comprar",
  "Carlos M. acabou de comprar",
];

function Index() {
  const [buyer, setBuyer] = useState(0);
  const [show, setShow] = useState(true);
  const [checkout, setCheckout] = useState(false);



  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setBuyer((b) => (b + 1) % buyers.length);
        setShow(true);
      }, 500);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-muted pb-28">
      <div className="mx-auto max-w-lg bg-background shadow-sm">
        {/* App bar */}
        <header className="flex items-center gap-2 border-b border-border px-3 py-3">
          <ChevronLeft className="size-5 text-muted-foreground" />
          <span className="flex size-6 items-center justify-center rounded-full bg-primary">
            <svg viewBox="0 0 24 24" className="size-4 fill-primary-foreground">
              <path d="M9.8 15.6 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 3.9 2.9c.7.4 1.2.2 1.4-.7l2.6-12c.2-1-.4-1.4-1-1.1L3.4 10.6c-1 .4-1 .9-.2 1.2l3.9 1.2 9-5.7c.4-.3.8-.1.5.2l-6.8 8.1Z" />
            </svg>
          </span>
          <h1 className="text-base font-semibold">
            Telegram <span className="text-primary">Privê</span>
          </h1>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-3.5" /> SEGURO
          </span>
        </header>

        {/* Cover */}
        <img
          src={cover}
          alt="Bia Fit treinando na academia"
          width={1200}
          height={700}
          className="h-56 w-full object-cover"
        />

        {/* Profile */}
        <div className="relative px-4">
          <div className="relative -mt-12 w-fit">
            <img
              src={avatar}
              alt="Foto de perfil da Bia Fit"
              loading="lazy"
              width={512}
              height={512}
              className="size-24 rounded-full border-4 border-background object-cover"
            />
            <span className="absolute bottom-1 right-1 size-4 rounded-full border-2 border-background bg-success" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <h2 className="text-2xl font-bold">Bibi Fontinni</h2>
            <BadgeCheck className="size-5 fill-primary text-primary-foreground" />
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary">
            <BadgeCheck className="size-4" /> VERIFICADA PELO TELEGRAM
          </p>
          <p className="text-sm text-muted-foreground">@bibifontinnie</p>

          <div className="mt-3 flex gap-5 text-sm">
            <span className="flex items-center gap-1.5">
              <Images className="size-4 text-muted-foreground" /> 367 fotos
            </span>
            <span className="flex items-center gap-1.5">
              <Video className="size-4 text-muted-foreground" /> 245 vídeos
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>Assine meu TELEGRAM PRIVÊ ✅</p>
            <p>🟢 Live de todo dia às 22:00 pra assinantes...</p>
            <p>😈 Vides novos toda semana, sozinha e com assinantes</p>
            <p className="font-semibold text-foreground">✅ PAGUE SOMENTE 1 VEZ</p>
            <p className="flex items-center gap-1.5 font-semibold text-destructive">
              <XCircle className="size-4" /> SEM ASSINATURAS MENSAIS
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "100% Entregue",
              "Zero Reclamações",
              "1247 Assinantes Ativos",
              "Acesso Vitalício",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium"
              >
                <CheckCircle2 className="size-3.5 text-success" /> {t}
              </span>
            ))}
          </div>

          <h3 className="mt-6 text-base font-bold uppercase">
            Assinatura permanente ( R$ 16,00 )
          </h3>

          {/* Locked grid */}
          <div className="mt-3 grid grid-cols-2 gap-3 pb-6">
            {items.map((it, i) => (
              <figure key={i}>
                <div className="relative overflow-hidden rounded-lg">
                  {it.video ? (
        {/* No vídeo */}
<video
  src={it.video}
  autoPlay
  loop
  muted
  playsInline
  width={640}
  height={640}
  className="aspect-square w-full scale-110 object-cover"
/>

{/* Na imagem (se cair no else) */}
<img
  src={it.img}
  alt=""
  loading="lazy"
  width={640}
  height={640}
  className="aspect-square w-full scale-110 object-cover"
/>
      ) : (
        <img 
          src={it.img}
          alt=""
          loading="lazy"
          width={640}
          height={640}
          className="aspect-square w-full scale-110 object-cover blur-lg"
        />
      )}
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                    <Lock className="size-8 text-background/90" />
                  </span>
                </div>
                <figcaption className="mt-1.5 text-xs font-semibold uppercase text-muted-foreground">
                  {it.dur}: {it.title}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Big locked banner */}
          <div className="relative mb-8 overflow-hidden rounded-xl">
            <div className="flex h-56 items-center justify-center bg-gradient-to-r from-locked via-locked-highlight to-locked">
              <div className="text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-background/15">
                  <Lock className="size-5 text-background" />
                </span>
                <p className="mt-4 text-sm font-bold uppercase tracking-wide text-background">
                  Assine para liberar as mídias
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy toast */}
      <div
        className={`fixed bottom-24 left-4 z-40 flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-lg transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="flex size-8 items-center justify-center rounded-md bg-success/15">
          <ShoppingBag className="size-4 text-success" />
        </span>
        <p className="text-sm font-medium">{buyers[buyer]}</p>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-3">
        <button
          onClick={() => setCheckout(true)}
          className="mx-auto block w-full max-w-lg rounded-lg bg-primary py-4 text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Liberar completo por R$16,00
        </button>
      </div>

      <PixCheckout open={checkout} onClose={() => setCheckout(false)} />
    </div>
  );
}
