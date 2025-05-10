import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    category: {
        type: String,
        required: true,
        enum:['consumable','non_consumable']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    images: {
        type: [String],
        validate: [
            {
                validator: function (arr) {
                    return arr.length >= 1 && arr.length <= 10;
                },
                message: "You must provide between 1 and 10 images.",
            },
            {
                validator: function (arr) {
                    return arr.every((url) =>
                        /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/i.test(url)
                    );
                },
                message: "Each image must be a valid image URL.",
            },
        ],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: [{
    type: mongoose.Types.ObjectId,
    ref: "Review"
}]
});

export default mongoose.model("Product", productSchema);
