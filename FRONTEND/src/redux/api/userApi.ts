"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthState, setAuthUser } from "../slice/authSlice";
import { setCart } from "../slice/cartSlice";
import { toast } from "@/components/ui/use-toast";
import { CreateOrderSchema } from "./orderApi";
import { CartSchema } from "@/schema/schema";

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
              })
            );
          }
          await queryFulfilled;
          await dispatch(userApi.endpoints.getCart.initiate(null));
        } catch (error: any) {
          if (error?.error.status === 401) {
          }
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
          dispatch(setCart((await queryFulfilled).data.data as CartSchema));
        } catch (error: any) {
          if (error?.error.status === 401) {
            const errorMessage = error?.data?.message || "Please log in first";
            toast({
              title: errorMessage,
              variant: "destructive",
              duration: 2000,
            });
          }
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


      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (error?.error.status === 401) {
            const errorMessage = "Please log in first";
            toast({
              title: errorMessage,
              variant: "default",
              duration: 2000,
            });
          }
        }
      },
    }),
    updateProfile: builder.mutation<any, { name?: string; password?: string; address?: { 
      street: string; 
      city: string; 
      state: string; 
      country: string; 
      pinCode: number; 
  } }>({
    query: (profile) => {
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
        // Refetch user profile to update auth state with address and other details
        await dispatch(userApi.endpoints.getUser.initiate(null));
      } catch (error: any) {
        if (error?.error.status === 401) {
          const errorMessage = "Please log in first";
          toast({
            title: errorMessage,
            variant: "destructive",
            duration: 2000,
          });
        }
        throw new Error(
          error?.error.message ? error?.error.message : "Error occurred updating user info."
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
    acceptPayment: builder.mutation<any, CreateOrderSchema>({
      query(data) {
        return {
          method: "POST",
          url: "/order/acceptPayment",
          body: data,
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      },
    }),
    verifyPayment: builder.mutation<any, { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }>({
      query(data) {
        return {
          method: "POST",
          url: "/order/verifyPayment",
          body: data,
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
            })
          );
        } catch (error: any) {
          if (error?.error.status === 401) {
            const errorMessage = "Please log in first";
            toast({
              title: errorMessage,
              variant: "destructive",
              duration: 2000,
            });
          }
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
  useAcceptPaymentMutation,
  useVerifyPaymentMutation,
  useLazyUserImageupdateQuery,
  useGetCartQuery,
  useGetOrderQuery,
} = userApi;
