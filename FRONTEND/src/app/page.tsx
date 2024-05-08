"use client";
import Bestseller from "@/components/home/BestSeller";
import MainCourousel from "@/components/home/MainCourousel";
import Sevices from "@/components/home/Sevices";

export default function Home() {
  return (
    <main>
      <MainCourousel />
      <Bestseller />
      <Sevices />
      <Bestseller />
    </main>
  );
}
