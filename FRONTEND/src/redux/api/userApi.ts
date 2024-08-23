"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthState, setAuthUser } from "../slice/authSlice";
import { setCart } from "../slice/cartSlice";
import { toast } from "@/components/ui/use-toast";
import { CreateOrderSchema } from "./orderApi";

export const userApi = createApi({
  reducerPath: "userapi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<any, null>({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const user = (await queryFulfilled).data.data;
          if (user) {
            dispatch(setAuthState(true));
            dispatch(
              setAuthUser({
                email: user.email,
                name: user.name,
                password: "",
                address: user.address,
                profilePhoto: user.profilePhoto,
                role: user.role,
              }),
            );
          }
          await queryFulfilled;
          await dispatch(userApi.endpoints.getCart.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getCart: builder.query({
      query: () => {
        return {
          url: `/cart/myCart`,
          method: "GET",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const cart = (await queryFulfilled).data.data;
          dispatch(
            setCart({
              products: cart.products,
              deliveryCharges: cart.deliveryCharges,
              gst: cart.gst,
              payablePrice: cart.payablePrice,
              totalPrice: cart.totalPrice,
              totalQuantity: cart.totalQuantity,
            }),
          );
        } catch (error) {
          toast({
            title: "Error",
            variant: "destructive",
            duration: 1000,
          });
        }
      },
    }),
    getOrder: builder.query({
      query: () => {
        return {
          url: "/order/myOrders",
          method: "GET",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
    }),
    updateProfile: builder.mutation<any, { name?: string; password?: string }>({
      query: (profile: { name?: string; password?: string }) => {
        return {
          url: "/user/profile",
          method: "PATCH",
          body: profile,
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate(null));
        } catch (error: any) {
          throw new Error(
            error.message ? error.message : "Error occured updating user info.",
          );
        }
      },
    }),
    logoutUser: builder.query({
      query: () => {
        return {
          url: "/user/logout",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
    }),
    createOrder: builder.mutation<any, CreateOrderSchema>({
      query: (orderDetails) => {
        return {
          url: "/order/createOrder",
          method: "POST",
          body: orderDetails,
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
    }),
    userImageupdate: builder.query<any, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("profilePhoto", file);
        return {
          url: "/user/profile/img",
          method: "PATCH",
          body: formData,
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const user = (await queryFulfilled).data.data;
          dispatch(setAuthState(true));
          dispatch(
            setAuthUser({
              email: user.email,
              name: user.name,
              password: "",
              address: user.address,
              profilePhoto: user.profilePhoto,
              role: user.role,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useUpdateProfileMutation,
  useLogoutUserQuery,
  useCreateOrderMutation,
  useLazyUserImageupdateQuery,
  useGetCartQuery,
  useGetOrderQuery,
} = userApi;
