"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { services } from "@/content/services";
import { Arrow } from "./ui";

export function ServicesCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("a");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 24), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-8">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/servicos/${s.slug}`}
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-section shadow-lg transition-transform duration-300 hover:-translate-y-2 sm:w-[46%] lg:w-[calc((100%-48px)/3)]"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image src={s.image} alt="" fill sizes="(min-width:1024px) 400px, 80vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black md:text-xl">{s.title}</h3>
                <p className="text-sm leading-relaxed text-black/70">{s.short}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
                Saiba mais <Arrow className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-3">
        <button onClick={() => scroll(-1)} aria-label="Serviço anterior" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black">
          <Arrow className="rotate-180" />
        </button>
        <button onClick={() => scroll(1)} aria-label="Próximo serviço" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black">
          <Arrow />
        </button>
      </div>
    </div>
  );
}
