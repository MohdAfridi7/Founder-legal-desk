import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  keywords:
    "lawyer, legal documents, business contracts, startup legal, India",
  authors: [{ name: "Founders Legal Desk" }],
  metadataBase: new URL("https://founderslegaldesk.com"),
  icons: {
    icon: "/favicon.ico",
  },

  // 👇 Add this
  verification: {
    google: "fljvNMN6BWaJLL539alD7XC8XSeU5mDKWqPAEGcfUeE",
  },

  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Founders Legal Desk",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D1A",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}