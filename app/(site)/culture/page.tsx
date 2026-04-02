import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import SideTimeline from "@/components/SideTimeline";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "Explore the rich history of Hollywood Heights -- location, landmarks, the Hollywood Bowl, filmed locations, Pinehurst Park, and our neighborhood newsletter archive.",
};

const extLink = (href: string, children: ReactNode) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cream underline decoration-cream/40 underline-offset-2 transition-colors hover:decoration-cream"
  >
    {children}
  </a>
);

const intLink = (href: string, children: ReactNode) => (
  <Link
    href={href}
    className="text-cream underline decoration-cream/40 underline-offset-2 transition-colors hover:decoration-cream"
  >
    {children}
  </Link>
);

interface Section {
  id: string;
  title: string;
  content: ReactNode[];
  images?: { src: string; alt: string }[];
  subsections?: { title: string; paragraphs: ReactNode[]; images?: { src: string; alt: string }[] }[];
  links?: { label: string; href: string }[];
  contact?: string;
  features?: {
    name: string;
    description: string;
    link?: { label: string; href: string };
  }[];
}

const SECTIONS: Section[] = [
  {
    id: "our-neighborhood",
    title: "Enter: Hollywood Heights",
    content: [
      <>Hollywood Heights is a neighborhood in the Hollywood Hills of Los Angeles. Located in what was the northern part of the Rancho La Brea Mexican land grant in the 19th century, H.J. Whitley developed the neighborhood as early as 1902 as part of his Hollywood-Ocean View Tract. Some of our older homes can be found {intLink("/neighborhood#pre-1920", "here")}.</>,
      <>Hollywood Heights is bounded by {extLink("https://www.hollywoodbowl.com/", "The Hollywood Bowl")} on the north, {extLink("https://en.wikipedia.org/wiki/Highland_Avenue_(Los_Angeles)", "Highland Avenue")} on the east, {extLink("http://www.outpostestates.com/", "Outpost Estates")} on the west, and {extLink("https://en.wikipedia.org/wiki/Franklin_Avenue_(Los_Angeles)", "Franklin Avenue")} on the south.</>,
    ],
    images: [
      { src: "/HighTower-1.jpg", alt: "Drawing of Hollywood Heights neighborhood by Annie Kelly — High Tower and surrounding hillside homes" },
    ],
    subsections: [
      {
        title: "The Secluded Life of Hollywood Heights",
        paragraphs: [
          <>The steep hilltops and inclines of Hollywood Heights were not suited for wide roads and cars in the 1900s, so a series of interconnecting stairways and walkways were devised to allow residents access to these cliff-hanging homes. Most famous is the Bolognese style {extLink("http://www.angelenoliving.com/blog/Hollywood-High-Tower-Court", "High Tower")} elevator.</>,
          <>A five story single open cab elevator would take its passengers from their garages on a slow climb up the hill, exposing spectacular views of Hollywood and the city. For its extraordinary staircases and hidden walks, Hollywood Heights made it into the book, {extLink("http://www.secretstairs-la.com/welcome.html", "Secret Stairs-LA")}.</>,
          <>In the early days of Hollywood, one of the spoils of the wealthy, who built their homes tucked into the area{"\u2019"}s plentiful hills, was the option for seclusion. Many of the homes were built into the hills and were only accessible by staircases and pathways. In the era of the automobile, anyone navigating the hills behind the wheel knows how steep and precarious the ascents and descents can be{"\u2014"}not to mention the fine art of parking {"\u2014"} now by {extLink("https://prodpci.etimspayments.com/pbw/include/laopm/preferential_permit.htm", "permit")} only {"\u2014"} in most of Hollywood Heights.</>,
          <>Take away the heavy machinery and strap on a good pair of shoes and you can slide into what feels like another world when you explore the hidden staircases of Hollywood Heights. There{"\u2019"}s about a one mile network of stairs and paths that make for a quick and fun little adventure. And you can end your adventure taking in a meal and some cocktails with some of the most breathtaking views of Los Angeles at {extLink("http://yamashirohollywood.com/", "Yamashiro Hollywood")}.</>,
          <>In a world saturated with technological advancements and efficiency, it{"\u2019"}s satisfying to take a ride up the slow elevator and arrive at a lush oasis courtyard community and walk down these paths and experience the simple pleasure of walking amidst colorful plants and trees and smell the blooming jasmine vines and {extLink("http://www.laist.com/2016/06/09/jacarandas.php", "jacaranda trees")}.</>,
        ],
        images: [
          { src: "/yamashiro-postcard.png", alt: "Yamashiro — historic Japanese palace on Bernheimer Hill, Hollywood, California" },
        ],
      },
      {
        title: "Hollywood Heights Homes",
        paragraphs: [
          <>Home styles range from ranch to Tuscan mediterraneans, as well as a few mid-century originals by {extLink("http://www.franklloydwright.org/", "Frank Lloyd Wright")} and son {extLink("https://en.wikipedia.org/wiki/Lloyd_Wright", "Lloyd Wright")} on Broadview and Alta Loma. The most famous of these being the {extLink("https://en.wikipedia.org/wiki/Samuel_Freeman_House", "Samuel Freeman House")}.</>,
          <>The {extLink("https://en.wikipedia.org/wiki/Raymond_Chandler", "Raymond Chandler")} detective mystery {extLink("https://en.wikipedia.org/wiki/The_Long_Goodbye_(novel)", "The Long Goodbye")} was made into a {extLink("https://www.imdb.com/title/tt0070334/", "movie")} and starred {extLink("https://en.wikipedia.org/wiki/Elliott_Gould", "Elliot Gould")} as detective Phillip Marlowe with one of the High Tower Apartments, the {extLink("http://www.sahscc.org/site/index.php?function=architect_details&id=9", "Carl Kay")}{"\u2013"}designed duplex immediately adjacent to the tower.</>,
          <>See some of the other locally filmed motion pictures in {intLink("/neighborhood#filmed-here", "Hollywood Heights in Film")}.</>,
        ],
        images: [
          { src: "/freeman-house-door.png", alt: "Samuel Freeman House — textile block entrance detail by Frank Lloyd Wright" },
          { src: "/freeman-house-window.png", alt: "Samuel Freeman House — cantilevered window overlooking the Hollywood Hills" },
        ],
      },
      {
        title: "Notable Residents",
        paragraphs: [
          <>{extLink("https://en.wikipedia.org/wiki/Adriana_Caselotti", "Adriana Caselotti")}, the voice of Snow White, called it home for over 40 years. {extLink("http://www.hollywoodheritage.org/", "The Hollywood Heritage Museum")} at Camrose and Highland was previously a micro bungalow developed by {extLink("https://en.wikipedia.org/wiki/Ethel_Barrymore", "Ethel Barrymore")}, sister to actor {extLink("https://en.wikipedia.org/wiki/John_Barrymore", "John Barrymore")}. These charming homes were built to be an artist community in the 1930s, around the time of the depression.</>,
          <>In the 1970s there was a revolving door of musicians, actors and artists, many who helped create the {extLink("https://en.wikipedia.org/wiki/California_Sound", "California Sound")}{"\u2014"}like singer-songwriter {extLink("https://www.jacksonbrowne.com/", "Jackson Browne")}, {extLink("https://www.jdsouther.net/", "John David Souther")}, {extLink("https://en.wikipedia.org/wiki/Gene_Clark", "Gene Clarke")} of {extLink("https://en.wikipedia.org/wiki/The_Byrds", "The Byrds")}, and {extLink("https://en.wikipedia.org/wiki/Glenn_Frey", "Glenn Frey")} of the {extLink("https://en.wikipedia.org/wiki/Eagles_(band)", "Eagles")}.</>,
          <>{extLink("http://belalugosi.com/", "Bela Lugosi")}{"\u2019"}s wife lived here in the 70s while she battled her stepson for her share of his estate and Universal Studios for the licensing of his image in promotional materials. {extLink("https://en.wikipedia.org/wiki/Eva_Longoria", "Eva Longoria")} of {extLink("https://en.wikipedia.org/wiki/Desperate_Housewives", "Desperate Housewives")} owned a modest Mediterranean on Rockledge that she recently sold.</>,
          <>With red clay tile roofs, dripping scarlet {extLink("https://en.wikipedia.org/wiki/Bougainvillea", "bougainvillea")} blooms in every direction and the shimmering city in the near distance, Hollywood Heights is an actual oasis, invigorating for the freshly arrived actors and artists making their way in Hollywood, and it is what makes our neighborhood{"\u2026"}home!</>,
        ],
        images: [
          { src: "/notable-resident-70s.png", alt: "A Hollywood Heights musician in the 1970s — the neighborhood was home to artists who shaped the California Sound" },
        ],
      },
    ],
  },
  {
    id: "hollywood-bowl",
    title: "Hollywood Bowl",
    content: [
      "The Hollywood Bowl, originally known as Daisy Dell or Bolton Canyon, is a 1920s outdoor amphitheater in our neighborhood used primarily for music performances. The Bowl can also be an amazing place to visit in off hours, when concerts are not in session.",
      "The \"bowl\" refers to the shape of the concave hillside the amphitheater is carved into. It is owned by the County of Los Angeles and is the home of the Hollywood Bowl Orchestra, the summer home of the Los Angeles Philharmonic, and the host of hundreds of musical events each year.",
      "The band shell \u2014 a distinctive set of concentric arches \u2014 graced the site from 1929 through 2003, before being replaced with a larger one beginning in the 2004 season. The shell is set against the backdrop of the Hollywood Hills and the famous Hollywood Sign to the northeast.",
      "Located at 2301 North Highland Avenue, north of Hollywood Boulevard, on the west side of the boulevard, just south of Route 101.",
    ],
    links: [
      { label: "Upcoming Events", href: "https://www.hollywoodbowl.com/events/performances" },
      { label: "Neighborhood Resources", href: "https://www.hollywoodbowl.com/about/neighbors" },
      { label: "Road Closure Notifications", href: "https://widget.smsinfo.io/v2/5ab5054b4ab0b4216cf5f4ee961c01ab?st-lid=14168871" },
    ],
  },
  {
    id: "pinehurst-park",
    title: "Pinehurst Park",
    content: [
      "Hollywood Heights has its own member-only park at the corner of Hillcrest and Bonita Terrace. The park has two parts \u2014 one for members and their dogs, and the other just for members.",
      "Only dues-paying members to the Pinehurst Park Association can use it. The Pinehurst Park Association is separate from the Hollywood Heights Association and has separate dues. Membership is $200/year, but HHA members get a special rate of $175/year.",
      "Park maintenance is funded by membership contributions only \u2014 the City does not maintain the park. Creating and maintaining this oasis in the middle of our neighborhood has vastly improved the safety and beauty of the area.",
    ],
    contact: "pinehurstpark@gmail.com",
  },
  {
    id: "hiho-pets",
    title: "HiHo Community Pet Network",
    content: [
      "Our neighborhood is home to so many pet lovers, and our pets are an important part of what makes this community special. That\u2019s why we\u2019ve launched the HiHo Community Pet Project\u2014an effort to connect pet-owners in the community, keep our pets safe, and ensure they\u2019re cared for in any situation.",
      "Whether it\u2019s reuniting lost pets with their families, providing a safe space for play, or offering support during emergencies, this project is all about looking out for one another and the pets we love.",
    ],
    features: [
      {
        name: "Neighborhood Pet Database",
        description: "Help us build a resource to reunite lost pets, assist found animals, and provide support during emergencies.",
        link: { label: "Register Your Pet", href: "https://hollywoodheights.org/hiho-community-pet-network/" },
      },
      {
        name: "Emergency Pet Hotline",
        description: "We've established a dedicated hotline for pet-related emergencies. If you need help with a lost, found, or injured pet:",
        link: { label: "Text (323) 409-0569", href: "sms:+13234090569" },
      },
      {
        name: "Free Poop Bag Stations",
        description: "We have free poop bag stations throughout the neighborhood to make it easier for everyone to keep our community clean.",
      },
      {
        name: "Private Dog Park",
        description: "Our exclusive community dog park is now accepting new members! Let your pups play, socialize, and enjoy a safe, fun space. HHA members receive a discount.",
        link: { label: "Learn About Pinehurst Park", href: "#pinehurst-park" },
      },
    ],
  },
];

