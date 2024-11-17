"use client";
import React from "react";
import { ProductSchema, Variant } from "@/schema/schema";
import { useAppSelector } from "@/redux/store";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
  productToAdd: ProductSchema;
  variant: Variant;
}
const AddtoCartButton = ({ productToAdd, variant }: Props) => {
  const [AddToCart, { isSuccess, isError, error }] = useAddToCartMutation();
  const inCart = useAppSelector((state) => state.cart);
  if (inCart.products[productToAdd.pid]) {
    return (
      <Button
        onClick={() => {
          redirect("/cart");
        }}
      >
        Go To Cart
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => {
          AddToCart({ pid: productToAdd.pid, variant: variant });
          if (isSuccess) {
            toast({
              title: "Successfully Added to Cart",
            });
          }
        }}
        className="w-[120px] text-brown bg-pale h-[30px]"
      >
        Add to Cart
      </Button>
    );
  }
};

export default AddtoCartButton;
