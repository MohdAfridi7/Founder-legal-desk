import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Founders Legal Desk",
    default: "Founders Legal Desk — Business Legal Documents",
  },

  description:
    "Fixed-price, specialist-reviewed legal documents for growing Indian businesses.",

  keywords: [
    "lawyer",
    "legal documents",
    "business contracts",
    "startup legal",
    "India",
    "legal services",
    "business legal documents",
    "startup contracts",
  ],

  authors: [
    {
      name: "Founders Legal Desk",
    },
  ],

  creator: "Founders Legal Desk",
  publisher: "Founders Legal Desk",

  metadataBase: new URL("https://founderslegaldesk.com"),

  /* =========================
     FAVICON / LOGO
  ========================= */
  icons: {
    icon: "/favicon-32 x 32.png",
    shortcut: "/favicon.png",
    apple: "/logo-512.png",
  },

  /* =========================
     GOOGLE SEARCH CONSOLE
  ========================= */
 verification: {
  google: "ld0RLUmG56ULo9jfgIiHUqsEa64m9nx--KO2VhScBzM",
},

  /* =========================
     ROBOTS
  ========================= */
  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* =========================
     OPEN GRAPH
  ========================= */
  openGraph: {
    title: "Founders Legal Desk — Business Legal Documents",

    description:
      "Fixed-price, specialist-reviewed legal documents for growing Indian businesses.",

    url: "https://founderslegaldesk.com",

    siteName: "Founders Legal Desk",

    type: "website",

    locale: "en_IN",

    images: [
      {
        url: "/logo-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Founders Legal Desk — Business Legal Documents",
      },
    ],
  },

  /* =========================
     TWITTER / X
  ========================= */
  twitter: {
    card: "summary_large_image",

    title: "Founders Legal Desk — Business Legal Documents",

    description:
      "Fixed-price, specialist-reviewed legal documents for growing Indian businesses.",

    images: ["/logo-1200x630.png"],
  },
};

/* =========================
   VIEWPORT
========================= */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D1A",
};

/* =========================
   ROOT LAYOUT
========================= */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {children}

        {/* =========================
            SONNER TOASTER
        ========================= */}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />

        {/* =========================
            GOOGLE ANALYTICS
        ========================= */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D8MEP4R2XV"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-D8MEP4R2XV');
          `}
        </Script>
      </body>
    </html>
  );
}