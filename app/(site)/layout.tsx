import Header from "@/components/Header";

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
        <div className="mx-auto max-w-4xl px-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <span>&copy; {new Date().getFullYear()} Hollywood Heights Association</span>
          <a
            href="https://hollywoodheights.org/wp-content/uploads/2025/06/HHA-Bylaws-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-cream underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            Bylaws
          </a>
        </div>
      </footer>
    </>
  );
}
