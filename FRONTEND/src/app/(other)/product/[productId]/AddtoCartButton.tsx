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
  const isUser = useAppSelector((state) => state.auth.authState); // Assuming `auth` slice has `isLoggedIn` field

  function sanitizeKey(key: string): string {
    return key.replace(/\./g, "_"); // Replace all dots with underscores
  }

  const isOutOfStock = productToAdd.qtyavailable <= 0;
  const cartKey = sanitizeKey(`${productToAdd.pid}${variant?.color || ""}`);

  if (!isUser) {
    return <Button onClick={() => router.push("/login")}>Add to Cart</Button>;
  }

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
      >
        Out of Stock
      </Button>
    );
  }

  if (inCart.products[cartKey]) {
    return (
      <Button
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
        onClick={async () => {
          if (!variant) {
            toast({
              title: "Please select a variant",
              description:
                "You must choose a product variant before adding it to the cart.",
              variant: "destructive",
            });
            return;
          }

          // Call AddToCart with the expected payload
          await AddToCart({
            pid: productToAdd.pid,
            variant,
          });

          if (isSuccess) {
            toast({
              title: "Successfully Added to Cart",
            });
          }
        }}
      >
        Add to Cart
      </Button>
    );
  }
};

export default AddToCartButton;
