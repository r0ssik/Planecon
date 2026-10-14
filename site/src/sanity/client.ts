import { createClient } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// useCdn: false — o cache é feito pelo próprio Next.js e limpo pelo webhook /api/revalidate.
export const client = createClient({ projectId: projectId || "missing", dataset, apiVersion, useCdn: false, perspective: "published" });

const builder = createImageUrlBuilder({ projectId: projectId || "missing", dataset });
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format").fit("crop");
