import mongoose, { Schema } from 'mongoose';
import { addressSchema } from './Address.js';
const orderSchema = new Schema({
    orderId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    paymentId: { type: String, required: true },
    status: { type: String, enum: ['Order Placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'Order Placed' },
    shippingAddress: addressSchema,
    createdAt: { type: Date, default: Date.now() } // Default to current date/time
});
// Middleware to set orderId field to match _id field before saving
orderSchema.pre('save', function (next) {
    // Check if orderId is not already set
    if (!this.orderId) {
        // Set orderId to match _id
        this.orderId = this._id;
        console.log("orderid " + this.orderId);
    }
    next();
});
const Order = mongoose.model('Order', orderSchema);
export default Order;
