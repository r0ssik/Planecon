import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { BlogPost } from "@/lib/blog";
import { urlFor } from "@/sanity/client";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="pt-4 text-2xl font-semibold text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-2 text-xl font-semibold text-primary">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-accent pl-4 text-black/70 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="ml-6 list-disc space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="ml-6 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href) && !href.includes("planeconcontabilidade.com.br");
      return (
        <a href={href} className="text-brand underline" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image
          src={urlFor(value).width(1400).fit("max").url()}
          alt={value.alt ?? ""}
          width={1400}
          height={900}
          sizes="(min-width:768px) 720px, 100vw"
          className="my-6 h-auto w-full rounded-xl"
        />
      ) : null,
  },
};

// Texto do artigo: Portable Text (Sanity) ou parágrafos locais ("## " = subtítulo)
export function PostBody({ body }: { body: BlogPost["body"] }) {
  const isLocal = body.length > 0 && typeof body[0] === "string";
  return (
    <div className="space-y-5 text-lg leading-relaxed text-black/80">
      {isLocal ? (
        (body as string[]).map((para, i) =>
          para.startsWith("## ") ? (
            <h2 key={i} className="pt-4 text-2xl font-semibold text-primary">
              {para.slice(3)}
            </h2>
          ) : (
            <p key={i}>{para}</p>
          ),
        )
      ) : (
        <PortableText value={body as Exclude<BlogPost["body"], string[]>} components={components} />
      )}
    </div>
  );
}
