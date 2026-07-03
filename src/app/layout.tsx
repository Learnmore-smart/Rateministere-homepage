import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rateministere.com"),
  title: "NOAH ZIXIN ZHANG — PORTFOLIO",
  description: "Software Developer, Creator of LearnX.",
  openGraph: {
    title: "NOAH ZIXIN ZHANG — PORTFOLIO",
    description: "Software Developer, Creator of LearnX.",
    images: [
      {
        url: "/OG-image-ratministere-homepage.png",
        width: 1200,
        height: 630,
        alt: "Noah Zixin Zhang Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOAH ZIXIN ZHANG — PORTFOLIO",
    description: "Software Developer, Creator of LearnX.",
    images: ["/OG-image-ratministere-homepage.png"],
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
      className={`${bricolage.variable} ${jetbrains.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JTGLVTKPV4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JTGLVTKPV4');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-text">{children}</body>
    </html>
  );
}
