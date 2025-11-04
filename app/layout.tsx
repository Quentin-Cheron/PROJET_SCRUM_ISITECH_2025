import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

import ConditionalFooter from "@/components/features/layout/ConditionalFooter";
import ConditionalHeader from "@/components/features/layout/ConditionalHeader";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Synégo",
  description:
    "Synégo est un centre de bien-être et de développement personnel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased`}
      >
        <ConditionalHeader />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
