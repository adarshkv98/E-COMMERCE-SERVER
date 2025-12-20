import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        publishDate:{
            type:Number,
            default:0,
        },
        pageNumber:{
            type:Number,
        },
        stock:{
            type:Number,
            default:0,
        },
        image:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}
);

const Book = mongoose.model('Book',bookSchema);

export default Book;