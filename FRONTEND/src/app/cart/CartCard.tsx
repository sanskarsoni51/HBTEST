import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartSchema } from "@/schema/schema";
import Link from "next/link";

interface props {
  cart: CartSchema;
}

const CartCard = ({ cart }: props) => {
  return (
    <Card className="max-w-sm w-full h-full">
      <CardHeader className="border-b-2 border-lbrown">
        PRICE DETAILS
      </CardHeader>
      {cart && (
        <CardContent className="w-full mt-5 text-sm">
          <div className="w-full flex flex-row my-4">
            <span className="w-full text-left font-semibold">{`Price(${cart.totalQuantity})`}</span>
            <span className="w-full text-right">
              {cart.totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="w-full flex flex-row my-4">
            <span className="w-full text-left font-semibold">{`GST(${18} %)`}</span>
            <span className="w-full text-right">{cart.gst.toFixed(2)}</span>
          </div>
          <div className="w-full flex flex-row my-4">
            <span className="w-full text-left font-semibold">{`Delivery Charges`}</span>
            <span className="w-full text-right">{cart.deliveryCharges}</span>
          </div>

          <div className="w-full flex flex-row my-4 border-y-2 text-xl border-lbrown">
            <span className="w-full text-left font-bold">{`Total`}</span>
            <span className="w-full text-right">{cart.payablePrice}</span>
          </div>
        </CardContent>
      )}

      <CardFooter>
        <Link
          href={"/makeOrder"}
          className="w-full text-center my-2 rounded-sm bg-brown text-pale"
        >
          Proceed to PAY.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CartCard;
