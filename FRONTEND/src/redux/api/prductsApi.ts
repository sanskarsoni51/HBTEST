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
      query: () => {
        return {
          url: `category`,
          method: "GET",
        };
      },
    }),
    getProductsWithFilter: builder.mutation<
      IProductResponse,
      { category: string; sort: string; pageNumber: number; search?: string }
    >({
      query: ({ category, sort, pageNumber, search }) => {
        let filterString = `/product?limit=${4}&page=${pageNumber}`;
        if (category !== "") {
          filterString += `&category=${category}`;
        }
        if (sort !== "") {
          filterString += `&sort=${sort}`;
        }
        if (search?.length != undefined && search.length >= 1) {
          return {
            url: `/product/search?name=${search}`,
            method: "GET",
          };
        }
        return {
          url: `${filterString}`,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query<
      { message: string; data: ProductSchema },
      number
    >({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
    }),
    getBestSeller: builder.query<{ message: string; data: Array<any> }, null>({
      query: () => {
        return {
          url: "/product/newProducts",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetProductsWithFilterMutation,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetBestSellerQuery,
} = productApi;
