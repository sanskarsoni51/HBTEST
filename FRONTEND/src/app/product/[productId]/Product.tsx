import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import ProductCorousel from "./productCorousel";
import { ProductSchema, Variant } from "@/schema/schema";
import AddtoCartButton from "./AddtoCartButton";
import { toast } from "@/components/ui/use-toast";

const Product = ({ product }: { product: ProductSchema }) => {
  // Tab state to switch between sections
  const [activeTab, setActiveTab] = useState("details");
  const [variant, setVariant] = useState<Variant>({ color: "" });
  useEffect(() => {
    console.log("Product", variant);
  }, [variant]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 lg:p-10">
      {/* Product Image Section */}
      <div className="w-full flex justify-center items-center">
        <ProductCorousel images={product.images} />
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-3">{product.productName}</h1>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="font-medium mr-2">Rating:</span>
          {[...Array(5)].map((_, i) => (
            <StarFilledIcon key={i} className="w-5 h-5 text-yellow-400" />
          ))}
          <span className="ml-2 text-gray-600">(4.9)</span>
        </div>

        {/* Price */}
        <div className="text-2xl font-semibold mb-5">
          &#8377; {product.price} /-
        </div>

        {/* Size Selection */}
        {/* <div className="mb-4">
          <span className="font-semibold">Available Size:</span>
          <div className="flex gap-2 mt-2">
            {["S", "M", "L"].map((size) => (
              <Button key={size} variant="outline">
                {size}
              </Button>
            ))}
          </div>
        </div> */}

        {/* Color Selection */}
        <div className="mb-4">
          <span className="font-semibold">Available Color:</span>
          <div className="flex gap-2 mt-2">
            {product.variants &&
              product.variants.map(({ color }, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    className="hidden"
                    onChange={(e) => {
                      setVariant({ color: e.target.value });
                    }}
                  />
                  <span
                    className={`inline-block w-6 h-6 rounded-full cursor-pointer border-2 hover:border-gray-400 ${
                      variant.color === color
                        ? "border-black"
                        : "border-transparent"
                    } `}
                    style={{ backgroundColor: color }}
                  >
                    {/* {variant.color === color ? "slected" : ""} */}
                  </span>
                </label>
              ))}
          </div>
        </div>

        {/* Stock Availability */}
        <div className="text-red-500 mb-5">
          Last {Math.min(product.qtyavailable, 5)} left – make it yours!
        </div>

        {/* Description */}
        <div className="mb-5">
          <span className="font-semibold">Description:</span>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Add to Cart and Favorite Buttons */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <Button
            onClick={() => {
              toast({
                title: "Feature will be available soon.",
                variant: "destructive",
                duration: 2000,
              });
            }}
            variant="outline"
          >
            Add to Favorite
          </Button>
          <AddtoCartButton productToAdd={product} variant={variant} />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 lg:col-span-2">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "details" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            The Details
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "reviews" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Ratings & Reviews <span className="text-gray-500">(3)</span>
          </button>
          {/* <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "discussion" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("discussion")}
          >
            Discussion <span className="text-gray-500">(5)</span>
          </button> */}
        </div>

        {/* Tab Content */}
        <div className="border-t pt-4">
          {activeTab === "details" && <div>The product details go here...</div>}

          {activeTab === "reviews" && (
            <div className="flex justify-center items-center  bg-gray-100">
              {/* Full Page Box for Reviews */}
              <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Customer Reviews
                </h2>

                {/* Container for Reviews */}
                <div className="flex flex-wrap justify-between gap-4">
                  {/* Individual Review Boxes */}
                  <div className="flex-1 min-w-[250px] p-4 border rounded-lg bg-gray-50">
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-gray-600">★★★★★</div>
                    <p className="text-gray-700">
                      Great product! Highly recommend.
                    </p>
                  </div>

                  <div className="flex-1 min-w-[250px] p-4 border rounded-lg bg-gray-50">
                    <div className="font-semibold">Jane Smith</div>
                    <div className="text-sm text-gray-600">★★★★☆</div>
                    <p className="text-gray-700">
                      Very good quality, but a bit pricey.
                    </p>
                  </div>

                  <div className="flex-1 min-w-[250px] p-4 border rounded-lg bg-gray-50">
                    <div className="font-semibold">Alice Johnson</div>
                    <div className="text-sm text-gray-600">★★★★★</div>
                    <p className="text-gray-700">
                      I love it! It exceeded my expectations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "discussion" && (
            <div>Discussion forum goes here...</div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Section for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex flex-col gap-3">
        <Button
          onClick={() => {
            toast({
              title: "Feature will be available soon.",
              variant: "destructive",
              duration: 2000,
            });
          }}
          variant="outline"
        >
          Add to Favorite
        </Button>
        <AddtoCartButton productToAdd={product} variant={variant} />
      </div>
    </div>
  );
};

export default Product;
