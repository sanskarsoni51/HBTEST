import mongoose, { Document, Schema } from 'mongoose';
import CategoryModel from './category.js';
import { autoIncrement } from "@alec016/mongoose-autoincrement";

// export interface Variant {
//   color: string;
//   images: string[];
// }

export interface Product extends Document {
  pid: number;
  qtyavailable: number;
  price: number;
  images: Array<string>;
  category: Array<string>;
  productName: string;
  description?: string;
  colors?: Array<string>;
  addedAt: Date;
}

export const productSchema = new Schema<Product>({
  pid: { type: Number, required: true, unique: true },
  productName: { type: String, required: true, unique:true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: [String], ref: 'Category', required: true , validate: {
    validator: async function(categories: string[]) {
      // Check if all categories in the array exist in the 'Category' collection
      console.log(categories);
      const categoryCount = await CategoryModel.countDocuments({ name: { $in: categories } });
      console.log(categoryCount);
      return categoryCount === categories.length; // Return true if all categories exist, false otherwise
    },
    message: 'One or more categories do not exist' // Error message if validation fails
  }},
  images: { type: [String] , default : [] },
  colors: { type: [String] , default : [] },
  addedAt: { type: Date, default: Date.now },
  qtyavailable: { type: Number, required: true },
},
{
  strict:'throw'
});
// Auto-increment plugin
// // Create a custom model method for auto-incrementing pid
// productSchema.statics.getNextPid = async function(): Promise<number> {
//   const lastDocument: Product | null = await this.findOne({}, {}, { sort: { 'pid': -1 } });
//   const lastPid: number = lastDocument ? lastDocument.pid : 0;
//   return lastPid + 1;
// };


const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
