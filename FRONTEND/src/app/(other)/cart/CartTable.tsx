import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { CartSchema } from "@/schema/schema";
import {
  useManipulateQuantityMutation,
  useRemoveFromCartMutation,
} from "@/redux/api/cartApi";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface CartProps {
  cart: CartSchema;
  updateCart: (cart: CartSchema) => void;
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options); // Format the date
};

const CartTable = ({ cart, updateCart }: CartProps) => {
  // Calculate the delivery dates
  const deliveryDate7Days = new Date();
  deliveryDate7Days.setDate(deliveryDate7Days.getDate() + 7); // 7 days later

  const deliveryDate10Days = new Date();
  deliveryDate10Days.setDate(deliveryDate10Days.getDate() + 10); // 10 days later
  const [changeqty] = useManipulateQuantityMutation();
  const [removeqty] = useRemoveFromCartMutation();

  return (
    <section className="w-full relative overflow-y-auto h-full max-h-screen">
      <div className="px-2 py-2">
        <div className="flex flex-col items-center">
          <div className="bg-card rounded-lg shadow-lg w-full">
            <div className="border-b-2 border-lbrown p-6">
              <h5 className="">
                CART - {Object.keys(cart.products).length} items
              </h5>
            </div>
            <div className="p-4">
              {Object.entries(cart.products).map(([productId, productData]) => (
                <div
                  className="flex flex-row mb-4 border-b pb-4"
                  key={productId}
                >
                  <div className="w-1/4">
                    {/* Image */}
                    <div className="relative w-full h-32">
                      <Image
                        src={productData.product.images[0]} // Assuming you have an image URL
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,"
                        alt={productData.product.productName}
                        className="object-cover rounded"
                      />
                    </div>
                  </div>

                  <div className="flex-grow mx-4">
                    {/* Product Info */}
                    <p className="text-lg font-semibold">
                      {`${productData.product.productName} (${productData.variant.color})`}
                    </p>
                    <Button
                      type="button"
                      className="bg-brown rounded hover:bg-red-600 transition duration-200 mt-8"
                      onClick={() =>
                        removeqty({
                          pid: productData.product.pid,
                          variant: productData.variant,
                        })
                      }
                    >
                      REMOVE
                    </Button>
                  </div>

                  <div className="flex flex-col justify-center items-center w-1/4">
                    {/* Quantity */}
                    <div className="flex items-center mb-2">
                      <button
                        className="bg-brown text-white px-3 py-0.5 rounded-l"
                        onClick={() => {
                          if (productData.quantity > 1) {
                            changeqty({
                              itemId: productData.product.pid,
                              quantity: productData.quantity - 1,
                              variant: productData.variant,
                            });
                          } else {
                            removeqty({
                              pid: productData.product.pid,
                              variant: productData.variant,
                            });
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        min="0"
                        name="quantity"
                        value={productData.quantity}
                        type="number"
                        className="border-t border-b border-gray-300 text-center w-12 h-7"
                        readOnly
                      />
                      <button
                        className="bg-brown text-white px-3 py-0.5 rounded-r"
                        onClick={() => {
                          changeqty({
                            itemId: productData.product.pid,
                            quantity: productData.quantity + 1,
                            variant: productData.variant,
                          });
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-lg font-semibold">
                      ₹
                      {(
                        productData.quantity * productData.product.price
                      ).toFixed(0)}{" "}
                      /-
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartTable;
