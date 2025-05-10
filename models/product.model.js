import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:2,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength:2,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Consumable","NonConsumable"],
    },
    image: {
        type: [String],
        required: true,
        validate: [array => array.length > 0, 'At least one image is required']
    },
    company:{
        type: String,
        required: true
    }
});

export default mongoose.model("Product",productSchema);