"use client";
import React, { useEffect, useState } from "react";
import CartTable from "./CartTable";
import CartCard from "./CartCard";
import { CartSchema } from "@/schema/schema";
import { useAppSelector } from "@/redux/store";
import { useGetCartQuery } from "@/redux/api/userApi";

const Cart = () => {
  const updateCart = (updatedCart: CartSchema) => {
    setCart(updatedCart);
  };

  const { data, isSuccess, isLoading, isError } = useGetCartQuery(null);

  const cartfromredux = useAppSelector((state) => state.cart);
  const [cart, setCart] = useState<CartSchema>(cartfromredux);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cartfromredux);
    if (isSuccess) {
      console.log("Success");
    }
    console.log(cart);
  }, [cart, cartfromredux, data]);

  // Check if cart is empty based on total quantity
  const isCartEmpty = cart.totalQuantity === 0;

  return (
    <div className="flex justify-between max-w-[1200px] mx-auto">
      <div className="flex flex-col w-full">
        <span className="text-center w-full text-3xl  pt-2 font-bold">
          CART
        </span>
        {isCartEmpty ? (
          <div className="text-center text-xl py-10">Your cart is empty.</div>
        ) : (
          <div className="flex lg:flex-row flex-col py-5 gap-5 items-center justify-center">
            <CartTable cart={cart} updateCart={updateCart} />
            <CartCard cart={cart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
