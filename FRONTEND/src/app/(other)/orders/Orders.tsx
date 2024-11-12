import { Address, CartSchema } from "@/schema/schema";
import React, { useState, useEffect } from "react";
import SelectedOrderDetails from "./SelectedOrderDetails";
import { Button } from "@/components/ui/button";

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
  const currentOrders = order
    .slice()
    .reverse()
    .slice(indexOfFirstOrder, indexOfLastOrder);

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
    <div className="w-full h-screen overflow-y-auto bg-gray-100 p-4 flex flex-col md:flex-row">
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
                  {/* Displaying the first product's image */}
                  {o.cart.products &&
                    Object.values(o.cart.products).length > 0 && (
                      <img
                        src={
                          Object.values(o.cart.products)[0].product.images[0]
                        } // Use the first product's image URL
                        alt="Product"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    )}
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
                    <div className="text-sm">
                      {o.cart.payablePrice.toFixed(2)}
                    </div>
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
          {totalPages > 1 && (
            <nav className="flex space-x-2 justify-center mb-5">
              <div className="flex overflow-x-auto no-scrollbar gap-2 px-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-brown hover:text-white bg-pale px-3 py-1"
                >
                  {"<"}
                </Button>

                <Button
                  onClick={() => handlePageChange(1)}
                  className={`text-brown hover:text-white ${
                    currentPage === 1 ? "bg-lbrown text-white" : "bg-pale"
                  } px-3 py-1`}
                >
                  1
                </Button>

                {currentPage > 3 && totalPages > 4 && (
                  <span className="text-gray-500">...</span>
                )}

                {currentPage > 2 && (
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="text-brown hover:text-white bg-pale px-3 py-1"
                  >
                    {currentPage - 1}
                  </Button>
                )}

                {currentPage !== 1 && currentPage !== totalPages && (
                  <Button
                    className="bg-lbrown text-white px-3 py-1"
                    onClick={() => handlePageChange(currentPage)}
                  >
                    {currentPage}
                  </Button>
                )}

                {currentPage < totalPages - 1 && (
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="text-brown hover:text-white bg-pale px-3 py-1"
                  >
                    {currentPage + 1}
                  </Button>
                )}

                {currentPage < totalPages - 2 && totalPages > 4 && (
                  <span className="text-gray-500">...</span>
                )}

                <Button
                  onClick={() => handlePageChange(totalPages)}
                  className={`text-brown hover:text-white ${
                    currentPage === totalPages
                      ? "bg-lbrown text-white"
                      : "bg-pale"
                  } px-3 py-1`}
                >
                  {totalPages}
                </Button>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-brown hover:text-white bg-pale px-3 py-1"
                >
                  {">"}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </div>

      <div className="hidden md:block w-full md:w-2/4">
        <SelectedOrderDetails selectedOrder={selectedOrder} />
      </div>
    </div>
  );
};

export default Orders;
