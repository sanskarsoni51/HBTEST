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

          <div className="flex justify-between gap-6">
            <div className="flex-1">
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
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Shipping Address:</h3>
              <p>
                {selectedOrder.address.street}, {selectedOrder.address.city}
              </p>
              <p>
                {selectedOrder.address.state}, {selectedOrder.address.country} -{" "}
                {selectedOrder.address.pinCode}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Products:</h3>
            <div className="space-y-4">
              {Object.keys(selectedOrder.cart.products).map((key) => {
                const productId = Number(key);
                const product = selectedOrder.cart.products[productId].product;
                const quantity =
                  selectedOrder.cart.products[productId].quantity;
                const price =
                  selectedOrder.cart.products[productId].product.price;

                return (
                  <div
                    key={productId}
                    className="flex items-center border rounded-lg p-4"
                  >
                    {/* <img
                      src={product.imageUrl} // assuming product has an imageUrl property
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    /> */}
                    <div>
                      <h4 className="text-lg font-semibold">
                        {product.productName}
                      </h4>
                      <p>
                        <strong>Quantity: </strong>
                        {quantity}
                      </p>
                      <p>
                        <strong>Price: </strong>₹{price} x {quantity} = ₹
                        {price * quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Price Breakdown:</h3>
            <div className="mb-2">
              <strong>Subtotal: </strong> ₹ {subtotal.toFixed(2)}
            </div>
            <div className="mb-2">
              <strong>GST: </strong> ₹{gst.toFixed(2)}
            </div>
            <div className="mb-2">
              <strong>Delivery Charges: </strong> ₹{deliveryCharges}
            </div>
            <hr className="my-4" />
            <div className="text-xl font-semibold">
              <strong>Total Payable Price: </strong> ₹
              {totalPayablePrice.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center"></div>
      )}
    </div>
  );
};

export default SelectedOrderDetails;
