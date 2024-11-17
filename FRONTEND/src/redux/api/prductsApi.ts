import { ProductSchema } from "@/schema/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProductResponse {
  totalPages: number;
  data: ProductSchema[];
}
export interface IErrorresponse {
  statusCode?: string | null;
  message?: string | null;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<any, null>({
      query: () => ({
        url: `category`,
        method: "GET",
      }),
    }),
    getProductsWithFilter: builder.mutation<
      IProductResponse,
      { category: string; sort: string; pageNumber: number; search?: string }
    >({
      query: ({ category, sort, pageNumber, search }) => {
        let filterString = `/product?limit=8&page=${pageNumber+1}`;
        if (category) {
          filterString += `&category=${category}`;
        }
        if (sort) {
          filterString += `&sort=${sort}`;
        }
        if (search?.length) {
          return {
            url: `/product/search?name=${search}`,
            method: "GET",
          };
        }
        return {
          url: filterString,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query<
      { message: string; data: ProductSchema },
      number
    >({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    getBestSeller: builder.query<{ message: string; data: Array<any> }, null>({
      query: () => ({
        url: "/product/newProducts",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsWithFilterMutation,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetBestSellerQuery,
} = productApi;
