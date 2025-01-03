"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  useAcceptPaymentMutation,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "@/redux/api/userApi";
import { toast } from "@/components/ui/use-toast";
import { useRouter, redirect } from "next/navigation";
import AddAddressForm, { AddAddressInput } from "@/components/util/AddAddress";
import { addAddress } from "@/redux/slice/orderSlice";
import { Address } from "@/schema/schema";
import Script from "next/script";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const OrderPage = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const [createOrder] = useCreateOrderMutation();
  const order = useAppSelector((state) => state.order);
  const [isProcessing, setIsProcesssing] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [addresses, setAddresses] = useState<Address[]>(user.address || []);
  const [isAddressFormVisible, setAddressFormVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [acceptPayment] = useAcceptPaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [isEditable, setIsEditable] = useState(false);
  const [voucherCode, setVoucherCode] = useState("HAPPYNEWCLIENT20");
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  const handleSave = () => {
    setShowGiftMessage(true);
    setTimeout(() => setShowGiftMessage(false), 5000); // Hide message after 5 seconds
  };

  useEffect(() => {
    setAddresses(user.address);
  }, [user.address]);

  const handleAddressSubmit = (data: AddAddressInput) => {
    const newAddress: Address = {
      ...data,
      pinCode: parseInt(data.pinCode, 10),
    };

    dispatch(addAddress(newAddress));
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);

    toast({
      title: "Address added successfully and selected for shipping.",
      variant: "default",
      duration: 2500,
    });
    setAddressFormVisible(false);
  };

  const handleRazorpayPayment = async (id: any) => {
    setIsProcesssing(true);
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: (Math.round(cart.payablePrice * 100) / 100) * 100,
      currency: "INR",
      name: "The Haat Bazaar",
      description: "Order Payment",
      image: "/logo.png",
      order_id: id,
      handler: async function (response: any) {
        console.log(response);

        try {
          const verificationResponse = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }).unwrap();

          if (verificationResponse.success) {
            toast({
              title: "Payment Verified and Successful!",
              variant: "default",
              duration: 2500,
            });

            // Create order after payment verification
            const orderDetails = {
              shippingAddress: selectedAddress
                ? {
                    pinCode: selectedAddress.pinCode.toString(),
                    street: selectedAddress.street || "",
                    city: selectedAddress.city || "",
                    state: selectedAddress.state || "",
                    country: selectedAddress.country || "",
                  }
                : null,
              paymentMethod,
              paymentId: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
              status: "pending" as
                | "pending"
                | "processing"
                | "shipped"
                | "delivered"
                | "cancelled", // Explicitly set the type to one of the allowed values
            };

            try {
              const response = await createOrder(orderDetails);

              if ("data" in response) {
                const orderResponse = response.data;

                if (orderResponse.message === "success") {
                  toast({
                    title: "Order Created Successfully!",
                    description: `Order ID: ${orderResponse.orderId}`,
                    variant: "default",
                    duration: 2500,
                  });

                  router.push("/"); // Navigate to the homepage
                } else {
                  throw new Error("Unexpected response message");
                }
              } else {
                throw new Error("Order creation failed");
              }
            } catch (orderError) {
              console.error("Order creation error:", orderError);
              toast({
                title: "Order Creation Failed.",
                description: `Error: ${
                  (orderError as Error).message ||
                  "An error occurred while creating the order."
                }`,
                variant: "destructive",
                duration: 2500,
              });
            }
          } else {
            throw new Error("Payment verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast({
            title: "Payment Verification Failed.",
            description: "An error occurred during verification.",
            variant: "destructive",
            duration: 2500,
          });
        } finally {
          setIsProcesssing(false);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast({
        title: "Please select a payment method.",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }

    if (!selectedAddress) {
      toast({
        title: "Please select a shipping address.",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }

    const orderData = {
      ...order,
      shippingAddress: {
        ...selectedAddress,
        pinCode: selectedAddress.pinCode.toString(),
      },
      paymentMethod,
    };

    try {
      const response = await acceptPayment(orderData).unwrap();
      if (paymentMethod === "Razorpay") {
        handleRazorpayPayment(response.data.id); // Call Razorpay for online payment
      } else {
        toast({
          title: "Order Placed Successfully",
          variant: "default",
          duration: 2500,
        });
        redirect("/");
      }
    } catch (error) {
      toast({
        title: "Order Not Placed.",
        variant: "destructive",
        duration: 2500,
      });
    } finally {
      setIsProcesssing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-6 px-6 py-8 bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Account Section */}
      <div className="flex-grow">
        <div className="bg-white p-6 mb-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Account</h2>
          <p className="text-lg mb-2 text-gray-700">
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-white p-6 mb-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Shipping Address
          </h2>
          {addresses.map((a, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="radio"
                id={`address-${index}`}
                name="shippingAddress"
                checked={selectedAddress === a}
                onChange={() => setSelectedAddress(a)}
                className="mr-3 accent-gray-800"
              />
              <label htmlFor={`address-${index}`} className="text-gray-700">
                {a.street}, {a.city}, {a.state}, {a.country}, {a.pinCode}
              </label>
            </div>
          ))}
          <Button
            variant="outline"
            className="border border-gray-300 py-2 px-4 rounded-lg text-gray-800 hover:bg-gray-100"
            onClick={() => setAddressFormVisible(!isAddressFormVisible)}
          >
            Add Address
          </Button>
          {isAddressFormVisible && (
            <div className="mt-4">
              <AddAddressForm onSubmit={handleAddressSubmit} />
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Payment Information
          </h2>
          <div className="mb-3">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="COD"
              disabled // Make COD unclickable
              className="mr-3 accent-gray-800 cursor"
            />
            <label htmlFor="cod" className="text-gray-700">
              Cash on Delivery
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="Razorpay"
              checked={paymentMethod === "Razorpay"}
              onChange={() => setPaymentMethod("Razorpay")}
              className="mr-3 accent-gray-800"
            />
            <label htmlFor="razorpay" className="text-gray-700">
              Razorpay
            </label>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="md:w-1/3 bg-white p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase tracking-wide">
          Order Summary
        </h2>
        <div className="mb-4 bg-gray-50 p-4 rounded-xl shadow-inner">
          <p className="text-lg flex justify-between text-gray-700">
            <span>Product Total:</span>{" "}
            <span>₹{cart.totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-lg flex justify-between text-gray-700">
            <span>GST:</span> <span>₹{cart.gst.toFixed(2)}</span>
          </p>
          <p className="text-lg flex justify-between text-gray-700">
            <span>Shipping Charges:</span> <span>₹{cart.deliveryCharges}</span>
          </p>
          <p className="text-lg font-bold flex justify-between border-t border-gray-300 pt-2 text-gray-900">
            <span>Total (incl. VAT):</span>{" "}
            <span>₹{cart.payablePrice.toFixed(2)}</span>
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-800">
            Voucher Code
          </h3>
          <div className="flex items-center">
            {isEditable ? (
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg py-2 px-4 text-gray-800"
              />
            ) : (
              <p
                className="flex-grow bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-800 cursor-pointer"
                onClick={() => setIsEditable(true)}
              >
                {voucherCode}
              </p>
            )}
            <Button
              variant="outline"
              className="ml-4 py-2 px-4 rounded-lg"
              onClick={() => {
                if (!showGiftMessage) {
                  setShowGiftMessage(true);
                  setIsEditable(false);
                }
              }}
            >
              {showGiftMessage ? "Applied" : "Apply"}
            </Button>
          </div>
          {showGiftMessage && (
            <p className="mt-2 text-brown font-medium">
              Congratulations! We will send you a surprise with your order.
            </p>
          )}
        </div>
        <CardFooter>
          <Link
            href={""}
            onClick={handlePlaceOrder}
            className="w-full py-3 mt-4 rounded-xl text-center my-2 bg-brown text-pale"
          >
            Place Order
          </Link>
        </CardFooter>
      </div>
    </div>
  );
};

export default OrderPage;
