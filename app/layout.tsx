import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ProductModalProvider } from "@/providers/product-modal-provider";
import localFont from "next/font/local";
import { CartProvider } from "@/providers/cart-provider";
import { AppProvider } from "@/providers/AppProvider";
import { Suspense } from "react";
// 2. Configure the font
const beatrice = localFont({
  src: [
    {
      path: "../public/fonts/BeatriceDeckTrialLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BeatriceDeckTrialMedium.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BeatriceDeckTrialExtrabold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-beatrice", // 3. Define a CSS variable name
  display: "swap",
});

export const metadata: Metadata = {
  title: "Z-store",
  description:
    "Blending creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quelity exqulsite finish",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beatrice.variable} antialiased font-beatrice `}>
        <Suspense fallback={null}>
          <AppProvider>
            <Navbar />
            {children}
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
