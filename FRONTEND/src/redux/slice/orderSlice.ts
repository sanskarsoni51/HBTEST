import { createSlice } from "@reduxjs/toolkit";
import { CreateOrderSchema } from "../api/orderApi";
import { CartSchema } from "@/schema/schema";

const initialState: CreateOrderSchema = {
  shippingAddress: null,
  paymentId: "1313",
  status: "pending",
};

const orderSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addAddress(state, action) {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentId = action.payload;
    },
    resetOrderDetails(state) {
      return initialState;
    },
  },
});

export default orderSlice.reducer;

export const { addAddress, resetOrderDetails, setPaymentMethod } =
  orderSlice.actions;
