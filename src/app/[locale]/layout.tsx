import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import SmoothScroll from "@/src/components/layout/SmoothScroll";
import Preloader from "@/src/components/ui/Preloader";
import CustomCursor from "@/src/components/ui/CustomCursor";
import SceneBackground from "@/src/components/3d/SceneBackground";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/sections/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scryved - Software Solutions",
  description: "Desarrollo de software a medida y soluciones tecnológicas.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>

          {/* 1. Ponemos el Preloader aquí arriba */}
          <Preloader />

          {/* 1.5. Fondo 3D Global */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <SceneBackground />
          </div>

          {/* 2. El resto de la app envuelta en SmoothScroll */}
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>

          {/* 3. Cursor interactivo */}
          <CustomCursor />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}