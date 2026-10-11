import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "BAIL सेतु – Know Your Bail Rights | Indian Bail Law Platform",
  description:
    "India's comprehensive bail law platform. Search IPC/BNS sections, understand bail eligibility, find advocates, and access legal aid — in Hindi and English.",
  keywords: [
    "bail law India",
    "IPC sections",
    "BNS sections",
    "bail eligibility",
    "legal aid India",
    "bail rights",
    "anticipatory bail",
    "regular bail",
  ],
  openGraph: {
    title: "BAIL सेतु – Know Your Bail Rights",
    description:
      "Search IPC/BNS sections, understand bail eligibility, and find legal advocates.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a2238" />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