interface ArchiveIssue {
  title: string;
  date: string;
  pdf: string;
}

const PDF_BASE = "https://hollywoodheights.org/wp-content/uploads/2025/05";

const ARCHIVE_ISSUES: ArchiveIssue[] = [
  { title: "Volume 1, Issue No. 1", date: "October 1982", pdf: `${PDF_BASE}/1982-Vol-1-Issue-1.pdf` },
  { title: "Volume 2, Issue No. 1", date: "February 1983", pdf: `${PDF_BASE}/1983-Vol-2-Issue-1.pdf` },
  { title: "Volume 2, Issue No. 2", date: "April 1983", pdf: `${PDF_BASE}/1983-Vol-2-Issue-2.pdf` },
  { title: "Volume 2, Issue No. 3", date: "June 1983", pdf: `${PDF_BASE}/1983-Vol-2-Issue-3.pdf` },
  { title: "Volume 2, Issue No. 4", date: "August 1983", pdf: `${PDF_BASE}/1983-Vol-2-Issue-4.pdf` },
  { title: "Volume 2, Issue No. 5", date: "October 1983", pdf: `${PDF_BASE}/1983-Vol-2-Issue-5.pdf` },
  { title: "Volume 3, Issue No. 1", date: "March 1984", pdf: `${PDF_BASE}/1984-Vol-3-Issue-1.pdf` },
  { title: "Volume 3, Issue No. 2", date: "April 1984", pdf: `${PDF_BASE}/1984-Vol-3-Issue-2.pdf` },
  { title: "Volume 3, Issue No. 4", date: "October 1984", pdf: `${PDF_BASE}/1984-Vol-3-Issue-4.pdf` },
  { title: "Volume 4, Issue No. 1", date: "March 1985", pdf: `${PDF_BASE}/1985-Vol-4-Issue-1.pdf` },
  { title: "Volume 4, Issue No. 2", date: "May 1985", pdf: `${PDF_BASE}/1985-Vol-4-Issue-2.pdf` },
  { title: "Volume 4, Issue No. 3", date: "June 1985", pdf: `${PDF_BASE}/1985-Vol-4-Issue-3.pdf` },
  { title: "Volume 4, Issue No. 5", date: "December 1985", pdf: `${PDF_BASE}/1985-Vol-4-Issue-5.pdf` },
  { title: "Volume 5, Issue No. 1", date: "February 1986", pdf: `${PDF_BASE}/1986-Vol-5-Issue-1.pdf` },
  { title: "Volume 5, Issue No. 4", date: "December 1986", pdf: `${PDF_BASE}/1985-Vol-5-Issue-4.pdf` },
  { title: "Volume 6, Issue No. 1", date: "April 1987", pdf: `${PDF_BASE}/1987-Vol-6-Issue-1.pdf` },
  { title: "Volume 6, Issue No. 3", date: "November 1987", pdf: `${PDF_BASE}/1987-Vol-6-Issue-3.pdf` },
  { title: "Volume 8, Issue No. 1", date: "February/March 1989", pdf: `${PDF_BASE}/1989-Vol-8-Issue-1.pdf` },
  { title: "Volume 8, Issue No. 2", date: "Summer 1989", pdf: `${PDF_BASE}/1989-Vol-8-Issue-2.pdf` },
  { title: "Volume 9, Issue No. 1", date: "February 1990", pdf: `${PDF_BASE}/1990-Vol-9-Issue-1.pdf` },
  { title: "Volume 9, Issue No. 2", date: "June 1990", pdf: `${PDF_BASE}/1990-Vol-9-Issue-2.pdf` },
  { title: "Volume 9, Issue No. 3", date: "Fall 1990", pdf: `${PDF_BASE}/1990-Vol-9-Issue-3.pdf` },
  { title: "Volume 10, Issue No. 1", date: "July 1991", pdf: `${PDF_BASE}/1991-Special-Summer-Issue.pdf` },
  { title: "Volume 10, Issue No. 2", date: "Fall 1991", pdf: `${PDF_BASE}/1991-Vol-10-Issue-2.pdf` },
  { title: "Volume 12, Issue No. 2", date: "Summer 1993", pdf: `${PDF_BASE}/1993-Vol-12-Issue-2.pdf` },
  { title: "Single Issue", date: "March 1995", pdf: `${PDF_BASE}/1995-Single-Issue.pdf` },
];

