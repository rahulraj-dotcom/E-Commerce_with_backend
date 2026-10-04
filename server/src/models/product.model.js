import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:2,
        maxLength:100
    },
    description:{
        type:String,
        required:true,
        minLength:20,
        maxLength:250
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const productModel = mongoose.model("products", productSchema)
export default productModel