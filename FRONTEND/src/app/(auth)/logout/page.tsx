"use client";
import { toast } from "@/components/ui/use-toast";
import { useLogoutUserMutation } from "@/redux/api/authApi";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const [logout, { isSuccess }] = useLogoutUserMutation();
  useEffect(() => {
    logout();
    localStorage.removeItem("token");
    if (isSuccess) {
      toast({
        title: "Logout Successful.",
        variant: "default",
        duration: 2000,
      });
      redirect("/");
    }
  }, []);
};

export default Logout;
