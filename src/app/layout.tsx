import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Biodiversidad - Plataforma Sustentable',
  url: 'https://www.biodiversidad.cl',
  logo: 'https://www.biodiversidad.cl/assets/LogotipoBlanco.png',
  description: 'Conectamos personas con la biodiversidad. Una plataforma sustentable, abierta y humana para el ecosistema verde.',
  sameAs: [
    'https://www.facebook.com/biodiversidad',
    'https://twitter.com/biodiversidad'
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.biodiversidad.cl"),
  title: "Biodiversidad - Plataforma Sustentable",
  description: "Conectamos personas con la biodiversidad. Una plataforma sustentable, abierta y humana para el ecosistema verde.",
  openGraph: {
    title: "Biodiversidad - Plataforma Sustentable",
    description: "Conectamos personas con la biodiversidad. Una plataforma sustentable, abierta y humana para el ecosistema verde.",
    url: "https://www.biodiversidad.cl",
    siteName: "Biodiversidad",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biodiversidad - Plataforma Sustentable",
    description: "Conectamos personas con la biodiversidad. Una plataforma sustentable, abierta y humana para el ecosistema verde.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
