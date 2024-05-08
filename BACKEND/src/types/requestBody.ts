import {Address} from "../models/Address.js"


export interface NewUserRequestBody{
    name:string,
    email:string,
    password:string
}

export interface NewProductRequestBody{
productName: string;
  qtyavailable: number;
  price: number;
  category: Array<string>;
  description?: string;
  colors?: Array<string>;
}

// export interface NewOrderResponseBody{
//     cartId, paymentId, status, shippingAddress 
// }



// export interface NewUserResponseBody{
//     name:string,
//     email:string,
//     profilePhoto:string,
//     address:Address[]
// }