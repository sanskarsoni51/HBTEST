export interface userSchema {
  // uid: number;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
  address: Address[];
  role: "admin" | "user" | "none";
}
export interface CartProductSchema {
  pid: number;
  qtyavailable: number;
  price: number;
  category: Array<string>;
  subCategory: string;
  images: Array<string>;
  productName: string;
  description?: string;
  // colors?: Array<string>;
  variant: Variant[];
}

export interface ProductSchema {
  pid: number;
  qtyavailable: number;
  price: number;
  category: Array<string>;
  images: Array<string>;
  productName: string;
  description?: string;
  colors?: Array<string>;
  variants: Variant[];
}
export interface Variant {
  color: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
}

export interface cartProducts {
  product: CartProductSchema;
  quantity: number;
  variant: { color: string };
}

export interface CartSchema {
  products: {
    [productId: number]: cartProducts;
  };
  deliveryCharges: number;
  gst: number;
  totalQuantity: number;
  totalPrice: number;
  payablePrice: number;
  address: Address; // Add the address property here
}

export interface CustomerSchema {
  isLoggedIn: boolean;
  data: {
    uid: number;
    cart: CartSchema;
    fav: Array<ProductSchema>;
  };
}
export interface AdminSchema {
  isLoggedIn: boolean;
  products: Array<ProductSchema>;
  orders: Array<OrderSchema>;
  customers: Array<userSchema>;
  // ... other basic properties
}

export interface AppPropsSchema {
  bestseller: Array<ProductSchema>;
  NewCommers: Array<ProductSchema>;
  Products: Array<ProductSchema>;
}

export interface OrderSchema {
  id: number;
  status: string;
  products: Array<string>;
  totalAmount: number;
}
