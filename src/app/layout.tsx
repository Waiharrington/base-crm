import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BottomBar } from "@/components/layout/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Base CRM | Premium Template",
  description: "The ultimate CRM template for speed and modularity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <div className="flex">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-8 pb-24 md:pb-0">
              {children}
            </main>
          </div>
        </div>
        <BottomBar />
      </body>
    </html>
  );
}
