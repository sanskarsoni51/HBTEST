"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MainCourousel = () => {
  const redirect = useRouter();
  return (
    <Carousel
      className="w-full"
      draggable
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="h-[270px] sm:h-[400px] md:h-[550px] lg:h-[600px] bg-lbrown flex flex-row">
            <div className="w-1/2 h-full flex items-center justify-center p-5 flex-col">
              <span className=" text-pale md:text-xl lg:text-2xl xl:text:3xl max-w-[500px]">
                Tradition in every sparkle, stories in every detail. Adorn
                yourself with the legacy of timeless beauty.
              </span>
              <Link
                className=" md:text-2xl lg:text-3xl xl:text:4xl p-3 rounded-md text-gold mt-6 bg-brown"
                href={"/shop"}
              >
                Shop Now
              </Link>
            </div>
            <div
              style={{ backgroundImage: `url("/bs.jpg")` }}
              className=" h-[270px] sm:h-[400px] md:h-[550px] lg:h-[600px] w-1/2 bg-black bg-cover bg-center"
            ></div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-[270px] sm:h-[400px] md:h-[550px] lg:h-[600px] bg-lbrown flex flex-row">
            <div className="w-1/2 h-full flex items-center justify-center p-5 flex-col">
              <span className=" text-pale md:text-xl lg:text-2xl xl:text:3xl max-w-[500px]">
                Tradition in every sparkle, stories in every detail. Adorn
                yourself with the legacy of timeless beauty.
              </span>
              <Link
                href={"/shop"}
                className=" md:text-2xl lg:text-3xl xl:text:4xl p-3 rounded-md text-gold mt-6 bg-brown "
              >
                Shop Now
              </Link>
            </div>
            <div
              style={{ backgroundImage: `url("/bs.jpg")` }}
              className=" h-[270px] sm:h-[400px] md:h-[550px] lg:h-[600px] w-1/2 bg-black bg-cover bg-center"
            ></div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="bg-slate-50/25 left-16 hidden md:flex" />
      <CarouselNext className="bg-slate-50/25 right-16 hidden md:flex" />
    </Carousel>
  );
};

export default MainCourousel;
