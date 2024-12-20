"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useCreateOrderMutation } from "@/redux/api/userApi";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import AddAddressForm, { AddAddressInput } from "@/components/util/AddAddress";
import { addAddress } from "@/redux/slice/orderSlice";
import { Address } from "@/schema/schema";

const OrderPage = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const order = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);
  const [isEditable, setIsEditable] = useState(false);
  const [voucherCode, setVoucherCode] = useState("HAPPYNEWCLIENT20");

  const dispatch = useAppDispatch();
  const [addresses, setAddresses] = useState<Address[]>(user.address || []);
  const [isAddressFormVisible, setAddressFormVisible] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null); // State to manage selected address

  const [createOrder, { isSuccess, isLoading, isError }] =
    useCreateOrderMutation();

  useEffect(() => {
    // Update the local state when Redux state changes
    setAddresses(user.address);
  }, [user.address]);

  const handleAddressSubmit = (data: AddAddressInput) => {
    const newAddress: Address = {
      ...data,
      pinCode: parseInt(data.pinCode, 10), // Convert pinCode to number if required
    };

    dispatch(addAddress(newAddress));
    setAddresses([...addresses, newAddress]); // Update local state for immediate reactivity
    setSelectedAddress(newAddress); // Set the newly added address as selected

    toast({
      title: "Address added successfully and selected for shipping.",
      variant: "default",
      duration: 2500,
    });
    setAddressFormVisible(false);
  };

  const handlePlaceOrder = () => {
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
        pinCode: selectedAddress.pinCode.toString(), // Convert pinCode to string
      },
      paymentMethod,
    };

    createOrder(orderData);
  };

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
    <div className="flex flex-col md:flex-row md:space-x-4 px-4 py-6 bg-gray-100">
      <div className="flex-grow">
        <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-2">Name: {user.name}</p>
              <p className="mb-4">Email: {user.email}</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/profile")}>
              Manage Account
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>

          {/* Display all addresses, including the new one */}
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
                Address: {a.street}, {a.city}, {a.state}, {a.country},{" "}
                {a.pinCode}
              </label>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() => setAddressFormVisible(!isAddressFormVisible)}
          >
            {user.address.length > 0
              ? "Edit Shipping Address"
              : "Add Shipping Address"}
          </Button>

          {isAddressFormVisible && (
            <div className="mt-4">
              <AddAddressForm onSubmit={handleAddressSubmit} />
            </div>
          )}
        </div>

        <div className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <div className="flex items-center mb-2">
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
          <div className="flex items-center mb-4">
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

      <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <div className="mb-2">
          <p>Product Total: ₹{cart.totalPrice.toFixed(2)}</p>
          <p>GST: ₹{cart.gst.toFixed(2)}</p>
          <p>Shipping Charges: ₹{cart.deliveryCharges}</p>
          <p>Total (incl. VAT): ₹{cart.payablePrice.toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <h3>Order Note</h3>
          <textarea
            className="w-full border-gray-300 border p-2 rounded-md"
            placeholder="Add a note for the seller"
          ></textarea>
        </div>
        <div className="mb-4">
          <h3>Applied Voucher</h3>
          <input
            type="text"
            value={voucherCode}
            readOnly={!isEditable}
            onChange={(e) => setVoucherCode(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? "Save" : "Change"}
          </Button>
        </div>
        <Button
          className="w-full bg-blue-500 text-white py-2"
          disabled={isLoading}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
