"use client";
import React, { useEffect, useState } from "react";
import CartTable from "./CartTable";
import CartCard from "./CartCard";
import { CartSchema } from "@/schema/schema";
import { useAppSelector } from "@/redux/store";

const Cart = () => {
  const updateCart = (updatedCart: CartSchema) => {
    setCart(updatedCart);
  };
  const cartfromredux = useAppSelector((state) => state.cart);
  const [cart, setCart] = useState<CartSchema>(cartfromredux);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cartfromredux);
  }, [cart, cartfromredux]);

  return (
    <div className="flex justify-between max-w-[1200px] mx-auto ">
      <div className="flex flex-col w-full">
        <span className="text-center w-full text-3xl font-bold">CART</span>
        <div className="flex lg:flex-row flex-col py-5 px-3 gap-5 items-center justify-center">
          <CartTable cart={cart} updateCart={updateCart} />
          <CartCard cart={cart} />
        </div>
      </div>
    </div>
  );
};
export default Cart;
