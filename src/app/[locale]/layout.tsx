import type { Metadata } from "next";
// 1. Importamos Poppins
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// 2. Configuramos la fuente
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins", // Nombre de la variable CSS
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scryved - Software Solutions",
  description: "Desarrollo de software a medida y soluciones tecnológicas.",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      {/* 3. Agregamos la variable al body */}
      <body className={`${poppins.variable} font-sans antialiased bg-black text-white`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}