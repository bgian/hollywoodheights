import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/sanity/queries";
import PortableTextRenderer from "@/components/PortableText";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "News" };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post: { slug: { current: string } }) => ({
      slug: post.slug.current,
    }));
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <div>
      <section className="pt-32 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link
            href="/news"
            className="mb-6 inline-block text-xs tracking-[0.2em] uppercase text-cream transition-colors duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
          >
            &larr; All News
          </Link>
          <h1 className="text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <time
            dateTime={post.publishedAt}
            className="mt-4 block text-sm tracking-wider text-cream"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {date}
          </time>
        </div>
      </section>

      {post.mainImage?.asset?.url && (
        <div className="mx-auto -mt-8 max-w-4xl px-6">
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            width={1200}
            height={675}
            priority
            className="w-full rounded shadow-lg"
          />
        </div>
      )}

      <article className="mx-auto max-w-3xl px-6 py-16">
        {post.body && <PortableTextRenderer value={post.body} />}
      </article>
    </div>
  );
}
