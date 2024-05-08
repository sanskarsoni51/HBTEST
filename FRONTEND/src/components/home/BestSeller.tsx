import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Card1 from "../cards/Card1";
import { useGetBestSellerQuery } from "@/redux/api/prductsApi";
import { ProductSchema } from "@/schema/schema";

const Bestseller = () => {
  const temproducts = useGetBestSellerQuery(null);
  if (temproducts.isError) return <>Network Error</>;
  if (temproducts.isLoading) return <>Loading</>;
  if (temproducts.isSuccess) {
    if (temproducts.data) {
      const product: ProductSchema[] = [];
      temproducts.data.data.forEach((p: any) => {
        const newProduct: ProductSchema = {
          productName: p.productName,
          category: p.category,
          images: p.images,
          description: p.description,
          qtyavailable: p.qtyavailable,
          colors: p.colors,
          pid: p.pid,
          price: p.price,
        };
        product.push(newProduct);
      });
      return (
        <div>
          <div className="flex flex-row items-center mt-10 md:w-[90%] md:mx-20 overflow-hidden">
            <span className="text-black pl-5 text-xl font-semibold w-32">
              Best Seller
            </span>
            <div className="bg-black mx-5 h-[2px] w-full"></div>
          </div>
          <Carousel
            className="w-full flex items-center justify-center"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="max-w-[1200px]">
              {product?.map((p, i) => {
                return (
                  <CarouselItem
                    key={i}
                    className="xl:basis-1/4 md:basis-1/3 basis-1/2 w-full flex items-center justify-center"
                  >
                    <Card1 product={p} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-between px-4 absolute w-[90%] top-1/2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      );
    }
  }
};

export default Bestseller;
