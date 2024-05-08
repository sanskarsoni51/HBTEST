import { GenericResponse } from "@/schema/responseSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      GenericResponse,
      { email: string; password: string }
    >({
      query(credentials: { email: string; password: string }) {
        return { url: "/user/login", method: "POST", body: credentials };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          sessionStorage.setItem("token", (await queryFulfilled).data?.token);
          await dispatch(userApi.endpoints.getUser.initiate(null));
        } catch (error:any) {
          throw new Error(error.message?error.message:"Error occured  while logging in");
        }
      },
    }),
    registerUser: builder.mutation<
      GenericResponse,
      { email: string; password: string; name: string }
    >({
      query(userData: { email: string; password: string; name: string }) {
        return { url: "/user/signup", method: "POST", body: userData };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "/user/logout",
          credentials: "include",
        };
      },
    }),
  }),
});

// Action Creators
export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
} = authApi;
