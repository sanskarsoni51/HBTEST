"use client";
import Bestseller from "@/components/home/BestSeller";
import Foter from "@/components/home/Foter";
import MainCourousel from "@/components/home/MainCourousel";
import Navbar from "@/components/home/Navbar";
import NewArrival from "@/components/home/NewArrival";
import Sevices from "@/components/home/Sevices";

export default function Home() {
  return (
    <main className="bg-pale">
      <Navbar />
      <MainCourousel />
      <Bestseller />
      <Sevices />
      <NewArrival />
      <Foter />
    </main>
  );
}
