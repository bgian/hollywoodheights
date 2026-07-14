import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import SideTimeline from "@/components/SideTimeline";
import BoundaryMap from "@/components/BoundaryMap";
import FilmLink from "@/components/FilmLink";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Neighborhood",
  description:
    "Notable landmarks, historic architecture, and the neighborhood newsletter archive of Hollywood Heights.",
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

interface ContentSection {
  id: string;
  title: string;
  content: ReactNode[];
  images?: { src: string; alt: string }[];
  subsections?: { title: string; paragraphs: ReactNode[]; images?: { src: string; alt: string }[] }[];
}

const OUR_NEIGHBORHOOD: ContentSection = {
  id: "our-neighborhood",
  title: "Enter: Hollywood Heights",
  content: [
    <>Hollywood Heights is a neighborhood in the Hollywood Hills of Los Angeles. Located in what was the northern part of the Rancho La Brea Mexican land grant in the 19th century, H.J. Whitley developed the neighborhood as early as 1902 as part of his Hollywood-Ocean View Tract. Some of our older homes can be found {intLink("#pre-1920", "here")}.</>,
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
        <>See some of the other locally filmed motion pictures in {intLink("#filmed-here", "Hollywood Heights in Film")}.</>,
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
};

interface Landmark {
  name: string;
  yearBuilt: string;
  architect: string;
  address: string;
  italic?: boolean;
}

const NATIONAL_REGISTER: Landmark[] = [
  { name: "Samuel Freeman House", yearBuilt: "1922", architect: "Frank Lloyd Wright", address: "1962 Glencoe Way" },
  { name: "Highland-Camrose Bungalow Village", yearBuilt: "1916\u20131923", architect: "the Taylor Brothers and Lee Campbell", address: "NW corner of Highland and Camrose" },
  { name: "Villa Bonita", yearBuilt: "1929", architect: "Frank Webster", address: "1917 Hillcrest Road" },
  { name: "Yamashiro Historic District", yearBuilt: "1914", architect: "Franklin M. Small, Walter Webber", address: "1999 N. Sycamore Avenue" },
];

const LA_CULTURAL: Landmark[] = [
  { name: "First United Methodist Church of Hollywood", yearBuilt: "1929", architect: "Thomas P. Barber", address: "6817 Franklin Avenue" },
  { name: "Franklin Garden Apartments (demolished 1978)", yearBuilt: "1920", architect: "L.H. Baldwin", address: "6915\u20136933 Franklin Avenue", italic: true },
  { name: "Samuel Freeman House", yearBuilt: "1922", architect: "Frank Lloyd Wright", address: "1962 Glencoe Way" },
  { name: "B.A.G. Fuller House", yearBuilt: "1933", architect: "Ralph Flewelling", address: "6887 Alta Loma Terrace" },
  { name: "Highland-Camrose Bungalow Village", yearBuilt: "1916\u20131923", architect: "the Taylor Brothers and Lee Campbell", address: "NW corner of Highland and Camrose" },
  { name: "Hollywood Post 43 American Legion Memorial Club House", yearBuilt: "1929", architect: "Weston and Weston (Eugene Weston, Jr.)", address: "2035 Highland Avenue" },
  { name: "The Magic Castle aka Lane House", yearBuilt: "1909", architect: "Dennis and Farwell", address: "7001 Franklin Avenue" },
  { name: "Las Orchidas", yearBuilt: "1929", architect: "Wilford Buckland (note WB\u2019s history)", address: "NW corner of Orchid and Bonita Terrace" },
  { name: "Villa Bonita", yearBuilt: "1929", architect: "Frank Webster", address: "1917 Hillcrest Road" },
  { name: "Yamashiro Restaurant aka Bernheimer Bungalow", yearBuilt: "1914", architect: "Franklin M. Small, Walter Webber", address: "1999 N. Sycamore Avenue" },
];

const ADDITIONAL: Landmark[] = [
  { name: "Otto Bollman House", yearBuilt: "1922", architect: "Lloyd Wright", address: "2200 Broadview Terrace" },
  { name: "de Keyser Duplex", yearBuilt: "1935", architect: "R.M. Schindler", address: "1911 & 1913 Highland Avenue" },
  { name: "The High Tower", yearBuilt: "1923", architect: "Carl Kay", address: "North end of High Tower Drive" },
  { name: "Hollywood Duplex", yearBuilt: "1990", architect: "Koning Eizenberg Architecture", address: "6947\u20136949 Camrose Drive" },
  { name: "Koosis House", yearBuilt: "1940", architect: "Raphael S. Soriano", address: "1941 Glencoe Way" },
  { name: "Colegrove-Loyd House", yearBuilt: "2012", architect: "Marmol Radziner Architects", address: "2068 Glencoe Way" },
  { name: "Carl Kay Houses", yearBuilt: "ca. 1936\u20131957", architect: "Carl Kay", address: "2181\u20132189, 2182 Broadview Terrace" },
  { name: "3 Houses", yearBuilt: "1980", architect: "OffenhauserMackeel", address: "1955\u20131965 N. Sycamore Avenue" },
];

interface PreWarHouse {
  yearBuilt: string;
  address: string;
}

const PRE_1920: PreWarHouse[] = [
  { yearBuilt: "1905", address: "1936 Pinehurst Road" },
  { yearBuilt: "1906", address: "2018 Hillcrest Road" },
  { yearBuilt: "1907", address: "1931 Pinehurst Road" },
  { yearBuilt: "1909", address: "1927 Pinehurst Road" },
  { yearBuilt: "1910", address: "1974 Hillcrest Road" },
  { yearBuilt: "1911", address: "6923 Bonita Terrace" },
  { yearBuilt: "1912", address: "2002 Hillcrest Road" },
  { yearBuilt: "1912", address: "1933 N. Orchid Avenue" },
  { yearBuilt: "1912", address: "1954 Pinehurst Road" },
  { yearBuilt: "1912", address: "2020 Pinehurst Road" },
  { yearBuilt: "1912", address: "2030 Pinehurst Road" },
  { yearBuilt: "1912", address: "1994 N. Sycamore Avenue" },
  { yearBuilt: "1913", address: "1919 Pinehurst Road" },
  { yearBuilt: "1913", address: "2041 Pinehurst Road" },
  { yearBuilt: "1914", address: "1930 N. Orchid Avenue" },
  { yearBuilt: "1914", address: "1939 Pinehurst Road" },
  { yearBuilt: "1914", address: "2017 Pinehurst Road" },
  { yearBuilt: "1915", address: "2015 Hillcrest Road" },
  { yearBuilt: "1917", address: "1907 N. Highland Avenue" },
  { yearBuilt: "1917", address: "1960 Hillcrest Road" },
  { yearBuilt: "1917", address: "1918 Pinehurst Road" },
  { yearBuilt: "1917", address: "2011 Pinehurst Road" },
  { yearBuilt: "1917", address: "1966 N. Sycamore Avenue" },
  { yearBuilt: "1918", address: "2042 Pinehurst Road" },
  { yearBuilt: "1918", address: "2045 Pinehurst Road" },
];

interface Film {
  title: string;
  imdb: string;
  poster: string;
}

interface FilmedLocation {
  name: string;
  films: Film[];
}

const FILMED_LOCATIONS: FilmedLocation[] = [
  {
    name: "The High Tower",
    films: [
      { title: "Dead Again (1991)", imdb: "https://www.imdb.com/title/tt0101669/", poster: "https://image.tmdb.org/t/p/w185/iqSmb9ugb8xK6avZ3Wglxue39N8.jpg" },
      { title: "The Long Goodbye (1973)", imdb: "https://www.imdb.com/title/tt0070334/", poster: "https://image.tmdb.org/t/p/w185/oBhUK54yBJ0aH6u9zCzSV5iV7OP.jpg" },
    ],
  },
  {
    name: "Hollywood United Methodist Church",
    films: [
      { title: "Anger Management (2003)", imdb: "https://www.imdb.com/title/tt0305658/", poster: "https://image.tmdb.org/t/p/w185/ekItnn6W73RN9muvLTbeRW8LHlo.jpg" },
      { title: "The Godfather (1972)", imdb: "https://www.imdb.com/title/tt0068646/", poster: "https://image.tmdb.org/t/p/w185/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
      { title: "Back to the Future (1985)", imdb: "https://www.imdb.com/title/tt0088763/", poster: "https://image.tmdb.org/t/p/w185/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg" },
      { title: "Sister Act (1992)", imdb: "https://www.imdb.com/title/tt0105417/", poster: "https://image.tmdb.org/t/p/w185/xZvVSZ0RTxIjblLV87vs7ADM12m.jpg" },
      { title: "That Thing You Do! (1996)", imdb: "https://www.imdb.com/title/tt0117887/", poster: "https://image.tmdb.org/t/p/w185/9RmZu33qHdyZFGLfhEOmkTjdNEu.jpg" },
      { title: "What Price Hollywood? (1932)", imdb: "https://www.imdb.com/title/tt0023686/", poster: "https://image.tmdb.org/t/p/w185/9QvBGIOA39lZ1Ood9Q7ZZq33Bdd.jpg" },
    ],
  },
  {
    name: "Hollywood Post American Legion Post 43",
    films: [
      { title: "All the Way (2016)", imdb: "https://www.imdb.com/title/tt3791216/", poster: "https://image.tmdb.org/t/p/w185/lHLOUt0ZIQLC5asHdIQBoTUvaEp.jpg" },
      { title: "Bad Words (2013)", imdb: "https://www.imdb.com/title/tt2170299/", poster: "https://image.tmdb.org/t/p/w185/hZo399sszo6QxEPOmqJiq5NhQeU.jpg" },
      { title: "Gloria (1980)", imdb: "https://www.imdb.com/title/tt0080798/", poster: "https://image.tmdb.org/t/p/w185/nnCma0e35LNC066hneSvDqZXuvX.jpg" },
      { title: "The Shining (1980)", imdb: "https://www.imdb.com/title/tt0081505/", poster: "https://image.tmdb.org/t/p/w185/uAR0AWqhQL1hQa69UDEbb2rE5Wx.jpg" },
      { title: "Star Trek (2009)", imdb: "https://www.imdb.com/title/tt0796366/", poster: "https://image.tmdb.org/t/p/w185/bPsxOpHVpVCX3hFz2fxnF1Vz3Dj.jpg" },
    ],
  },
  {
    name: "Yamashiro",
    films: [
      { title: "Blind Date (1987)", imdb: "https://www.imdb.com/title/tt0092666/", poster: "https://image.tmdb.org/t/p/w185/drko88F08Z8X4neuiDbFBafAXw7.jpg" },
      { title: "Gone in 60 Seconds (2000)", imdb: "https://www.imdb.com/title/tt0187078/", poster: "https://image.tmdb.org/t/p/w185/3n1hYXD21Ofa7Br10AE8Dtv7Q37.jpg" },
      { title: "Memoirs of a Geisha (2005)", imdb: "https://www.imdb.com/title/tt0397535/", poster: "https://image.tmdb.org/t/p/w185/pBwYsQaSTgnPphIy02DJjCF2cqs.jpg" },
      { title: "Sayonara (1957)", imdb: "https://www.imdb.com/title/tt0050933/", poster: "https://image.tmdb.org/t/p/w185/xSXJDamf9vSb1qOiBhOMjB2soDE.jpg" },
      { title: "The Teahouse of the August Moon (1956)", imdb: "https://www.imdb.com/title/tt0049830/", poster: "https://image.tmdb.org/t/p/w185/v2G1Vh14X9NslrHR9zGlGoV1i4M.jpg" },
    ],
  },
];


interface ArchiveIssue {
  title: string;
  date: string;
  pdf: string;
}

const PDF_BASE = "/newsletters";

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

const ARCHITECTURE_SECTIONS = [
  { id: "national-register", title: "National Register of Historic Places", landmarks: NATIONAL_REGISTER },
  { id: "la-cultural", title: "Los Angeles Historic-Cultural Landmarks", landmarks: LA_CULTURAL },
  { id: "additional", title: "Additional Notable Architecture", landmarks: ADDITIONAL },
  { id: "pre-1920", title: "Houses Built Before 1920", landmarks: null },
];

const OTHER_SECTIONS = [
  { id: "filmed-here", title: "Filmed in Hollywood Heights" },
  { id: "take-a-tour", title: "Take a Tour" },
  { id: "hh-view-archive", title: "The Hollywood Heights View" },
];

const TIMELINE_ITEMS = [
  { id: "boundary-map", label: "Boundary Map" },
  { id: "our-neighborhood", label: "Enter: Hollywood Heights" },
  { id: "architecture", label: "Architecture" },
  ...ARCHITECTURE_SECTIONS.map((s) => ({ id: s.id, label: s.title })),
  ...OTHER_SECTIONS.map((s) => ({ id: s.id, label: s.title })),
];

function Pre1920Table({ houses }: { houses: PreWarHouse[] }) {
  return (
    <div className="overflow-x-auto">
      <p className="mb-6 text-sm text-cream">
        *This list is for houses still being used as residences, and so does not include Yamashiro, The Magic Castle, and the Highland-Camrose bungalows.
      </p>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-cream/18">
            <th className="pb-3 pr-6 text-xs font-bold uppercase tracking-wider text-cream">Year Built</th>
            <th className="pb-3 text-xs font-bold uppercase tracking-wider text-cream">Address</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h, i) => (
            <tr key={`${h.yearBuilt}-${h.address}`} className="border-b border-cream/18 last:border-b-0">
              <td className="py-4 pr-6 text-cream" style={{ fontVariantNumeric: "tabular-nums" }}>{h.yearBuilt}</td>
              <td className="py-4 text-cream">{h.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LandmarkTable({ landmarks }: { landmarks: Landmark[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-cream/18">
            <th className="pb-3 pr-6 text-xs font-bold uppercase tracking-wider text-cream">Building</th>
            <th className="pb-3 pr-6 text-xs font-bold uppercase tracking-wider text-cream">Year</th>
            <th className="hidden pb-3 pr-6 text-xs font-bold uppercase tracking-wider text-cream sm:table-cell">Architect</th>
            <th className="hidden pb-3 text-xs font-bold uppercase tracking-wider text-cream md:table-cell">Address</th>
          </tr>
        </thead>
        <tbody>
          {landmarks.map((l) => (
            <tr key={`${l.name}-${l.address}`} className="border-b border-cream/18 last:border-b-0">
              <td className={`py-4 pr-6 text-cream ${l.italic ? "italic" : ""}`}>{l.name}</td>
              <td className="py-4 pr-6 text-cream" style={{ fontVariantNumeric: "tabular-nums" }}>{l.yearBuilt}</td>
              <td className="hidden py-4 pr-6 text-cream sm:table-cell">{l.architect}</td>
              <td className="hidden py-4 text-cream md:table-cell">{l.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LandmarksPage() {
  return (
    <div>
      <SideTimeline items={TIMELINE_ITEMS} />

      <section className="pt-40 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="py-3 text-5xl font-medium uppercase tracking-tight sm:text-6xl lg:text-7xl">
            Neighborhood
          </h1>
        </div>
      </section>

      {/* Boundary Map */}
      <section id="boundary-map" className="pt-6 pb-16 sm:pt-8 sm:pb-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-3xl font-light tracking-wide text-cream sm:text-4xl">
            Boundary Map
          </h2>
          <BoundaryMap />
        </div>
      </section>

      {/* Enter: Hollywood Heights */}
      <section id={OUR_NEIGHBORHOOD.id} className="py-16 sm:py-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-2xl font-light tracking-wide text-cream sm:text-3xl">
            {OUR_NEIGHBORHOOD.title}
          </h2>

          {OUR_NEIGHBORHOOD.content.map((paragraph, pi) => (
            <p key={pi} className="mb-5 text-base leading-relaxed text-cream last:mb-0">
              {paragraph}
            </p>
          ))}

          {OUR_NEIGHBORHOOD.images && OUR_NEIGHBORHOOD.images.length > 0 && (
            <div className={`mt-8 grid gap-4 ${OUR_NEIGHBORHOOD.images.length > 1 ? "grid-cols-2" : ""}`}>
              {OUR_NEIGHBORHOOD.images.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={960}
                    height={640}
                    className={OUR_NEIGHBORHOOD.images!.length > 1 ? "h-full w-full object-cover" : "h-auto w-full"}
                  />
                </div>
              ))}
            </div>
          )}

          {OUR_NEIGHBORHOOD.subsections && (
            <div className="mt-10 space-y-10">
              {OUR_NEIGHBORHOOD.subsections.map((sub) => (
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
        </div>
      </section>

      {/* Architecture group */}
      <section id="architecture" className="py-16 sm:py-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-3xl font-light tracking-wide text-cream sm:text-4xl">
            Architecture
          </h2>
          <p className="mb-5 text-base leading-relaxed text-cream">
            Hollywood Heights is located in the eastern section of the Santa Monica Mountains, forming the western half of the Cahuenga Pass. The neighborhood features homes built before 1920, notable landmarks, and a distinct boundary that sets it apart from the surrounding city.
          </p>
          <p className="text-base leading-relaxed text-cream">
            Developed in the 1920s, the area is characterized by winding streets, Mediterranean Revival architecture, stairways connecting hillside streets, and an intimacy unusual for Los Angeles.
          </p>
        </div>
      </section>

      {ARCHITECTURE_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="py-12 sm:py-16"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <h3 className="mb-8 text-xl font-light tracking-wide text-cream sm:text-2xl">
              {section.title}
            </h3>
            {section.id === "pre-1920" ? (
              <Pre1920Table houses={PRE_1920} />
            ) : (
              section.landmarks && <LandmarkTable landmarks={section.landmarks} />
            )}
          </div>
        </section>
      ))}

      {/* Filmed in Hollywood Heights */}
      <section id="filmed-here" className="py-16 sm:py-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-3xl font-light tracking-wide text-cream sm:text-4xl">
            Filmed in Hollywood Heights
          </h2>
          <p className="mb-8 text-base leading-relaxed text-cream">
            Since about 1910, the area surrounding Hollywood Heights has been a hub of movie making. Within a few miles of our neighborhood, you can visit the Warner Brothers, Paramount, and Disney studios.
          </p>
          <div className="space-y-6">
            {FILMED_LOCATIONS.map((loc) => (
              <div key={loc.name}>
                <h3 className="text-lg font-medium text-cream">{loc.name}</h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {loc.films.map((film) => (
                    <li key={film.title} className="text-sm italic text-cream">
                      <FilmLink
                        title={film.title}
                        imdb={film.imdb}
                        poster={film.poster}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Take a Tour */}
      <section id="take-a-tour" className="py-16 sm:py-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-3xl font-light tracking-wide text-cream sm:text-4xl">
            Take a Tour
          </h2>
          <p className="mb-8 text-base leading-relaxed text-cream">
            Join Justin Root on a walking tour of Hollywood Heights story locations. This video series explores the history, architecture, and hidden stories behind the neighborhood&apos;s most iconic spots.
          </p>
          <a
            href="https://www.youtube.com/playlist?list=PLIrtgLCbspjr5vSSPELAxVTOZJ7YpztWg"
            target="_blank"
            rel="noopener noreferrer"
            className="group block aspect-video w-full overflow-hidden rounded-[24px] border border-cream/18 bg-hollywood-blue transition-opacity duration-200 hover:opacity-90"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              <Logo className="w-[70%] max-w-[520px]" />
              <div className="flex items-center gap-3 text-cream/70 transition-colors duration-200 group-hover:text-cream">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.1357 4.89899C15.3194 4.77393 16.405 5.15757 17.3379 5.5904C18.2815 6.02828 19.4167 6.6904 20.751 7.4654L37.4971 17.192C38.832 17.9674 39.9707 18.6249 40.8193 19.2281C41.6593 19.8252 42.5242 20.5768 43.0049 21.6627C43.6635 23.1511 43.6636 24.85 43.0049 26.3384C42.5242 27.4244 41.6593 28.1759 40.8193 28.773C39.9706 29.3763 38.8321 30.0337 37.4971 30.8092L20.751 40.5357C19.4167 41.3108 18.2815 41.9728 17.3379 42.4107C16.405 42.8435 15.3194 43.2272 14.1357 43.1021C12.5144 42.9303 11.0463 42.0727 10.0928 40.7525C9.39843 39.7907 9.18743 38.6625 9.09375 37.6353C8.99908 36.596 9 35.2779 9 33.7271V14.274C9 12.7232 8.99908 11.4051 9.09375 10.3658C9.18742 9.3386 9.39839 8.21043 10.0928 7.2486C11.0463 5.92826 12.5143 5.07082 14.1357 4.89899ZM14.6104 9.37556C14.2659 9.412 13.9486 9.59384 13.7402 9.88239C13.7685 9.84319 13.6461 9.97434 13.5732 10.773C13.5015 11.5597 13.5 12.6346 13.5 14.274V33.7271C13.5 35.3666 13.5015 36.4415 13.5732 37.2281C13.6459 38.0251 13.7679 38.1572 13.7402 38.1187C13.9486 38.4071 14.266 38.5891 14.6104 38.6256C14.6591 38.6211 14.8862 38.5876 15.4424 38.3297C16.1538 37.9996 17.0804 37.4651 18.4922 36.6451L35.2353 26.9185C36.6474 26.0984 37.5718 25.56 38.2119 25.1051C38.8538 24.6488 38.9096 24.4766 38.8916 24.5162C39.0363 24.1883 39.0362 23.8128 38.8916 23.4849C38.9092 23.5234 38.8521 23.3511 38.2119 22.8961C37.5719 22.4411 36.6473 21.9027 35.2353 21.0826L18.4922 11.356C17.0805 10.536 16.1537 10.0015 15.4424 9.67146C14.8863 9.41355 14.6592 9.38 14.6104 9.37556Z" fill="currentColor"/>
                </svg>
                <span className="text-3xl font-bold uppercase tracking-[0.06em]">Tour</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* The Hollywood Heights View Archive */}
      <section id="hh-view-archive" className="py-16 sm:py-20" style={{ scrollMarginTop: "5rem" }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-3xl font-light tracking-wide text-cream sm:text-4xl">
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

    </div>
  );
}
