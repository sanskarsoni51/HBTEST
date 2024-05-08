"use client";
import AddAddressForm from "@/components/util/AddAddress";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { useCreateOrderMutation } from "@/redux/api/userApi";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const OrderPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const [createOrder, { isSuccess, isLoading, isError }] =
    useCreateOrderMutation();
  const order = useAppSelector((state) => state.order);

  if (isSuccess) {
    toast({
      title: "Order Placed.",
      variant: "default",
      duration: 2500,
    });
    redirect("/");
  }
  if (isError) {
    toast({
      title: "Order Not Placed.",
      variant: "destructive",
      duration: 2500,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-gray-800 mb-4">Order Summary</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Product Details */}
        <div className="mb-4">
          <h2 className="text-xl text-gray-800 mb-2">Product Details</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cart.products).map(([productId, productData]) => (
                <tr key={productId}>
                  <td className="border border-gray-200 px-4 py-2">
                    {productData.product.productName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {productData.quantity}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{`₹${
                    productData.quantity * productData.product.price
                  }`}</td>
                </tr>
              ))}
              {/* Add more products here */}
            </tbody>
          </table>
        </div>
        {/* Total Amount to Pay */}
        <div className="mb-4">
          <h2 className="text-xl text-gray-800 mb-2">Total Amount to Pay</h2>
          <div className="text-2xl text-gray-800">{`₹ ${cart.payablePrice}`}</div>
        </div>
        {/* Payment Options */}
        <div className="mb-4">
          <h2 className="text-xl text-gray-800 mb-2">Payment Options</h2>
          <div className="flex items-center">
            <input
              id="credit-card"
              type="radio"
              name="payment"
              value="credit-card"
              className="mr-2"
            />
            <label htmlFor="credit-card" className="text-gray-700">
              Credit Card
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="debit-card"
              type="radio"
              name="payment"
              value="debit-card"
              className="mr-2"
            />
            <label htmlFor="debit-card" className="text-gray-700">
              Debit Card
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="paypal"
              type="radio"
              name="payment"
              value="paypal"
              className="mr-2"
            />
            <label htmlFor="paypal" className="text-gray-700">
              PayPal
            </label>
          </div>
        </div>
        {/* Address for Shipment */}
        <div>{`Address - ${
          order.shippingAddress !== null
            ? `${order.shippingAddress.street},${order.shippingAddress.city},${order.shippingAddress.state},${order.shippingAddress.country},${order.shippingAddress.pinCode}`
            : "Not Provided"
        }`}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{`${
              order.shippingAddress !== null ? "Edit Address" : "Add Address"
            }`}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>Add Shipping address.</DialogDescription>
            </DialogHeader>
            <AddAddressForm />
          </DialogContent>
        </Dialog>

        {/* Order Button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
          onClick={(e) => {
            createOrder(order);
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
