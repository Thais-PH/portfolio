import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thaïs | Développeuse Full Stack",
  description: "Portfolio de Thaïs, développeuse Full Stack en Master 2 à MyDigitalSchool Nantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
