import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ColorPicker from "@/components/ColorPicker";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <footer className="py-8 text-center text-sm text-cream">
        <div className="mx-auto max-w-4xl px-6 flex flex-col items-center gap-6">
          <a
            href="https://hollywoodheights.org/wp-content/uploads/2025/05/1990-Vol-9-Issue-2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Image
              src="/letter.png"
              alt="Hollywood Heights Association newsletter"
              width={300}
              height={210}
              className="h-auto w-[240px] transition-transform duration-300 group-hover:rotate-2"
            />
          </a>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
              <span>&copy; {new Date().getFullYear()} Hollywood Heights Association</span>
              <a
                href="https://hollywoodheights.org/wp-content/uploads/2025/06/HHA-Bylaws-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cream/40 underline-offset-2 transition-colors duration-200 hover:decoration-cream"
              >
                Bylaws
              </a>
            </div>
            <span className="text-sm text-cream">
              Designed by{" "}
              <a
                href="https://bobby.so"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cream/40 underline-offset-2 transition-colors duration-200 hover:decoration-cream"
              >
                Robert C. Giangeruso Jr.
              </a>
              {" "}in Hollywood Heights, CA.
            </span>
          </div>
          <ColorPicker />
        </div>
      </footer>
    </>
  );
}
