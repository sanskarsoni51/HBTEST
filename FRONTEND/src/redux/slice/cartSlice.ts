import { CartSchema, ProductSchema, cartProducts } from "@/schema/schema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  cartApi,
  useManipulateQuantityMutation,
  useRemoveFromCartMutation,
} from "../api/cartApi";
import { toast } from "@/components/ui/use-toast";

const initialState: CartSchema = {
  products: {},
  deliveryCharges: 0,
  gst: 0,
  totalQuantity: 0,
  totalPrice: 0,
  payablePrice: 0,
};
interface updateqty {
  id: number;
  operation: "increment" | "decrement";
}
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductSchema>) {
      const productId = action.payload.pid;
      if (productId in state.products) {
        // If the product is already present then increment its quantity by one.
        state.totalQuantity++;
        state.totalPrice += state.products[productId].product.price;
        state.products[productId]["quantity"]++;
      } else {
        // Otherwise, Add new Product to the list with a default quantity of one.
        let newProduct: cartProducts = { product: action.payload, quantity: 1 };

        state.products[productId] = newProduct;
        state.totalQuantity++;
        state.totalPrice += newProduct.product.price;
      }
      state.deliveryCharges = 59;
      state.gst = Math.round((4 / 100) * state.totalPrice + Number.EPSILON);
      state.payablePrice = state.totalPrice + state.deliveryCharges + state.gst;
    },
    updateQtyInCart(state, action: PayloadAction<updateqty>) {
      const id: number = action.payload.id;
      const operation = action.payload.operation;
      const currentValue = state.products[id].quantity;
      switch (operation) {
        case "increment":
          if (currentValue < state.products[id].product.qtyavailable) {
            state.products[id]["quantity"]++;
            // dispatch(
            //   cartApi.endpoints.manipulateQuantity.initiate({
            //     itemId: id,
            //     quantity: currentValue + 1,
            //   }),
            // );
            // if (isSuccess) {
            //   toast({
            //     title: "Item added",
            //     duration: 2000,
            //   });
            // }
          } else {
            toast({
              title: "Item not in stock",
              variant: "destructive",
              duration: 2000,
            });
          }
          break;
        case "decrement":
          if (currentValue > 1) {
            state.products[id]["quantity"]--;
            // dispatch(
            //   cartApi.endpoints.manipulateQuantity.initiate({
            //     itemId: id,
            //     quantity: currentValue - 1,
            //   }),
            // );
          } else if (currentValue == 1) {
            delete state.products[action.payload.id];
            state.totalQuantity--;
            state.totalPrice -= state.products[action.payload.id].product.price;
          }
          break;
        default:
          console.log("Invalid Operation!");
      }
      state.totalPrice = Object.values(state.products).reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      );
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
// Action creators
export const { addToCart, updateQtyInCart, setCart } =
  cartSlice.actions;
