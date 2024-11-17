import React from "react";

const DashBoard = () => {
  return (
    <div className="grid grid-cols-4 grid-row-6 w-[1200px] h-screen gap-5 text-pale p-5">
      <div className=" bg-lbrown text-center rounded-md font-semibold py-3 row-span-1">
        Total Sales
      </div>
      <div className=" bg-lbrown text-center rounded-md font-semibold py-3 row-span-1">
        Total Orders
      </div>
      <div className=" bg-lbrown text-center rounded-md font-semibold py-3 row-span-1">
        Total Earnings
      </div>
      <div className=" bg-lbrown text-center rounded-md font-semibold py-3 row-span-3">
        Website Traffic
      </div>
      <div className="bg-lbrown text-center rounded-md font-semibold py-3 row-span-3 col-span-3">
        Earning Analytics
      </div>
      <div className="bg-lbrown text-center rounded-md font-semibold py-3 row-span-3">
        Recent Orders
      </div>
      <div className="bg-lbrown text-center rounded-md font-semibold py-3 row-span-2 col-span-3">
        Top Selling Items
      </div>
    </div>
  );
};

export default DashBoard;
