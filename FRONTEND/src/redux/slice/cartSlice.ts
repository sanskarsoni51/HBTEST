import { CartSchema, ProductSchema, Variant, cartProducts } from "@/schema/schema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartSchema = {
  products: {},
  deliveryCharges: 0,
  gst: 0,
  totalQuantity: 0,
  totalPrice: 0,
  payablePrice: 0,
  address: [],
};



interface updateqty {
  id: string; // Use string to allow both productId and variant to form a unique key
  operation: "increment" | "decrement";
}

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: ProductSchema; variant: Variant }>) {
      const { product, variant } = action.payload;
      const cartKey = `${product.pid}-${variant.color}`;
    
      if (cartKey in state.products) {
        state.products[cartKey].quantity++;
        state.totalQuantity++;
        state.totalPrice += product.price;
      } else {
        state.products[cartKey] = {
          product,
          quantity: 1,
          variant,
        };
        state.totalQuantity++;
        state.totalPrice += product.price;
      }
    
      // Update delivery charges, GST, and payable price
      state.deliveryCharges = 59;
      state.gst = Math.round((4 / 100) * state.totalPrice + Number.EPSILON);
      state.payablePrice = state.totalPrice + state.deliveryCharges + state.gst;
    },
    

    updateQtyInCart(state, action: PayloadAction<updateqty>) {
      const { id, operation } = action.payload;
      const currentValue = state.products[id].quantity;

      switch (operation) {
        case "increment":
          state.products[id].quantity++;
          break;
        case "decrement":
          if (currentValue > 1) {
            state.products[id].quantity--;
          } else {
            delete state.products[id]; // Remove item if quantity is 1
          }
          break;
        default:
          console.log("Invalid Operation!");
      }

      state.totalQuantity = Object.values(state.products).reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = Object.values(state.products).reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    },

    setCart(state, action: PayloadAction<CartSchema>) {
      state.deliveryCharges = action.payload.deliveryCharges;
      state.gst = action.payload.gst;
      state.payablePrice = action.payload.payablePrice;
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, updateQtyInCart, setCart } = cartSlice.actions;
