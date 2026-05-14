import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { StoreProvider } from "@/components/StoreProvider";

export const metadata: Metadata = {
  title: "TerraGain",
  description: "L'IA qui dit quoi planter pour gagner plus",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30">
        <StoreProvider>
          <ServiceWorkerRegister />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
