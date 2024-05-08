import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { toast } from "@/components/ui/use-toast";
import { REHYDRATE } from "redux-persist";
import { setCart } from "../slice/cartSlice";

export const cartApi = createApi({
  reducerPath: "cartapi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation<any, number>({
      query(itemId) {
        return {
          url: `/cart/addToCart`,
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: { pid: itemId.toString() },
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
    removeFromCart: builder.mutation<any, number>({
      query(itemId) {
        return {
          url: `/cart/removeFromCart`,
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: { pid: itemId.toString() },
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
    manipulateQuantity: builder.mutation<
      any,
      { itemId: number; quantity: number }
    >({
      query({ itemId, quantity }) {
        // quantity is updated quantity.
        return {
          url: `/cart/changeQuantity`,
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: { pid: itemId.toString(), quantity: quantity.toString() },
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
  }),
});

export const {
  // useAddAddressMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useManipulateQuantityMutation,
} = cartApi;
