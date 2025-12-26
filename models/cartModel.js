import mongoose from "mongoose";
import User from "./userModel.js";

const cartSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,

                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {timestamps:true}
);

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;


