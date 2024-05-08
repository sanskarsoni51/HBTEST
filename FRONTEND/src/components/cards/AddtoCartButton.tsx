"use client";
import React from "react";
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
  if (inCart.products[productToAdd.pid]) {
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
          AddToCart(productToAdd.pid);
        }}
        className="w-[120px] text-brown bg-pale h-[30px]"
      >
        Add to Cart
      </Button>
    );
  }
};

export default AddtoCartButton;
