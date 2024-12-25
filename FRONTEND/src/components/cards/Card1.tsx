/* eslint-disable @next/next/no-img-element */
import React from "react";
import AddtoCartButton from "./AddtoCartButton";
import Link from "next/link";
import { ProductSchema } from "@/schema/schema";

interface CardProps {
  product: ProductSchema;
}

function Card1({ product }: CardProps) {
  return (
    <div
      className="w-[200px] sm:w-[220px] aspect-[2/3] sm:gap-2 gap-[3px] flex flex-col items-center bg-contain my-2 overflow-hidden rounded-lg shadow-md hover:shadow-xl text-center"
      style={{ backgroundImage: `url("/card1bg.jpg")` }}
    >
      <Link href={`/product/${product?.pid}`}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.productName}
            className="mt-6 rounded-md w-[120px] aspect-[3/4] md:w-[140px] object-cover"
          />
        ) : (
          <div className="mt-6 rounded-md w-[120px] aspect-[3/4] md:w-[140px] flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </Link>
      <Link href={`/product/${product?.pid}`}>
        <span className="font-semibold text-sm text-wrap line-clamp-1 max-w-[150px]">
          {product?.productName}
        </span>
      </Link>
      <h4 className="text-s">
        Price:<span className="font-normal text-s"> ₹ </span>
        {product?.price} /-
      </h4>
      <AddtoCartButton productToAdd={product} />
    </div>
  );
}

export default Card1;
