import couponSchema from '../models/coupon.model.js';
import asyncWrapper from '../utils/asyncWrapper.utils.js';

const createCoupon = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';
    const { code,
            description, 
            discountType, 
            discountValue, 
            productType, 
            minOrderValue, 
            maxDiscount, 
            usageLimit, 
            expiryDate } = req.body;

    // console.log(code, description, discountType, discountValue, productType, minOrderValue, maxDiscount, usageLimit, expiryDate);

    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can create coupons' });
    }

    if (!code || !description || !discountType || !discountValue || !productType || !minOrderValue || !maxDiscount || !usageLimit || !expiryDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const coupon = new couponSchema({
        code: code,
        description: description,
        discountType: discountType,
        discountValue: discountValue,
        productType: productType,
        minOrderValue: minOrderValue,
        maxDiscount: maxDiscount,
        usageLimit: usageLimit,
        expiryDate: expiryDate,
        createdBy: userId,
    })
    await coupon.save();

    return res.status(201).json({ message: "Coupon Created Successfully", coupon });
})

const updateCoupon = asyncWrapper(async (req, res) => {
    const { code, 
            description, 
            discountType,
            discountValue, 
            productType, 
            minOrderValue,
            maxDiscount, 
            usageLimit, 
            isActive, 
            expiryDate } = req.body;

    const couponId = req.params.couponId;
    const isAdmin = req.user.role === 'admin';
    const userId = req.user._id;

    if (!couponId) {
        return res.status(400).json({ message: "Coupon ID is required" });
    }

    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can Edit Coupons' });
    }

    const coupon = await couponSchema.findById(couponId);
    if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
    }

    const updatedCoupon = await couponSchema.findByIdAndUpdate(couponId, {
        code: code,
        description: description,
        discountType: discountType,
        discountValue: discountValue,
        productType: productType,
        minOrderValue: minOrderValue,
        maxDiscount: maxDiscount,
        usageLimit: usageLimit,
        isActive: isActive,
        expiryDate: expiryDate,
        updatedBy: userId,
    }, { new: true });

    return res.status(201).json({ message: "Coupon Updated Successfully", updatedCoupon });
})

const deleteCoupon = asyncWrapper(async (req, res) => {
    const couponId = req.params.couponId;
    const isAdmin = req.user.role === 'admin';

    if (!couponId) {
        return res.status(400).json({ message: "Coupon ID is required" });
    }
    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can Delete coupons' });
    }
    const coupon = await couponSchema.findByIdAndDelete(couponId);
    return res.status(200).json({ message: "Coupon deleted successfully" });
})

const viewCoupons = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can view coupons' });
    }

    const coupons = await couponSchema.find({ createdBy: userId, isActive: true })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!coupons.length) {
        return res.status(404).json({ message: "No coupons found" });
    }

    return res.status(200).json({ message: "Coupons fetched successfully", 
                                TotalCoupons:coupons.length,
                                page: page,
                                limit: limit,
                                coupons: coupons });
})

const viewSpecificCoupon = asyncWrapper(async (req, res) => {
    const couponId = req.params.couponId;
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';
    if (!couponId) {
        return res.status(400).json({ message: "Coupon ID is required" });
    }
    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can view coupons' });
    }
    const coupon = await couponSchema.findById(couponId);
    if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({ message: "Coupon fetched successfully", coupon });
})

export { createCoupon, updateCoupon, deleteCoupon, viewCoupons, viewSpecificCoupon };