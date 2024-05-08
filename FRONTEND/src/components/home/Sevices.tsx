import React from "react";

const Sevices = () => {
  return (
    <div
      className="w-full h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] bg-cover my-4 "
      style={{ backgroundImage: `url("/bg2.jpg")` }}
    >
      <ul className="w-full h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] backdrop-blur-sm flex flex-row items-center justify-center space-x-6 md:space-x-10 lg:space-x-14 xl:space-x-20  px-2 max-w-[1200px] mx-auto">
        <li
          style={{ backgroundImage: `url("/s1.jpg")` }}
          className="rounded-md h-3/4 w-full bg-cover bg-center overflow-hidden sm:max-w-[110px] md:max-w-[160px] lg:max-w-[210px]"
        >
          <span className="w-full h-full bg-black/50 text-white font-semibold flex items-center text-center md:text-lg text-xs justify-center">
            Exceptional Craftmanship
          </span>
        </li>
        <li
          style={{ backgroundImage: `url("/s2.jpg")` }}
          className="rounded-md h-3/4 w-full bg-cover bg-center overflow-hidden md:max-w-[160px] lg:max-w-[210px]"
        >
          <span className="w-full h-full bg-black/50  text-white font-semibold flex items-center text-center md:text-lg text-xs justify-center">
            Traditional Design
          </span>
        </li>
        <li
          style={{ backgroundImage: `url("/s3.jpg")` }}
          className="rounded-md h-3/4 w-full bg-cover bg-center overflow-hidden md:max-w-[160px] lg:max-w-[210px]"
        >
          <span className="w-full h-full bg-black/50  text-white font-semibold flex items-center text-center md:text-lg text-xs justify-center">
            TimeLess Design
          </span>
        </li>
        <li
          style={{ backgroundImage: `url("/s4.jpg")` }}
          className="rounded-md h-3/4 w-full bg-cover bg-center overflow-hidden md:max-w-[160px] lg:max-w-[210px] justify-center"
        >
          <span className="w-full h-full bg-black/50  text-white font-semibold flex text-center items-center md:text-lg text-xs justify-center">
            Affordable Luxury
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sevices;