const TIMELINE_ITEMS = [
  ...SECTIONS.map((s) => ({ id: s.id, label: s.title })),
  { id: "hh-view-archive", label: "The Hollywood Heights View" },
];

export default function HistoryPage() {
  return (
    <div>
      <SideTimeline items={TIMELINE_ITEMS} />

      <section className="pt-32 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            Culture
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            The places, stories, and landmarks of Hollywood Heights
          </p>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="py-16 sm:py-20"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-2xl font-light tracking-wide text-cream sm:text-3xl">
              {section.title}
            </h2>

            {section.content.map((paragraph, pi) => (
              <p key={pi} className="mb-5 text-base leading-relaxed text-cream last:mb-0">
                {paragraph}
              </p>
            ))}

            {section.images && section.images.length > 0 && (
              <div className={`mt-8 grid gap-4 ${section.images.length > 1 ? "grid-cols-2" : ""}`}>
                {section.images.map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-lg">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={960}
                      height={640}
                      className={section.images!.length > 1 ? "h-full w-full object-cover" : "h-auto w-full"}
                    />
                  </div>
                ))}
              </div>
            )}

            {section.subsections && (
              <div className="mt-10 space-y-10">
                {section.subsections.map((sub) => (
                  <div key={sub.title}>
                    <h3 className="mb-4 text-xl font-light tracking-wide text-cream">
                      {sub.title}
                    </h3>
                    {sub.paragraphs.map((p, pi) => (
                      <p key={pi} className="mb-5 text-base leading-relaxed text-cream last:mb-0">
                        {p}
                      </p>
                    ))}
                    {sub.images && sub.images.length > 0 && (
                      <div className={`mt-8 grid gap-4 ${sub.images.length > 1 ? "grid-cols-2" : ""}`}>
                        {sub.images.map((img) => (
                          <div key={img.src} className="overflow-hidden rounded-lg">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              width={960}
                              height={640}
                              className={sub.images!.length > 1 ? "h-full w-full object-cover" : "h-auto w-full"}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.links && (
              <div className="mt-8 flex flex-wrap gap-4">
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {section.contact && (
              <div className="mt-8">
                <p className="text-sm text-cream">
                  To apply for membership or tour the park:{" "}
                  <a
                    href={`mailto:${section.contact}`}
                    className="text-cream underline decoration-cream underline-offset-2 hover:decoration-cream"
                  >
                    {section.contact}
                  </a>
                </p>
              </div>
            )}

            {section.features && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {section.features.map((f) => (
                  <div key={f.name} className="rounded-[24px] border border-cream/18 p-5">
                    <h3 className="text-sm font-medium tracking-wide text-cream">{f.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream">
                      {f.description}
                    </p>
                    {f.link && (
                      <a
                        href={f.link.href}
                        target={f.link.href.startsWith("http") ? "_blank" : undefined}
                        rel={f.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-3 inline-block text-sm font-bold uppercase text-cream underline decoration-cream underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                      >
                        {f.link.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      ))}

      {/* The Hollywood Heights View Archive */}
      <section id="hh-view-archive" className="py-16 sm:py-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-2xl font-light tracking-wide text-cream sm:text-3xl">
            The Hollywood Heights View (1982–1995 Archive)
          </h2>
          <p className="mb-5 text-base leading-relaxed text-cream">
            The Hollywood Heights View was the neighborhood newsletter from 1982–1995. Before email and the internet, it kept neighbors connected to local events, businesses, and each other.
          </p>
          <p className="mb-8 text-base leading-relaxed text-cream">
            Edited by legendary reporter <a href="https://en.wikipedia.org/wiki/Theo_Wilson" target="_blank" rel="noopener noreferrer" className="underline decoration-cream underline-offset-2 hover:opacity-80 transition-opacity duration-200">Theo Wilson</a>, the archive provides a journalistic window into the happenings on the hill during the first decade of the Hollywood Heights Association. Though some issues have been lost to time, the archive tells the story of neighborhood volunteers banding together to save local landmarks, the establishment of Pinehurst Park, and a few fun local celebrity stories.
          </p>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-cream/18 sm:grid-cols-2 lg:grid-cols-3">
            {ARCHIVE_ISSUES.map((issue) => (
              <div key={`${issue.title}-${issue.date}`} className="flex flex-col justify-between bg-hollywood-blue p-4">
                <div>
                  <p className="text-sm font-medium text-cream">{issue.title}</p>
                  <p className="text-xs text-cream" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {issue.date}
                  </p>
                </div>
                <div className="mt-3">
                  <a
                    href={issue.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-1.5 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
                  >
                    Preview
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center text-cream">
        <div className="mx-auto max-w-md px-6">
          <p className="text-lg font-light">Want to be part of the story?</p>
          <Link
            href="/membership"
            className="mt-6 inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
          >
            Join the Association
          </Link>
        </div>
      </section>
    </div>
  );
}
