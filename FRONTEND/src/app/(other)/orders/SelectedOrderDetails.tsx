import React from "react";
import { CartSchema, Address } from "@/schema/schema";

type SelectedOrderDetailsProps = {
  selectedOrder: {
    orderId: string;
    paymentId: string;
    status: string;
    cart: CartSchema;
    address: Address;
  } | null;
};

const SelectedOrderDetails: React.FC<SelectedOrderDetailsProps> = ({
  selectedOrder,
}) => {
  const calculateSubtotal = () => {
    if (!selectedOrder) return 0;
    return Object.keys(selectedOrder.cart.products).reduce((subtotal, key) => {
      const productId = key;
      const price = selectedOrder.cart.products[productId].product.price;
      const quantity = selectedOrder.cart.products[productId].quantity;
      return subtotal + price * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gst = selectedOrder?.cart.gst || 0;
  const deliveryCharges = selectedOrder?.cart.deliveryCharges || 0;
  const totalPayablePrice = selectedOrder?.cart.payablePrice || 0;

  return (
    <div>
      {selectedOrder ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-brown text-white p-6 text-center">
            <h2 className="text-3xl font-bold">Order Summary</h2>
          </div>

          {/* Order Info & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold text-brown mb-4">
                Order Information
              </h3>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              {/* <p>
                <strong>Payment ID:</strong> {selectedOrder.paymentId}
              </p> */}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 capitalize rounded text-white text-sm ${
                    selectedOrder.status === "Completed"
                      ? "text-green-500"
                      : selectedOrder.status === "pending"
                      ? "text-orange-500"
                      : selectedOrder.status === "confirmed"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {selectedOrder.status === "pending"
                    ? "Order Placed"
                    : selectedOrder.status === "confirmed"
                    ? "Ready to Dispatch"
                    : selectedOrder.status}
                </span>
              </p>
            </div>

            {/* Address Details */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold text-brown mb-4">
                Shipping Address
              </h3>
              <p>{selectedOrder.address.street}</p>
              <p>
                {selectedOrder.address.city}, {selectedOrder.address.state}
              </p>
              <p>
                {selectedOrder.address.country} -{" "}
                {selectedOrder.address.pinCode}
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-brown mb-4">
              Products in Your Order
            </h3>
            <div className="space-y-4">
              {Object.keys(selectedOrder.cart.products).map((key) => {
                const productId = key;
                const product = selectedOrder.cart.products[productId].product;
                const quantity =
                  selectedOrder.cart.products[productId].quantity;
                const price =
                  selectedOrder.cart.products[productId].product.price;

                return (
                  <div
                    key={productId}
                    className="flex justify-between items-center bg-gray-100 rounded-md p-4 shadow-sm"
                  >
                    {/* Product Name */}
                    <div className="flex items-center gap-4">
                      {/* <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={product.imageUrl || "/placeholder.png"}
                          alt={product.productName}
                          className="object-cover w-full h-full"
                        />
                      </div> */}
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          {product.productName}
                        </p>
                      </div>
                    </div>

                    {/* Price & Quantity */}
                    <div className="text-right">
                      <p className="text-md font-semibold text-gray-700">
                        ₹{price} x {quantity} = ₹{price * quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-100 p-6">
            <h3 className="text-xl font-semibold text-brown mb-4">
              Price Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>Subtotal:</div>
              <div className="text-right">₹ {subtotal.toFixed(2)}</div>
              <div>GST:</div>
              <div className="text-right">₹ {gst.toFixed(2)}</div>
              <div>Delivery Charges:</div>
              <div className="text-right">₹ {deliveryCharges}</div>
              <hr className="col-span-2 my-2" />
              <div className="font-semibold">Total Payable Price:</div>
              <div className="text-right font-semibold text-lg">
                ₹ {totalPayablePrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center bg-gray-100 shadow-lg rounded-lg p-6">
          <p className="text-lg text-gray-600">No order selected.</p>
        </div>
      )}
    </div>
  );
};

export default SelectedOrderDetails;
