// addressSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "@/schema/schema";

interface AddressState {
  addresses: Address[];
}

const initialState: AddressState = {
  addresses: [], // Initialize with an empty list or fetch from local storage if needed
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addNewAddress(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
      // Optional: Save to local storage
      localStorage.setItem("addresses", JSON.stringify(state.addresses));
    },
    loadAddressesFromStorage(state) {
      const savedAddresses = localStorage.getItem("addresses");
      if (savedAddresses) {
        state.addresses = JSON.parse(savedAddresses);
      }
    },
  },
});

export const { addNewAddress, loadAddressesFromStorage } = addressSlice.actions;
export default addressSlice.reducer;
