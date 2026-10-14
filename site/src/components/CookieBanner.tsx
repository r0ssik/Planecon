"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const KEY = "planecon-cookies-ok";

export function CookieBanner() {
  const accepted = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return !!localStorage.getItem(KEY);
      } catch {
        return false;
      }
    },
    () => true, // no servidor não renderiza o aviso
  );
  const [closed, setClosed] = useState(false);

  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setClosed(true);
  };

  if (accepted || closed) return null;

  return (
    <div role="dialog" aria-label="Aviso de cookies" className="fixed bottom-4 left-4 right-24 z-50 max-w-sm rounded-2xl bg-white p-5 shadow-2xl sm:right-auto">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-primary">Aviso de cookies</h2>
        <button onClick={close} aria-label="Fechar aviso" className="text-xl leading-none text-black/60 hover:text-black">
          ×
        </button>
      </div>
      <p className="text-xs leading-relaxed text-black/70">
        Usamos cookies e coletamos dados conforme a LGPD para melhorar sua experiência. Ao continuar navegando, você concorda com
        nossa Política de Privacidade.
      </p>
      <div className="mt-4 flex items-center justify-end gap-4 text-xs">
        <Link href="/politica-de-privacidade" className="text-black/80 underline">
          Acessar Política
        </Link>
        <button onClick={close} className="rounded-md bg-primary px-3 py-2 font-medium text-white hover:bg-brand">
          Entendi
        </button>
      </div>
    </div>
  );
}
