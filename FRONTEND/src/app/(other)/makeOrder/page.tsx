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

                  // Redirect using Next.js useRouter
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
    <div className="flex flex-col md:flex-row md:space-x-4 px-4 py-6 bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Account Section */}
      <div className="flex-grow">
        <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <p className="mb-2">Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          {addresses.map((a, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`address-${index}`}
                name="shippingAddress"
                checked={selectedAddress === a}
                onChange={() => setSelectedAddress(a)}
                className="mr-2"
              />
              <label htmlFor={`address-${index}`}>
                {a.street}, {a.city}, {a.state}, {a.country}, {a.pinCode}
              </label>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setAddressFormVisible(!isAddressFormVisible)}
          >
            Add Address
          </Button>
          {isAddressFormVisible && (
            <AddAddressForm onSubmit={handleAddressSubmit} />
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <div className="mb-2">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
              className="mr-2"
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="Razorpay"
              checked={paymentMethod === "Razorpay"}
              onChange={() => setPaymentMethod("Razorpay")}
              className="mr-2"
            />
            <label htmlFor="razorpay">Razorpay</label>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>Product Total: ₹{cart.totalPrice.toFixed(2)}</p>
        <p>GST: ₹{cart.gst.toFixed(2)}</p>
        <p>Shipping: ₹{cart.deliveryCharges}</p>
        <p>Total: ₹{cart.payablePrice.toFixed(2)}</p>
        <Button
          className="w-full bg-blue-500 text-white py-2"
          // disabled={isLoading}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
