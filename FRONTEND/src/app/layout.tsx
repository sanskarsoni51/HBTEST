import type { Metadata } from "next";
import { Noto_Serif, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/redux-povide";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/home/Navbar";
import Foter from "@/components/home/Foter";

const inter = Poppins({ subsets: ["latin"], weight: ["500"] });
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "bg-pale"}>
        <ReduxProvider>
          <Navbar />

          {children}

          <Foter />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
