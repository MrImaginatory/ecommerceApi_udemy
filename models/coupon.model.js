import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type: String,
        required:true,
        minlength:2,
        maxlength:50,
        trim: true
    },
    discountType:{
        type:String,
        enum:['percentage','fixed'],
        required:true,
    },
    discountValue:{
        type:Number,
        required:true,
    },
    productType:{
        type:String,
        enum: ["Consumable","NonConsumable"],
    },
    minOrderValue:{
        type:Number,
        default:0,
    },
    maxDiscount:{
        type:Number,
        default:null,
    },
    usageLimit:{
        type:Number,
        default:1,
    },
    expiryDate:{
        type:Date,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    }
},{timestamps:true});

export default mongoose.model("Coupon",couponSchema);