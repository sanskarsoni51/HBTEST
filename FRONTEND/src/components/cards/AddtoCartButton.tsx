"use client";
import React from "react";
import { ProductSchema, Variant } from "@/schema/schema";
import { useAppSelector } from "@/redux/store";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
  productToAdd: ProductSchema;
  variant?: Variant; // Variant is optional but required for adding to cart
}

const AddToCartButton = ({ productToAdd, variant }: Props) => {
  const router = useRouter();
  const [AddToCart, { isSuccess }] = useAddToCartMutation();
  const inCart = useAppSelector((state) => state.cart);
  const isUser = useAppSelector((state) => state.auth.authState);

  // Default variant selection
  const defaultVariant = productToAdd.variants?.[0] || {
    color: "default",
    size: "default",
  };

  function sanitizeKey(key: string): string {
    return key.replace(/\./g, "_"); // Replace all dots with underscores
  }
  // Use provided variant or fallback to default
  const selectedVariant = variant || defaultVariant;
  const isOutOfStock = productToAdd.qtyavailable <= 0;
  const cartKey = sanitizeKey(`${productToAdd.pid}${variant?.color || ""}`);

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

  if (isOutOfStock) {
    return (
      <Button
        onClick={() =>
          toast({
            title: "Out of Stock",
            description: "This product is currently unavailable.",
            variant: "destructive",
          })
        }
        disabled
        className="w-[120px] text-pale bg-lbrown h-[30px]"
      >
        Out of Stock
      </Button>
    );
  }

  if (inCart.products[cartKey]) {
    return (
      <Button
        onClick={() => router.push("/cart")}
        className="w-[120px] text-pale bg-lbrown h-[30px]"
      >
        Go To Cart
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        await AddToCart({ pid: productToAdd.pid, variant: selectedVariant });

        if (isSuccess) {
          toast({
            title: "Successfully Added to Cart",
            description: "The product has been added to your cart.",
            variant: "default",
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
