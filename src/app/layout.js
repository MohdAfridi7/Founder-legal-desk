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

/* =========================
   METADATA
========================= */
export const metadata = {
  metadataBase: new URL("https://founderslegaldesk.com"),

  title: {
    default: "Founders Legal Desk — One Desk for All Business Legal Needs",
    template: "%s",
  },

  description:
    "Founders Legal Desk is an all-in-one platform for startups and MSMEs. From legal, compliance and contracts to registrations, IP and disputes, bring every business issue to one desk.",

  keywords: [
    "Founders Legal Desk",
    "business legal support",
    "legal support for startups",
    "legal support for MSMEs",
    "startup legal services",
    "MSME legal services",
    "business compliance support",
    "legal and compliance services",
    "contracts and agreements",
    "business legal platform",
    "legal desk for businesses",
    "legal support India",
    "startup compliance services",
  ],

  authors: [
    { name: "Founders Legal Desk", url: "https://founderslegaldesk.com" },
  ],
  creator: "Founders Legal Desk",
  publisher: "Founders Legal Desk",
  applicationName: "Founders Legal Desk",
  category: "Legal Services",

  alternates: {
    canonical: "https://founderslegaldesk.com",
  },

  /* =========================
     ICONS
  ========================= */
  icons: {
    icon: [
    { url: "/favicon-32 x 32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/logo-512.png",
  },

  /* =========================
     VERIFICATION
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
    type: "website",
    locale: "en_IN",
    url: "https://founderslegaldesk.com",
    siteName: "Founders Legal Desk",
    title: "Founders Legal Desk — One Desk for All Business Legal Needs",
    description:
      "Startups and MSMEs don't need to figure out which professional to call. Bring your legal, compliance, contracts, IP, registrations and business issues to one desk.",
    images: [
      {
        url: "/logo-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Founders Legal Desk — One Desk for All Business Legal Needs",
      },
    ],
  },

  /* =========================
     TWITTER
  ========================= */
  twitter: {
    card: "summary_large_image",
    site: "@found_legaldesk",
    creator: "@found_legaldesk",
    title: "Founders Legal Desk — One Desk for All Business Legal Needs",
    description:
      "From contracts and compliance to registrations, IP and disputes, Founders Legal Desk helps startups and MSMEs handle changing business legal needs through one platform.",
    images: ["/logo-1200x630.png"],
  },

  /* =========================
     FORMAT DETECTION
  ========================= */
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* =========================
   VIEWPORT
========================= */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080D1A",
  colorScheme: "light",
};

/* =========================
   ROOT LAYOUT
========================= */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        {children}

        {/* Sonner Toaster */}
        <Toaster position="top-right" richColors closeButton />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D8MEP4R2XV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-D8MEP4R2XV');
          `}
        </Script>
      </body>
    </html>
  );
}