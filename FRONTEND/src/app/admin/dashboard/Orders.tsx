import { CartSchema } from "@/schema/schema";
import Link from "next/link";
import React from "react";

const Orders = ({
  order,
}: {
  order: Array<{
    orderId: string;
    cartId: CartSchema;
    paymentId: string;
    status: string;
  }>;
}) => {
  return (
    <div className="w-full relative max-h-screen overflow-y-auto">
      <div className="md:grid text-center grid-cols-4 gap-2 hidden">
        <div className="text-lg font-semibold">OrderId</div>
        <div className="text-lg font-semibold">PaymentId</div>
        <div className="text-lg font-semibold">Status</div>
        <div className="text-lg font-semibold">Price</div>
      </div>
      <hr className="col-span-4" />
      {order.map((o) => {
        return (
          <div
            key={o.orderId}
            className="md:grid text-center grid-cols-4 gap-2 hidden"
          >
            <Link href={"/"} className="text-sm">
              {o.orderId}
            </Link>
            <div className="text-sm">{o.paymentId}</div>
            <div className="text-sm">{o.status}</div>
            <div className="text-sm">{o.cartId.payablePrice}</div>
            <hr className="col-span-4" />
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
