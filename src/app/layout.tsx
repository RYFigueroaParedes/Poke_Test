import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Providers} from "./Providers"; // Importa tu componente de Redux

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Rotceh Y. Figueroa Paredes",
  description: "Test Pokémon con Redux",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      {/* Aplicamos tu fondo bg-amber-200 aquí */}
      <body className={`${geistSans.variable} min-h-screen w-full bg-amber-200 antialiased`}>
        <p className="mx-2 text-2xl text-black font-bold pt-1">Rotceh Yackary Figueroa Paredes</p>

        {/* Envolvemos con Providers para que Redux funcione en toda la app */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
