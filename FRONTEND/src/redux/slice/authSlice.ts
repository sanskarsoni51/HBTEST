import { userSchema } from "@/schema/schema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  authState: boolean;
  user: userSchema;
}

const initialState: IAuthState = {
  authState: false,
  user: {
    name: "",
    email: "",
    password: "",
    address: [],
    profilePhoto: "",
    role: "user",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<userSchema>) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.address = action.payload.address;
      state.user.profilePhoto = action.payload.profilePhoto;
      state.user.address = action.payload.address;
      state.user.role = action.payload.role;
    },
  },
});

export const { setAuthState, setAuthUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
