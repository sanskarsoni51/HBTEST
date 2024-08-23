"use client";
import { toast } from "@/components/ui/use-toast";
import { useLogoutUserMutation } from "@/redux/api/authApi";
import { authSlice, setAuthState, setAuthUser } from "@/redux/slice/authSlice";
import { setCart } from "@/redux/slice/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const [logout, { isSuccess }] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    logout();
    sessionStorage.removeItem("token");
    if (isSuccess) {
      toast({
        title: "Logout Successful.",
        variant: "default",
        duration: 2000,
      });
    }
    dispatch(setAuthState(false));
    dispatch(
      setAuthUser({
        email: "",
        name: "",
        address: [],
        password: "",
        profilePhoto: "",
        role: "none",
      }),
    );
    dispatch(
      setCart({
        products: {},
        deliveryCharges: 0,
        gst: 0,
        totalQuantity: 0,
        totalPrice: 0,
        payablePrice: 0,
      }),
    );
    redirect("/");
  }, []);
};

export default Logout;
