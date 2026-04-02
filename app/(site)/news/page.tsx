import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/sanity/queries";
import SideTimeline from "@/components/SideTimeline";

export const metadata: Metadata = {
  title: "News",
  description:
    "The latest news from the desk of Hollywood Heights.",
};

export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
}


function PostCard({ post }: { post: Post }) {
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <article className="group">
      <Link
        href={`/news/${post.slug.current}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded"
      >
        {post.mainImage?.asset?.url && (
          <div className="aspect-[3/2] overflow-hidden rounded bg-cream-dark">
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="mt-4">
          <time
            dateTime={post.publishedAt}
            className="text-xs tracking-[0.15em] uppercase text-cream"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {date}
          </time>
          <h2 className="mt-2 text-xl font-light tracking-wide text-cream transition-colors duration-200 group-hover:text-cream">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

const TIMELINE_ITEMS = [
  { id: "latest-news", label: "Latest News" },
];

export default async function NewsPage() {
  let posts: Post[] = [];

  try {
    posts = await getPosts();
  } catch {
    // Sanity not configured yet
  }

  return (
    <div>
      <SideTimeline items={TIMELINE_ITEMS} />

      {/* Hero */}
      <section className="pt-32 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            News
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            From the desk of Hollywood Heights
          </p>
        </div>
      </section>

      {/* Latest News (Sanity posts) */}
      <section
        id="latest-news"
        className="py-16 sm:py-20"
        style={{ scrollMarginTop: "5rem" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-xs font-semibold tracking-[0.2em] uppercase text-cream">
            Latest News
          </h2>
          {posts.length > 0 ? (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-cream/18 py-12 text-center">
              <p className="text-base text-cream">
                No posts yet. Check back soon for news from the neighborhood.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Archival link */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-base text-cream">
            Looking for the Hollywood Heights View newsletter archive (1982–1995)?
          </p>
          <Link
            href="/culture#hh-view-archive"
            className="mt-4 inline-flex items-center rounded-[10px] bg-cream px-6 py-2.5 text-xs font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90"
          >
            Browse the Archive
          </Link>
        </div>
      </section>
    </div>
  );
}
