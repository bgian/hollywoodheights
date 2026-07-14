import { getRecentNewsletters } from "@/lib/constantContact";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export default async function PastNewsletters() {
  const newsletters = await getRecentNewsletters();

  if (newsletters.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
        Past Newsletters
      </h2>
      <p className="mb-8 text-base leading-relaxed text-cream">
        Catch up on recent editions of the Hollywood Heights newsletter.
      </p>
      <div className="grid gap-px overflow-hidden rounded-[24px] border border-cream/18 sm:grid-cols-2 lg:grid-cols-3">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            className="flex flex-col justify-between bg-hollywood-blue p-4"
          >
            <div>
              <p className="text-sm font-medium text-cream">{newsletter.name}</p>
              <p className="text-xs text-cream" style={{ fontVariantNumeric: "tabular-nums" }}>
                {dateFormatter.format(new Date(newsletter.sentAt))}
              </p>
            </div>
            <div className="mt-3">
              <a
                href={newsletter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-1.5 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
              >
                Read
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
