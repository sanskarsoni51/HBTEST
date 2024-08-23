import Image from "next/image";
import React from "react";
// import BuyNowButton from "./BuyNowButton";
import bs from "../../../../public/bs2.jpg";

interface CardProps {
  img: string;
  title: string;
  desc: string;
  price: number;
  shoplink: string;
}

function Card2({ img, title, desc, price, shoplink }: CardProps) {
  return (
    <div
      className="w-[200px] sm:w-[250px] aspect-[2/3] flex flex-col items-center bg-contain my-2 overflow-hidden rounded-lg shadow-md "
      style={{ backgroundImage: `url("/card2bg.jpg")` }}
    >
      <Image
        src="/cat2.jpg"
        alt={title}
        className="mt-6 sm:mt-8 rounded-md w-[150px] aspect-[2/3] sm:w-[180px] object-cover"
      />

      <span className="font-semibold text-sm sm:text-lg">{title}</span>
      <h4>
        Price:<span className="font-thin text-xs sm:text-lg">Rs</span> {price} /-
      </h4>
      {/* <BuyNowButton {...shoplink} />  */}
    </div>
  );
}

export default Card2;
