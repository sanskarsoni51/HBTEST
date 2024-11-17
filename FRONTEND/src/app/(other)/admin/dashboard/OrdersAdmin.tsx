import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import { useGetAllOrdersMutation } from "@/redux/api/adminApi";
import { CartSchema } from "@/schema/schema";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [getAllOders, { isSuccess, isError, isLoading, data }] =
    useGetAllOrdersMutation();
  const [order, setOrder] = useState<
    Array<{
      orderId: string;
      cartId: CartSchema;
      paymentId: string;
      status: string;
    }>
  >([]);
  useEffect(() => {
    getAllOders(null);
    if (isSuccess) {
      if (data) {
        const tempOrder: Array<{
          orderId: string;
          cartId: CartSchema;
          paymentId: string;
          status: string;
        }> = [];
        data.data.map((o: any) => {
          tempOrder.push({
            orderId: o.orderId,
            cartId: o.cartId,
            paymentId: o.paymentId,
            status: o.status,
          });
        });
        setOrder(tempOrder);
      }
    }
  }, [data]);
  return (
    <div className="flex flex-col">
      <span className="text-center w-full text-3xl font-bold">Orders</span>
      <div className="flex lg:flex-row flex-col py-5 px-3 gap-5 items-center justify-center"></div>
      <Orders order={orders} />
    </div>
  );
};

export default OrdersAdmin;
