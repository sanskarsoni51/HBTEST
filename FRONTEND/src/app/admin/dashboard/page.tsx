"use client";
import React, { useEffect, useState } from "react";
import DashBoard from "./Dashboard";
import AdminProducts from "./AdminProducts";
import { useLazyGetUserQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const [getUser, { data, isSuccess }] = useLazyGetUserQuery();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    getUser(null);
  }, []);
  if (isSuccess) {
    if (data) {
      if (user?.role !== "admin") {
        redirect("/login");
      }
    }
  }
  const [opion, setOpion] = useState("dashboard");
  return (
    <div className="flex flex-row gap-10 bg-brown">
      <div className="bg-lbrown">
        <h1 className="text-center text-pale font-semibold text-4xl pt-3 border-b">
          HaatBazzar
        </h1>
        <div className="flex flex-col justify-center left-0 w-[260px] h-screen bg-lbrown text-pale text-3xl">
          <button
            className={`p-3 text-center font-semibold rounded-l-lg ease-in-out duration-500 ${
              opion == "dashboard" ? "bg-brown" : ""
            } `}
            onClick={() => setOpion("dashboard")}
          >
            DashBoard
          </button>
          <button
            className={`p-3 text-center font-semibold rounded-l-lg ease-in-out duration-500 ${
              opion == "products" ? "bg-brown" : ""
            } `}
            onClick={() => setOpion("products")}
          >
            {" "}
            Products
          </button>
          <button
            className={`p-3 text-center font-semibold rounded-l-lg ease-in-out duration-500 ${
              opion == "orders" ? "bg-brown" : ""
            } `}
            onClick={() => setOpion("orders")}
          >
            {" "}
            Orders
          </button>
          <button
            className={`p-3 text-center font-semibold rounded-l-lg ease-in-out duration-500 ${
              opion == "settings" ? "bg-brown" : ""
            } `}
            onClick={() => setOpion("settings")}
          >
            {" "}
            Settings
          </button>
        </div>
      </div>
      {/* <div className="right-0 max-w-[1200px] h-screen"></div> */}

      {opion == "dashboard" ? <DashBoard /> : null}
      {opion == "products" ? <AdminProducts /> : null}
      {/* {opion == "orders" ? <OrdersAdmin /> : null} */}
    </div>
  );
};

export default Dashboard;
