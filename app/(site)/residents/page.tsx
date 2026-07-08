import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import SideTimeline from "@/components/SideTimeline";

export const metadata: Metadata = {
  title: "Residents",
  description:
    "Explore the rich history of Hollywood Heights -- location, landmarks, the Hollywood Bowl, filmed locations, and Pinehurst Park.",
};

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
        link: { label: "Register Your Pet", href: "https://docs.google.com/forms/d/e/1FAIpQLSeifF64UHbFk6O8k0ncYKH76AD95aOlXDxnDoTUy0hEZfdUHw/viewform?usp=send_form" },
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

const TIMELINE_ITEMS = [
  ...SECTIONS.map((s) => ({ id: s.id, label: s.title })),
];

export default function HistoryPage() {
  return (
    <div>
      <SideTimeline items={TIMELINE_ITEMS} />

      <section className="pt-32 pb-6">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            Residents
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
