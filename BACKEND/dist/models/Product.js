var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from 'mongoose';
import CategoryModel from './category.js';
export const productSchema = new Schema({
    pid: { type: Number, required: true, unique: true },
    productName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: [String], ref: 'Category', required: true, validate: {
            validator: function (categories) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Check if all categories in the array exist in the 'Category' collection
                    console.log(categories);
                    const categoryCount = yield CategoryModel.countDocuments({ name: { $in: categories } });
                    console.log(categoryCount);
                    return categoryCount === categories.length; // Return true if all categories exist, false otherwise
                });
            },
            message: 'One or more categories do not exist' // Error message if validation fails
        } },
    images: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    addedAt: { type: Date, default: Date.now },
    qtyavailable: { type: Number, required: true },
}, {
    strict: 'throw'
});
// Auto-increment plugin
// // Create a custom model method for auto-incrementing pid
// productSchema.statics.getNextPid = async function(): Promise<number> {
//   const lastDocument: Product | null = await this.findOne({}, {}, { sort: { 'pid': -1 } });
//   const lastPid: number = lastDocument ? lastDocument.pid : 0;
//   return lastPid + 1;
// };
const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
