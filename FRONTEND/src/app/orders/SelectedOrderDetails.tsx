import React from "react";
import { CartSchema, Address } from "@/schema/schema";

// Define the type for the selected order
type SelectedOrderDetailsProps = {
  selectedOrder: {
    orderId: string;
    paymentId: string;
    status: string;
    cart: CartSchema;
    address: Address; // Include the address type
  } | null;
};

const SelectedOrderDetails: React.FC<SelectedOrderDetailsProps> = ({
  selectedOrder,
}) => {
  const calculateSubtotal = () => {
    if (!selectedOrder) return 0;
    return Object.keys(selectedOrder.cart.products).reduce((subtotal, key) => {
      const productId = Number(key);
      const product = selectedOrder.cart.products[productId].product;
      const quantity = selectedOrder.cart.products[productId].quantity;
      const price = selectedOrder.cart.products[productId].product.price;
      return subtotal + price * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const gst = selectedOrder?.cart.gst || 0;
  const deliveryCharges = selectedOrder?.cart.deliveryCharges || 0;
  const totalPayablePrice = selectedOrder?.cart.payablePrice || 0;

  return (
    <div className="px-4 pb-4">
      {selectedOrder ? (
        <div className="bg-pale shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="mb-2">
            <strong>Order ID: </strong>
            {selectedOrder.orderId}
          </div>
          <div className="mb-2">
            <strong>Payment ID: </strong>
            {selectedOrder.paymentId}
          </div>
          <div className="mb-2">
            <strong>Status: </strong>
            {selectedOrder.status}
          </div>

          {/* Products Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Products:</h3>
            <div className="space-y-4">
              {Object.keys(selectedOrder.cart.products).map((key) => {
                const productId = Number(key); // Convert key to number
                const product = selectedOrder.cart.products[productId].product;
                const quantity =
                  selectedOrder.cart.products[productId].quantity;
                const price =
                  selectedOrder.cart.products[productId].product.price; // Assuming each product has a price field

                return (
                  <div key={product.pid} className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold">
                      {product.productName}
                    </h4>
                    {/* <p>{product.description}</p> */}
                    <p>
                      <strong>Quantity: </strong>
                      {quantity}
                    </p>
                    <p>
                      <strong>Price: </strong>${price} x {quantity} = $
                      {price * quantity}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Price Breakdown:</h3>
            <div className="mb-2">
              <strong>Subtotal: </strong>${subtotal}
            </div>
            <div className="mb-2">
              <strong>GST: </strong>${gst}
            </div>
            <div className="mb-2">
              <strong>Delivery Charges: </strong>${deliveryCharges}
            </div>
            <hr className="my-4" />
            <div className="text-xl font-semibold">
              <strong>Total Payable Price: </strong>${totalPayablePrice}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <p className="text-gray-500">Click on an order to see details.</p>
        </div>
      )}
    </div>
  );
};

export default SelectedOrderDetails;
