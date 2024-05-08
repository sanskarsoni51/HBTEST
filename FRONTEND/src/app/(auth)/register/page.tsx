"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { CardWrapper } from "../../../components/card-wrapper";
import { RegisterInner } from "./register-handler";
import { useLazyGetUserQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/store";

const Register = () => {
  const [getUser, { data, isSuccess }] = useLazyGetUserQuery();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    getUser(null);
  }, []);
  if (isSuccess) {
  }
  if (data) {
    if (user?.role === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/");
    }
  } else {
    return (
      <div className="flex h-screen justify-center items-center">
        <CardWrapper
          headerlabel="Register"
          discription="Please fill out the form to create an account."
          backbuttonlabel="Back to Login"
          backbuttonhref="/login"
          showsocial={false}
        >
          <RegisterInner />
        </CardWrapper>
      </div>
    );
  }
};

export default Register;
