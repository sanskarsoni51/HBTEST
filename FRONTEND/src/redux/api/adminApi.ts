import { ProductSchema } from "@/schema/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminapi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    credentials: "include",
  }),
  tagTypes: ["Users", "Products", "Orders"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({ url: `users/${userId}`, method: "DELETE" }),
    }),
    addProduct: builder.mutation<
      any,
      { productInfo: ProductSchema; images: FileList | null }
    >({
      query: ({ productInfo, images }) => {
        const formData = new FormData();

        formData.append("productName", productInfo.productName);
        formData.append(
          "description",
          productInfo.description ? productInfo.description : "",
        );
        formData.append(
          "category",
          productInfo.category ? JSON.stringify(productInfo.category) : "",
        );
        formData.append(
          "colors",
          productInfo.colors ? JSON.stringify(productInfo.colors) : "",
        );
        formData.append(
          "price",
          productInfo.price ? String(productInfo.price) : "0",
        );
        formData.append(
          "qtyavailabele",
          productInfo.qtyavailable ? String(productInfo.qtyavailable) : "0",
        );
        if (images !== null) {
          for (let index = 0; index < images.length; index++) {
            formData.append("images", images[index], images[index].name);
          }
        }
        return {
          url: "/products",
          method: "POST",
          transformResponse: (response: string) => {
            return JSON.parse(response).id;
          },
          body: formData,
        };
      },
    }),
    editProduct: builder.mutation({
      //to be updated
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "PATCH",
      }),
    }),
    editProductImgs: builder.query({
      async queryFn(files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          if (!file.name) {
            file = new File([file], "filename", { type: file.type });
          }
          formData.append("images", file, file.name);
        }
        const request = await fetch("/upload", {
          body: formData,
        }).then((r) => r.json());
        return request.data ? request.data : undefined;
      },
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
    getAllOrders: builder.mutation({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    searchOrderById: builder.mutation({
      query: (productId) => ({
        url: `/searchOrder/${productId}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (order) => {
        return {
          url: `/updateOrderStatus?id=${order.order_id}&status=${order.status}`,
        };
      },
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useAddProductMutation,
  useDeleteUserMutation,
  useEditProductImgsQuery,
  useEditProductMutation,
  useGetAllOrdersMutation,
  useGetUsersQuery,
  useSearchOrderByIdMutation,
  useUpdateOrderStatusMutation,
} = adminApi;
