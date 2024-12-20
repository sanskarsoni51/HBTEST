import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { toast } from "@/components/ui/use-toast";
import { REHYDRATE } from "redux-persist";
import { setCart } from "../slice/cartSlice";
import { CartSchema, Variant } from "@/schema/schema";

export const cartApi = createApi({
  reducerPath: "cartapi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation<any, { pid: number; variant: Variant }>({
      query({ pid, variant }) {
        return {
          url: `/cart/addToCart`,
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: { pid: pid.toString(), variant: variant },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          if ((await queryFulfilled).data.status == 401) {
            toast({
              title: "Please Login First",
              variant: "destructive",
              duration: 1000,
            });
          } else {
            dispatch(setCart((await queryFulfilled).data.data as CartSchema));
            // const cart = (await queryFulfilled).data.data;
            // if (cart) {
            //   dispatch(
            //     setCart({
            //       products: cart.products,
            //       deliveryCharges: cart.deliveryCharges,
            //       gst: cart.gst,
            //       payablePrice: cart.payablePrice,
            //       totalPrice: cart.totalPrice,
            //       totalQuantity: cart.totalQuantity,
            //       address:cart.shippingAddress
            //     }),
            //   );
            // }
          }
        } catch (error) {
          toast({
            title: "Error",
            variant: "destructive",
            duration: 1000,
          });
        }
      },
    }),
    removeFromCart: builder.mutation<any, { pid: number; variant: Variant }>({
      query(item) {
        return {
          url: `/cart/removeFromCart`,
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: { pid: item.pid.toString(), variant: item.variant },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setCart((await queryFulfilled).data.data as CartSchema));
          // const cart = (await queryFulfilled).data.data;
          // dispatch(
          //   setCart({
          //     products: cart.products,
          //     deliveryCharges: cart.deliveryCharges,
          //     gst: cart.gst,
          //     payablePrice: cart.payablePrice,
          //     totalPrice: cart.totalPrice,
          //     totalQuantity: cart.totalQuantity,
          //   }),
          // );
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
      { itemId: number; quantity: number; variant: Variant }
    >({
      query({ itemId, quantity, variant }) {
        // quantity is updated quantity.
        return {
          url: `/cart/changeQuantity`,
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: {
            pid: itemId.toString(),
            quantity: quantity.toString(),
            variant: variant,
          },
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setCart((await queryFulfilled).data.data as CartSchema));
          // const cart = (await queryFulfilled).data.data;
          // dispatch(
          //   setCart({
          //     products: cart.products,
          //     deliveryCharges: cart.deliveryCharges,
          //     gst: cart.gst,
          //     payablePrice: cart.payablePrice,
          //     totalPrice: cart.totalPrice,
          //     totalQuantity: cart.totalQuantity,
          //   }),
          // );
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
