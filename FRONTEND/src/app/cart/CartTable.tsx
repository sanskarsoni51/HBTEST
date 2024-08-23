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
    <div className="w-full relative overflow-y-auto h-full max-h-screen">
      {cart ? (
        <>
          <div className="mx-14">Your Cart</div>
          <hr className="mx-14 my-3" />
          <div className="flex  flex-col gap-3">
            {Object.entries(cart.products).map(([productId, productData]) => (
              <div className="h-[130px] mx-14 flex flex-row" key={productId}>
                <div className="w-[90%] bg-pale rounded-md overflow-hidden flex flex-row">
                  <Image
                    src={productData.product.images[0]}
                    width={100}
                    height={100}
                    alt="productImg"
                    className="rounded-full object-cover aspect-square mx-10 my-[15px]"
                  />
                  <div className="w-[20%] flex h-full justify-center flex-col mx-3">
                    <Link
                      href={`/product/+${productId}`}
                      className="text-lg font-semibold"
                    >
                      {productData.product.productName}
                    </Link>
                    <span className="line-clamp-2 text-sm">
                      {productData.product.description}
                    </span>
                  </div>
                  <div className="flex items-center mx-3">
                    <div className="border-2 w-[100px] h-[33px] border-brown flex flex-row justify-between">
                      <button
                        className="h-full aspect-square bg-lbrown flex justify-center items-center text-2xl text-white"
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
                      >
                        -
                      </button>
                      <span className="h-full text-center flex justify-center items-center">
                        {productData.quantity}
                      </span>
                      <button
                        className="h-full aspect-square bg-lbrown flex justify-center items-center text-2xl text-white"
                        onClick={() => {
                          changeqty({
                            itemId: productData.product.pid,
                            quantity: productData.quantity + 1,
                          });
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mx-5 flex justify-center items-center text-lg">
                    {"₹" + productData.quantity * productData.product.price} /-
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeqty(productData.product.pid);
                  }}
                  className="text-brown justify-center items-center "
                >
                  <Cross1Icon className="w-10 h-6"></Cross1Icon>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartTable;
