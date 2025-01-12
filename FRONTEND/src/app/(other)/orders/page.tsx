"use client";
import React, { useEffect, useState } from "react";
import { useGetOrderQuery } from "@/redux/api/userApi";
import Orders from "./Orders";
import { Address, CartSchema } from "@/schema/schema";

const Cart = () => {
  const [order, setOrder] = useState<
    Array<{
      orderId: string;
      cart: CartSchema;
      paymentId: string;
      status: string;
      address: Address;
    }>
  >([]);
  const Ords = useGetOrderQuery(null);

  // Fetch orders and populate the state
  useEffect(() => {
    if (Ords.data) {
      const tempOrder: Array<{
        orderId: string;
        cart: CartSchema;
        paymentId: string;
        status: string;
        address: Address;
      }> = [];
      Ords.data.data.map((o: any) => {
        tempOrder.push({
          orderId: o.orderId,
          cart: o.cart,
          paymentId: o.paymentId,
          status: o.status,
          address: o.shippingAddress, // Ensure the address is correctly assigned
        });
      });
      setOrder(tempOrder);
    }
  }, [Ords.data]);

  if (Ords.isSuccess) {
    console.log("res", Ords.data);

    console.log("page", order);
  }

  return (
    <div className="flex flex-col">
      <span className="text-center w-full h-12 text-3xl font-bold">Orders</span>
      <div className="flex lg:flex-row flex-col items-center justify-center">
        {/* Orders list */}
        <Orders order={order} /> {/* Pass the order data to Orders component */}
      </div>
    </div>
  );
};

export default Cart;
