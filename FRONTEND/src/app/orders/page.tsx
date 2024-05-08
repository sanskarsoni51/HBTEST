"use client";
import React, { useEffect, useState } from "react";
import { useGetOrderQuery } from "@/redux/api/userApi";
import Orders from "./Orders";
import { CartSchema } from "@/schema/schema";

const Cart = () => {
  const [order, setOrder] = useState<
    Array<{
      orderId: string;
      cartId: CartSchema;
      paymentId: string;
      status: string;
    }>
  >([]);
  const Ords = useGetOrderQuery(null);
  useEffect(() => {
    if (Ords.data) {
      const tempOrder: Array<{
        orderId: string;
        cartId: CartSchema;
        paymentId: string;
        status: string;
      }> = [];
      Ords.data.data.map((o: any) => {
        tempOrder.push({
          orderId: o.orderId,
          cartId: o.cartId,
          paymentId: o.paymentId,
          status: o.status,
        });
      });
      setOrder(tempOrder);
    }
  }, [Ords.data]);

  return (
    <div className="flex flex-col">
      <span className="text-center w-full text-3xl font-bold">Orders</span>
      <div className="flex lg:flex-row flex-col py-5 px-3 gap-5 items-center justify-center"></div>
      <Orders order={order} />
    </div>
  );
};
export default Cart;
