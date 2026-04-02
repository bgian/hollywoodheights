import type { Metadata } from "next";
import SideTimeline from "@/components/SideTimeline";
import BoundaryMap from "@/components/BoundaryMap";
import FilmLink from "@/components/FilmLink";

export const metadata: Metadata = {
  title: "Neighborhood",
  description:
    "Notable landmarks and historic architecture in the Hollywood Heights neighborhood.",
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


const ARCHITECTURE_SECTIONS = [
  { id: "national-register", title: "National Register of Historic Places", landmarks: NATIONAL_REGISTER },
  { id: "la-cultural", title: "Los Angeles Historic-Cultural Landmarks", landmarks: LA_CULTURAL },
  { id: "additional", title: "Additional Notable Architecture", landmarks: ADDITIONAL },
  { id: "pre-1920", title: "Houses Built Before 1920", landmarks: null },
];

const OTHER_SECTIONS = [
  { id: "filmed-here", title: "Filmed in Hollywood Heights" },
  { id: "take-a-tour", title: "Take a Tour" },
];

const TIMELINE_ITEMS = [
  { id: "boundary-map", label: "Boundary Map" },
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

      <section className="pt-32 pb-6">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
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
          <div className="aspect-video w-full overflow-hidden rounded-[24px]">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLIrtgLCbspjr5vSSPELAxVTOZJ7YpztWg"
              title="Hollywood Heights Story Location Tour with Justin Root"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <p className="mt-6 text-sm text-cream">
            <a
              href="https://www.youtube.com/playlist?list=PLIrtgLCbspjr5vSSPELAxVTOZJ7YpztWg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] bg-cream px-5 py-2 text-xs font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90"
            >
              View full playlist on YouTube
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}
