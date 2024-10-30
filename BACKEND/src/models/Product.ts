import mongoose, { Document, Schema } from 'mongoose';
import CategoryModel from './category.js';
import { log } from 'node:console';

export interface Variant {
  color: string;
  stock: number;
}

export interface Product extends Document {
  pid: number;
  qtyavailable?: number;
  price: number;
  images: Array<string>;
  category: string;
  subCategory?:string
  productName: string;
  description?: string;
  variants: Variant[];
  status: 'active'| 'deactive' | 'draft';
  totalSales?: number;
  addedAt: Date;
  modifiedAt: Date;
}

export const productSchema = new Schema<Product>({
  pid: { type: Number, required: true, unique: true },
  productName: { type: String, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },  // Define without validation first
  subCategory: { type: String },
  images: { type: [String] , default : [] },
  variants: [{
      color: { type: String, required: true },
      stock: { type: Number, required: true }
    }],
  status:{ type: String, enum:['active', 'deactive','draft'] , default: 'active'},
  totalSales: { type: Number , default :0},
  qtyavailable: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
},
{
  strict:'throw'
});

// Add validation logic separately
// productSchema.path('category').validate({
//   validator: async function (categoryName: string) {
//     const category = await CategoryModel.findOne({ name: categoryName });
//     return !!category;
//   },
//   message: 'Category does not exist'
// });

// productSchema.path('subCategory').validate({
//   validator: async function (subCategoryName: string) {
//     console.log(`Validating subCategory: ${subCategoryName} under category: ${this.category}`);
//     const category = await CategoryModel.findOne({ name: this.category});
    
//     console.log(category);
//     return category && category.subCategory.includes(subCategoryName);
//     // return !!category;
//   },
//   message: 'Subcategory does not exist under the provided category'
// });

productSchema.pre('validate', async function (next) {
  if (this.category) {
    // Validate category
    const category = await CategoryModel.findOne({ name: this.category });
    if (!category) {
      return next(new Error('Category does not exist'));
    }
  }
  
  if (this.subCategory) {
    // Validate subCategory
    const category = await CategoryModel.findOne({ name: this.category });
    if (category && category.subCategory) {
      if (!category.subCategory.includes(this.subCategory)) {
        return next(new Error('Subcategory does not exist under the provided category'));
      }
    } else {
      return next(new Error('Category does not exist for the given subcategory'));
    }
  }
  
  next();
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
