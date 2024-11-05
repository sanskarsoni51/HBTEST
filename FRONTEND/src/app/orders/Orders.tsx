import { Address, CartSchema } from "@/schema/schema";
import React, { useState, useEffect } from "react";
import SelectedOrderDetails from "./SelectedOrderDetails";

// Define the type for an individual order item
type OrderItem = {
  orderId: string;
  cart: CartSchema;
  paymentId: string;
  status: string;
  address: Address; // Address is included here
};

const Orders = ({ order }: { order: Array<OrderItem> }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(
    order[0] || null
  );

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const ordersPerPage = 4; // Set number of orders to display per page

  // Calculate total pages
  const totalPages = Math.ceil(order.length / ordersPerPage);

  // Get the current orders to display
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleOrderClick = (orderDetails: OrderItem) => {
    setSelectedOrder(orderDetails);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (order.length > 0) {
      setSelectedOrder(order[0]);
    }
  }, [order]);

  return (
    <div className="w-full max-h-screen overflow-y-auto bg-gray-100 p-4 flex flex-col md:flex-row">
      {/* Orders List */}
      <div className="w-full md:w-3/4 mb-6 md:mb-0">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {currentOrders.map((o) => (
            <div key={o.orderId}>
              <div
                className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-row items-center justify-between border border-gray-300 cursor-pointer"
                onClick={() => handleOrderClick(o)}
              >
                {/* Product Image */}
                <div className="flex items-center justify-center">
                  <img
                    src="https://haatbazaar-data.s3.ap-south-1.amazonaws.com/uploads/product_images/u_IMG_2712-1729278695387.jpeg"
                    alt="Product"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                </div>

                {/* Order Info - Displaying in a row for all screen sizes */}
                <div className="flex flex-row items-center justify-around w-full">
                  <div className="text-center md:text-left px-2">
                    <div className="font-semibold text-lg">Order ID</div>
                    <div className="text-sm">{o.orderId}</div>
                  </div>

                  <div className="text-center md:text-left px-2">
                    <div className="font-semibold text-lg">Status</div>
                    <div
                      className={`text-sm ${
                        o.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {o.status}
                    </div>
                  </div>

                  <div className="text-center md:text-left px-2">
                    <div className="font-semibold text-lg">Price</div>
                    <div className="text-sm">${o.cart.payablePrice}</div>
                  </div>
                </div>
              </div>

              {/* Conditionally render the selected order details on mobile */}
              <div className="block md:hidden">
                {selectedOrder?.orderId === o.orderId && (
                  <SelectedOrderDetails selectedOrder={selectedOrder} />
                )}
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 ml-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Selected Order Details - Always visible on larger screens */}
      <div className="hidden md:block w-full md:w-2/4">
        <SelectedOrderDetails selectedOrder={selectedOrder} />
      </div>
    </div>
  );
};

export default Orders;
