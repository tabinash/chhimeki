import type { Metadata } from "next";
import { gilroy, notoDevanagari } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chhimeki - Nepali Neighborhood Network",
  description: "Connect with your neighbors and local community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} ${notoDevanagari.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
