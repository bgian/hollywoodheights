import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hollywood Heights",
  description:
    "Hollywood Heights is where old Hollywood meets old Europe. A charming blend of Tuscan style walk streets and rolling hills above the Hollywood Bowl.",
  metadataBase: new URL("https://hollywoodheights-alpha.vercel.app"),
  openGraph: {
    title: "Hollywood Heights",
    description:
      "A charming blend of Tuscan style walk streets and rolling hills above the Hollywood Bowl.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="theme-color" content="#430A03" />
      </head>
      <body className="min-h-full bg-hollywood-blue font-statius text-cream antialiased">{children}</body>
    </html>
  );
}
