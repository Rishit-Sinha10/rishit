import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next";
import TransitionLayout from "./components/transitionpage";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "../app/components/smoothscroll";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
const SITE_URL = "https://www.rishitsinha.online";
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Rishit Sinha — Portfolio",
    template: "%s | Rishit Sinha",
  },
  description:
    "A Final Year Student building real-time systems and production web apps.",
  keywords: [
    "full-stack developer",
    "software engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "web developer",
    "portfolio",
  ],
  authors: [{ name: "Rishit Sinha" }],
  creator: "Rishit Sinha",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rishit Sinha",
    title: "Rishit Sinha — Portfolio",
    description:
      "Full-stack Developer building real-time systems and production web apps. Final-year CS student with startup experience.",
    images: [
      {
        url: "/Images/og-image.png",
        width: 1917,
        height: 909,
        type: "image/png",
        alt: "Rishit Sinha — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishit Sinha — Full-Stack Engineer",
    description:
      "Full-stack Developer building real-time systems and production web apps.",
    images: ["/Images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rishit Sinha",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer",
    description:
      "Full-stack engineer building real-time systems and production web apps.",
    sameAs: [
      "https://github.com/Rishit-Sinha10",
      "https://www.linkedin.com/in/rishit-sinha-6953ab363",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "WebSockets",
      "Full-Stack Development",
    ],
  };

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="gkLEiSgK5djbrW0Bj1fl9WkZs-rz8AuCjB3-HcIR1mk"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Analytics />
        <SpeedInsights />
        <Providers>
          <TransitionLayout>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </TransitionLayout>
        </Providers>
      </body>
    </html>
  );
}
