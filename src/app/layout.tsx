import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://optomachina.com"),
  title: {
    default: "Optomachina | Blaine Wilson",
    template: "%s | Optomachina",
  },
  description:
    "Optomechanical and precision mechanical design by Blaine Wilson in Tucson, Arizona.",
  openGraph: {
    title: "Optomachina | Blaine Wilson",
    description:
      "Hardware for Earth, Sky, Space, and Light. Optomechanical and precision mechanical design by Blaine Wilson.",
    url: "https://optomachina.com",
    siteName: "Optomachina",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
