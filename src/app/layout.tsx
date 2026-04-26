import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seekhobussiness.co.in"),
  title: {
    default: "Seekho Business ΓÇö Learn Business, NCERT & Life Skills Through Video Courses",
    template: "%s | Seekho Business",
  },
  description:
    "India's #1 video learning platform for business books, NCERT chapters & life skills. Watch 70+ videos per book starting at Γé╣99. Rich Dad Poor Dad, Physics, Chemistry & more.",
  keywords: [
    "seekho business",
    "business video courses",
    "rich dad poor dad course",
    "NCERT video lectures",
    "class 10 physics",
    "business books summary",
    "online learning india",
    "video learning platform",
    "affordable courses india",
  ],
  authors: [{ name: "Seekho Business", url: "https://seekhobussiness.co.in" }],
  creator: "Seekho Business",
  publisher: "Seekho Business",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://seekhobussiness.co.in",
    siteName: "Seekho Business",
    title: "Seekho Business ΓÇö Learn Business, NCERT & Life Skills",
    description:
      "India's #1 video learning platform. Watch 70+ videos per book starting at Γé╣99.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Seekho Business Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seekho Business ΓÇö Video Learning Platform",
    description:
      "Learn business, NCERT & life skills through premium video courses. Starting at Γé╣99.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

// JSON-LD Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Seekho Business",
  url: "https://seekhobussiness.co.in",
  logo: "https://seekhobussiness.co.in/logo.png",
  sameAs: [
    "https://twitter.com/seekhobusiness",
    "https://instagram.com/seekhobusiness",
    "https://youtube.com/@seekhobusiness",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-123-456-7890",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

// JSON-LD Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Seekho Business",
  url: "https://seekhobussiness.co.in",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://seekhobussiness.co.in/courses?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://seekhobussiness.co.in" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#131313" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
