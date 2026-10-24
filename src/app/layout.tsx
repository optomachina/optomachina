import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blaine Wilson — Opto-Mechanical Engineer | OptoMachina",
  description:
    "Senior Mechanical Design Engineer specializing in opto-mechanical systems, aerospace telescopes, and precision engineering. 15+ years designing for NASA, TMT, LSST, DKIST, and more.",
  keywords: [
    "opto-mechanical engineer",
    "mechanical design",
    "SolidWorks",
    "aerospace",
    "telescope design",
    "GD&T",
    "optical drafting",
    "ISO 10110",
    "precision engineering",
  ],
  openGraph: {
    title: "Blaine Wilson — Opto-Mechanical Engineer",
    description:
      "Senior Mechanical Design Engineer specializing in opto-mechanical systems, aerospace telescopes, and precision engineering.",
    type: "website",
    url: "https://optomachina.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blaine Wilson — Opto-Mechanical Engineer",
    description:
      "Senior Mechanical Design Engineer specializing in opto-mechanical systems, aerospace telescopes, and precision engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
