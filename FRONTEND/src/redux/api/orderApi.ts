import { AddAddressInput } from "@/components/util/AddAddress";
import { CartSchema, OrderSchema } from "@/schema/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateOrderSchema {
  shippingAddress: AddAddressInput | null;
  paymentId: "1313";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrderSchema[], void>({
      query: () => "",
    }),
    createOrder: builder.mutation<number, OrderSchema>({
      query(data) {
        return {
          method: "POST",
          url: "/orders",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
