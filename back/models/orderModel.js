import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: JSON, required: true },
    paymentMethod: { type: String, default: "COD" },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    orderId: { type: String, unique: true, required: true }, // Unique Order ID
    status: { type: String, default: "ordered" },
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;