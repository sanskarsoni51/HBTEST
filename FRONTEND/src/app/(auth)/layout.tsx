import type { Metadata } from "next";
import { Noto_Serif, Poppins } from "next/font/google";

import ReduxProvider from "@/redux/redux-povide";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/home/Navbar";
import Foter from "@/components/home/Foter";

const inter = Poppins({ subsets: ["latin"], weight: ["500"] });
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Login in to Your Account",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
