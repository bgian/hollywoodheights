"use client";

import { PortableText as PortableTextComponent } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

interface SanityImage {
  asset: { url: string };
  alt?: string;
  caption?: string;
}

const components = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?.url) return null;
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="w-full rounded"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-cream">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-10 text-2xl font-light tracking-wide text-cream">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 text-xl font-light tracking-wide text-cream">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 text-base leading-relaxed text-cream">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l border-cream/18 pl-6 text-cream italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-cream underline decoration-cream underline-offset-2 transition-colors duration-200 hover:decoration-cream"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
}

export default function PortableTextRenderer({ value }: PortableTextProps) {
  if (!value) return null;
  return <PortableTextComponent value={value} components={components} />;
}
