import mongoose, { Schema } from 'mongoose';
const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
});
const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;
