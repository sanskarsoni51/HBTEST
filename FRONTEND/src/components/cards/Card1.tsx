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
      className="w-[180px] sm:w-[200px] aspect-[2/3] flex flex-col items-center bg-contain my-2 overflow-hidden rounded-lg shadow-md hover:shadow-xl text-center"
      style={{ backgroundImage: `url("/card1bg.jpg")` }}
    >
      <Link href={`/product/${product?.pid}`}>
        <img
          src="/cat2.jpg"
          alt={product?.productName}
          className="mt-6 rounded-md w-[120px] aspect-[3/4] md:w-[140px] object-cover"
        />
        <span className="font-semibold text-sm">{product?.productName}</span>
      </Link>
      <h4 className="text-sm">
        Price:<span className="font-thin text-xs">Rs</span> {product?.price} /-
      </h4>
      <AddtoCartButton productToAdd={product} />
    </div>
  );
}

export default Card1;
