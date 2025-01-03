import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "@/components/ui/use-toast";
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
          const response = await queryFulfilled;
          dispatch(setCart(response.data.data as CartSchema));
          toast({
            title: "Success",
            description: "Your product has been added to the cart.",
            variant: "default",
            duration: 1000,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to add product to cart.",
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
          const response = await queryFulfilled;
          dispatch(setCart(response.data.data as CartSchema));
          toast({
            title: "Success",
            description: "Your product has been removed from the cart.",
            variant: "default",
            duration: 1000,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to remove product from cart.",
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
          const response = await queryFulfilled;
          
          const { status, message } = response.data;
          console.log(status,message);
          
          if (status === 400) {
            toast({
              title: "Insufficient Stock",
              description: message,
              variant: "destructive",
              duration: 1000,
            });
          } else {
            dispatch(setCart(response.data.data as CartSchema));
            toast({
              title: "Success",
              description: "The product quantity has been updated in your cart.",
              variant: "default",
              duration: 1000,
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update product quantity.",
            variant: "destructive",
            duration: 1000,
          });
        }
      },
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useManipulateQuantityMutation,
} = cartApi;
