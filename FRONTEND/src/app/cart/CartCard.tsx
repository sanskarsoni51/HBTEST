import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CartSchema } from "@/schema/schema";
import Link from "next/link";

interface props {
  cart: CartSchema;
}
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options); // Format the date
};

const CartCard = ({ cart }: props) => {
  // Calculate the delivery dates
  const deliveryDate7Days = new Date();
  deliveryDate7Days.setDate(deliveryDate7Days.getDate() + 7); // 7 days later

  const deliveryDate10Days = new Date();
  deliveryDate10Days.setDate(deliveryDate10Days.getDate() + 10); // 10 days later
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
            <span className="w-full text-left font-semibold">{`GST(${3}%)`}</span>
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

          <hr className="my-4" />
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="font-semibold">Expected shipping delivery</p>
            <p className="text-gray-600">{`${formatDate(
              deliveryDate7Days
            )} - ${formatDate(deliveryDate10Days)}`}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <p className="font-semibold">We accept</p>
            <div className="flex space-x-2">
              <img
                className="w-10"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <img
                className="w-10"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                className="w-10"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter>
        {/* Update the Link to redirect to address form instead of makeOrder */}
        <Link
          href={"makeOrder"}
          className="w-full text-center my-2 py-4 rounded-sm bg-brown text-pale"
        >
          Proceed to Address
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CartCard;
