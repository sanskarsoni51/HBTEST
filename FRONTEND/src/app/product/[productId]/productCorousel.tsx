import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import Image from "next/image";

  interface  Props{
      images:string[];
  };

const ProductCorousel = ({images}:Props) => {
    if (images.length == 0) {
        return <div>No images available</div>;
      }
    return (
    <Carousel className="w-full max-w-md">
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i}>
                <div className="p-1 w-full h-[560px] flex justify-center items-center">
                  <Image
                    src="/cat2.jpg"
                    alt={`Product image ${i + 1}`}
                    width={1000}
                    height={720}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end -mt-10 mr-4 md:-mt-5 md:mr-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
  )
}

export default ProductCorousel