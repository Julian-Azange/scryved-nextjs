import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import SmoothScroll from "@/src/components/layout/SmoothScroll";

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
  params, // 1. Recibimos params sin desestructurar
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 2. Tipamos params como una Promesa
}) {
  // 3. Resolvemos la promesa antes de usarla
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} font-sans antialiased bg-black text-white`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}