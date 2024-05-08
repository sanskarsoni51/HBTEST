'use server'
import { cookies } from "next/headers";
import { headers } from "next/headers";
export const cookiehandleset = (token:string) => {
    cookies().set("jwt", token);
}

export const cookiehandleget = async() => {
    return cookies().get("jwt");
}


