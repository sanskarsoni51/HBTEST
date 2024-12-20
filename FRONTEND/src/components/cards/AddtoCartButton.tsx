"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/redux/slice/cartSlice";
import { ProductSchema } from "@/schema/schema";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { toast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  productToAdd: ProductSchema;
}
const AddtoCartButton = ({ productToAdd }: Props) => {
  const [AddToCart, { isSuccess, isError, error }] = useAddToCartMutation();
  const inCart = useAppSelector((state) => state.cart);
  const router = useRouter();
  if (isSuccess) {
    toast({
      title: "Successfully Added to Cart",
      duration: 2000,
    });
  }
  useEffect(() => {
    console.log(`${productToAdd.pid}: ${productToAdd.variants}`);
  });

  if (inCart.products && inCart.products[productToAdd.pid]) {
    return (
      <Button
        className="w-[120px] text-pale bg-lbrown h-[30px]"
        onClick={() => {
          router.push("/cart");
        }}
      >
        Go To Cart
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => {
          AddToCart({
            pid: productToAdd.pid,
            variant: {
              color: productToAdd.variants
                ? productToAdd.variants[0].color
                : "no color",
            },
          });
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
