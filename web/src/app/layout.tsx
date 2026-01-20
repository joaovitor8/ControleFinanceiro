import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { AuthSync } from "../components/authenticate";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Domine suas finanças com IA",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body> {/** className={`${geistSans.variable} ${geistMono.variable} antialiased`} */}
          <AuthSync />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
