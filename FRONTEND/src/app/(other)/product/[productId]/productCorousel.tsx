import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Props {
  images: (string | null)[]; // Updated type to include null
}

const ProductCorousel = ({ images }: Props) => {
  // Filter out null or empty values from the images array
  const validImages = images.filter((src) => src);

  if (validImages.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {validImages.map((src, i) => (
          <CarouselItem key={i}>
            <div className="p-1 w-full h-[560px] flex justify-center items-center">
              <Image
                src={src as string} // Type assertion since we filtered nulls
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
  );
};

export default ProductCorousel;
