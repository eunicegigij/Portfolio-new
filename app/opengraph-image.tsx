import { OgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt =
  "Eunice Jacob, Software Engineer. Backend, full-stack, payments, and integrations.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return OgImage();
}
