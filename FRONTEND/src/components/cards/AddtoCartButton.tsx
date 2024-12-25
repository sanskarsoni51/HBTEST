"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ProductSchema, Variant } from "@/schema/schema";
import { useAppSelector } from "@/redux/store";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface Props {
  productToAdd: ProductSchema;
  variant?: Variant;
}

const AddToCartButton = ({ productToAdd, variant }: Props) => {
  const router = useRouter();
  const [AddToCart, { isSuccess }] = useAddToCartMutation();
  const inCart = useAppSelector((state) => state.cart);
  const isUser = useAppSelector((state) => state.auth.authState); // Assuming `auth` slice has `isLoggedIn` field

  // Check if the product is out of stock
  const isOutOfStock = productToAdd.qtyavailable <= 0;
  const cartKey = `${productToAdd.pid}${variant?.color || ""}`;

  // Auto-select the first variant
  const defaultVariant = productToAdd.variants?.[0] || {
    color: "default",
    size: "default",
  };

  // If the user is not logged in, show the "Login" button
  if (!isUser) {
    return (
      <Button
        onClick={() => router.push("/login")}
        className="w-[120px] text-brown bg-pale h-[30px]"
      >
        Add to Cart
      </Button>
    );
  }

  // If the product is out of stock, show the "Out of Stock" button
  if (isOutOfStock) {
    return (
      <Button
        onClick={() => {
          toast({
            title: "Out of Stock",
            description: "This product is currently unavailable.",
            variant: "destructive",
          });
        }}
        disabled
        className="w-[120px] text-pale bg-lbrown h-[30px]"
      >
        Out of Stock
      </Button>
    );
  }

  // If the product is already in the cart, show the "Go To Cart" button
  if (inCart.products[cartKey]) {
    return (
      <Button
        onClick={() => {
          router.push("/cart");
        }}
        className="w-[120px] text-pale bg-lbrown h-[30px]"
      >
        Go To Cart
      </Button>
    );
  }

  // Default case: Show the "Add to Cart" button
  return (
    <Button
      onClick={async () => {
        await AddToCart({ pid: productToAdd.pid, variant: defaultVariant });
        if (isSuccess) {
          toast({
            title: "Add to Cart",
            description: "This product is available.",
            variant: "destructive",
          });
        }
      }}
      className="w-[120px] text-brown bg-pale h-[30px]"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
