import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Cross1Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { CartSchema } from "@/schema/schema";
import {
  useManipulateQuantityMutation,
  useRemoveFromCartMutation,
} from "@/redux/api/cartApi";
import { toast } from "@/components/ui/use-toast";

interface CartProps {
  cart: CartSchema;
  updateCart: (cart: CartSchema) => void;
}

const CartTable = ({ cart, updateCart }: CartProps) => {
  const [updatedCart, setUpdatedCart] = useState<CartSchema>(cart);

  const [changeqty, { isSuccess: qtychanged, isError: errorqty }] =
    useManipulateQuantityMutation();
  const [removeqty, { isSuccess: qtyrmvd, isError: errormvd }] =
    useRemoveFromCartMutation();

  return (
    <div className="w-full relative max-h-screen overflow-y-auto">
      <div className="md:grid text-center grid-cols-4 gap-2 hidden">
        <div className="text-lg col-span-2">Your Cart</div>
        <div className="text-lg">Quantity</div>
        <div className="text-lg ">Price</div>
      </div>
      {/* row1 */}

      {cart &&
        Object.entries(cart.products).map(([productId, productData]) => (
          <div
            key={productId}
            className="h-[170px] gap-2 my-2 md:my-2 lg:my-5 grid grid-cols-3"
          >
            <Image
              src={productData.product.images[0]}
              alt="pic"
              width={100}
              height={100}
              className="rounded-md m-2 mx-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-3  col-span-2">
              <div className="font-semibold pt-5 text-lg w-full h-[100px] pr-14 ">
                <Link
                  href={`/product/+${productId}`}
                  className="hover:underline line-clamp-2 h-[50px]"
                >
                  {productData.product.productName}
                </Link>

                <span className="text-sm font-medium md:hidden">
                  {"Choose " +
                    productData.quantity +
                    " for ₹" +
                    productData.quantity * productData.product.price}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex flex-row justify-center items-center gap-2 m-2">
                  <Button
                    onClick={() => {
                      if (productData.quantity == 1) {
                        removeqty(productData.product.pid);
                      } else if (productData.quantity > 1) {
                        changeqty({
                          itemId: productData.product.pid,
                          quantity: productData.quantity - 1,
                        });
                      } else {
                        toast({
                          title: "Error",
                          duration: 2000,
                          variant: "destructive",
                        });
                      }
                    }}
                    className="bg-pale hover:bg-pale text-brown md:text-xl"
                  >
                    -
                  </Button>
                  {productData.quantity}
                  <Button
                    onClick={() => {
                      changeqty({
                        itemId: productData.product.pid,
                        quantity: productData.quantity + 1,
                      });
                    }}
                    className="bg-pale hover:bg-pale text-brown md:text-xl"
                  >
                    +
                  </Button>
                </div>
                <div className="ml-5 md:hidden">
                  {"₹" + productData.quantity * productData.product.price}/-
                </div>
              </div>
              <div className="ml-5 hidden md:flex items-center justify-center">
                {"₹" + productData.quantity * productData.product.price}/-
              </div>
            </div>
            <button
              onClick={() => {
                removeqty(productData.product.pid);
              }}
              className="text-brown absolute right-4 mt-2 "
            >
              <Cross1Icon className="w-10 h-6"></Cross1Icon>
            </button>
            <hr className="col-span-3" />
          </div>
        ))}
    </div>
  );
};

export default CartTable;
