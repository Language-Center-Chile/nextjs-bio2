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

export const metadata: Metadata = {
  title: "Bio2 - Plataforma Sustentable",
  description: "Conectamos personas con la biodiversidad. Una plataforma sustentable, abierta y humana para el ecosistema verde.",
  openGraph: {
    title: "Bio2 - Plataforma Sustentable",
    description: "Conectamos personas con la biodiversidad. Una plataforma sustentable, abierta y humana para el ecosistema verde.",
    url: "https://www.biodiversidad.cl",
    siteName: "Bio2",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio2 - Plataforma Sustentable",
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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
