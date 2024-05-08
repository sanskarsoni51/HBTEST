import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import ProductCorousel from "./productCorousel";
import { ProductSchema } from "@/schema/schema";
import AddtoCartButton from "./AddtoCartButton";
import { toast } from "@/components/ui/use-toast";

const Product = ({ product }: { product: ProductSchema }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full flex justify-center items-center my-5 lg:my-10">
        <ProductCorousel images={product.images} />
      </div>
      <div className="ml-3 flex flex-col mt-5 md:mt-10 gap-2 mb-6 px-5">
        <h1 className="text-3xl font-bold mb-5">{product.productName}</h1>
        <div className="flex flex-row items-center">
          <span className="font-medium mr-2">Rating:</span>
          <StarFilledIcon className="w-5 h-5  text-yellow-400" />
          <StarFilledIcon className="w-5 h-5  text-yellow-400" />
          <StarFilledIcon className="w-5 h-5  text-yellow-400" />
          <StarFilledIcon className="w-5 h-5  text-yellow-400" />
          <StarFilledIcon className="w-5 h-5  text-yellow-400" />
        </div>
        <span className="font-semibold">price:</span>
        <span className="text-2xl">&#8377; 999 /-</span>
        <span className="font-semibold line-clamp-1">Description:</span>
        <p className="">{product.description}</p>
        <div className="w-full lg:flex flex-col gap-2 hidden">
          <Button
            onClick={() => {
              toast({
                title: "Feature will be available soon.",
                variant: "destructive",
                duration: 2000,
              });
            }}
          >
            Add to Favorite
          </Button>
          <AddtoCartButton productToAdd={product} />
        </div>
      </div>
      <div className="sticky lg:hidden bottom-0 flex flex-col gap-2 bg-white m-5 pb-2">
        <Button
          onClick={() => {
            toast({
              title: "Feature will be available soon.",
              variant: "destructive",
              duration: 2000,
            });
          }}
        >
          Add to Favorite
        </Button>
        <AddtoCartButton productToAdd={product} />
      </div>
    </div>
  );
};

export default Product;
