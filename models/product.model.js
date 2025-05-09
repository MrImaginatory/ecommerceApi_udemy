import mongoose from "mongoose";

const productSchema = new mongoose.Schema({});

export default mongoose.model("Product",productSchema);