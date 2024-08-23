"use client";
import { useLazyGetUserQuery } from "@/redux/api/userApi";
import { redirect } from "next/navigation";
import { CardWrapper } from "../../../components/card-wrapper";
import { LoginInner } from "./login-card-handler";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/store";

function LoginPage() {
  const [getUser, { data, isSuccess }] = useLazyGetUserQuery();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    getUser(null);
  }, []);
  if (isSuccess) {
    if (data) {
      if (user?.role === "admin") {
        redirect("/admin/dashboard");
      } else if (user?.role === "user") {
        redirect("/");
      }
    }
  } else {
    return (
      <div className="flex h-screen justify-center items-center">
        <CardWrapper
          headerlabel="Welcome Back"
          backbuttonhref="/register"
          backbuttonlabel="Don't have an account?"
          discription="Welcome Back.."
          showsocial={false}
        >
          <LoginInner />
        </CardWrapper>
      </div>
    );
  }
}
export default LoginPage;
