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
    // Auto-select the first variant on page load
    if (product.variants && product.variants.length > 0) {
      setVariant({ color: product.variants[0].color });
    }
  }, [product.variants]);
  return (
    <div className="grid grid-cols-1 h-500 lg:grid-cols-2 gap-6 p-5 lg:p-12">
      {/* Product Image Section */}
      <div className="w-full flex justify-center items-center">
        <ProductCorousel images={product.images} />
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-3 capitalize">
          {product.productName} ({variant.color})
        </h1>

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

        {/* Color Selection */}
        <div className="mb-4">
          <span className="font-semibold">Available Colors:</span>
          <div className="flex gap-2 mt-2">
            {product.variants &&
              product.variants.map(({ color }, index) => (
                <label key={index} className="cursor-pointer relative group">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    className="hidden"
                    onChange={(e) => {
                      setVariant((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }));
                    }}
                  />
                  <div
                    className={`flex items-center justify-center border-2 rounded-md ${
                      variant.color === color
                        ? "border-black"
                        : "border-gray-300"
                    } group-hover:bg-[${color}] transition-colors font-semibold px-4 py-2`}
                  >
                    <span className="capitalize">{color}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs px-3 py-1 rounded">
                    {color}
                  </div>
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
        <div className="hidden lg:flex flex-col gap-3 lg:flex-row">
          <AddtoCartButton productToAdd={product} variant={variant} />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 lg:col-span-2">
        <div className="flex justify-center mb-6">
          {/* <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "details" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            The Details
          </button> */}
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
          {activeTab === "reviews" && (
            <div className="flex justify-center items-center bg-white py-10">
              {/* Full Page Box for Reviews */}
              <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-black mb-6">
                  Customer Reviews
                </h2>

                {/* Container for Reviews */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {/* Individual Review Boxes */}
                  <div className="flex flex-col items-center p-6 border rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="font-semibold text-xl text-black">
                      Surbhi Jain
                    </div>
                    <div className="text-sm text-gray-500">★★★★★</div>
                    <p className="text-gray-700 mt-4">
                      I recently bought a pair of earrings from The Hart Bazaar
                      for a special occasion, and they exceeded my expectations.
                      They are so versatile and can be worn with almost
                      anything. I love the attention to detail in their designs!
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 border rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="font-semibold text-xl text-black">
                      Ajit Rathore
                    </div>
                    <div className="text-sm text-gray-500">★★★★☆</div>
                    <p className="text-gray-700 mt-4">
                      Shopping for a gift for my wife has never been easier! The
                      Hart Bazaar has an incredible collection of jewelry, and I
                      found the perfect bracelet that matched her style. She was
                      thrilled with the gift, and I could not be happier with
                      the experience.
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 border rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="font-semibold text-xl text-black">
                      Rajiv Gupta
                    </div>
                    <div className="text-sm text-gray-500">★★★★★</div>
                    <p className="text-gray-700 mt-4">
                      I was looking for something special to celebrate my
                      anniversary, and I found the perfect necklace at The Hart
                      Bazaar. The design is elegant, and the quality is
                      outstanding. It was the perfect gift for my wife, and she
                      could not stop smiling when she saw it!
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 border rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="font-semibold text-xl text-black">
                      Metri Jain
                    </div>
                    <div className="text-sm text-gray-500">★★★★★</div>
                    <p className="text-gray-700 mt-4">
                      I wanted to surprise my husband with something meaningful
                      for our anniversary, and The Hart Bazaar had the perfect
                      watch! The design is sleek and stylish, and he absolutely
                      loved it. It has become his favorite accessory, and I am
                      so happy with how it turned out!
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 border rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="font-semibold text-xl text-black">
                      Shivani Nitori
                    </div>
                    <div className="text-sm text-gray-500">★★★★★</div>
                    <p className="text-gray-700 mt-4">
                      The necklace I ordered from The Hart Bazaar was the
                      perfect gift for my best friend's birthday. She was over
                      the moon when she received it, and the packaging was so
                      elegant too. It made her feel extra special, and I am
                      definitely coming back for more!
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 border rounded-xl bg-white hover:shadow-md transition-shadow duration-300">
                    <div className="font-semibold text-xl text-black">
                      Anjali Viswa
                    </div>
                    <div className="text-sm text-gray-500">★★★★★</div>
                    <p className="text-gray-700 mt-4">
                      I bought a gorgeous pendant from The Hart Bazaar as a
                      treat to myself, and I could not be more pleased! The
                      quality is superb, and it has a timeless design that goes
                      with any outfit. I have received so many compliments
                      already!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "discussion" && (
            <div className="bg-gradient-to-r from-[#f1e4d1] to-[#f1e4d1] text-[#4a3d29] p-10">
              <h3 className="text-2xl font-semibold mb-4">Discussion Forum</h3>
              <p className="text-lg">Coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Section for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 flex flex-col gap-3">
        <AddtoCartButton productToAdd={product} variant={variant} />
      </div>
    </div>
  );
};

export default Product;
