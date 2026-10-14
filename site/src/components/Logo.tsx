import Image from "next/image";

// Logotipo oficial redesenhado em vetor (SVG) a partir do logo do site antigo — nítido em qualquer tamanho.
// "light" = versão com texto branco para fundos escuros.
export function Logo({ light = true, className = "h-12 w-auto md:h-14" }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? "/images/logo-planecon-light.svg" : "/images/logo-planecon.svg"}
      alt="Planecon Contabilidade"
      width={197}
      height={83}
      priority
      unoptimized
      className={className}
    />
  );
}
