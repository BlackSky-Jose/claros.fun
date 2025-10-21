import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  // title: "Claros",
  description: "A tool for digital clarity.\n\nBuilt to filter noise, uncover context, and restore focus to your browsing experience.",
  icons: {
    icon: "/claros/C.png",
  },
  openGraph: {
    title: "Claros",
    description: "Coming soon.",
    images: [
      {
        url: "/banner.png",
        width: 618,
        height: 248,
        alt: "Claros - A tool for digital clarity",
      },
    ],
    siteName: "Claros",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claros",
    description: "Coming soon.",
    images: ["/banner.png"],
    creator: "@Clarosdotfun",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
