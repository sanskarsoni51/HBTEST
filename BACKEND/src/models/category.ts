import mongoose, { Document, Schema } from 'mongoose';

export interface Category extends Document {
  name: string;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true, unique: true },
});

const CategoryModel = mongoose.model<Category>('Category', categorySchema);

export default CategoryModel;
