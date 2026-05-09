import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import SmoothScroll from "@/src/components/layout/SmoothScroll";
import Preloader from "@/src/components/ui/Preloader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
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
      <body className={`${poppins.variable} font-sans antialiased bg-black text-white`}>
        <NextIntlClientProvider messages={messages}>

          {/* 1. Ponemos el Preloader aquí arriba */}
          <Preloader />

          {/* 2. El resto de la app envuelta en SmoothScroll */}
          <SmoothScroll>
            {children}
          </SmoothScroll>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}