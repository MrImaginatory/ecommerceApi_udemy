import asyncWrapper from '../utils/asyncWrapper.utils.js';
import productSchema from '../models/product.model.js';
import orderSchema from '../models/order.model.js';
import couponSchema from '../models/coupon.model.js';


const createOrder = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const {
        orderItems = [],
        shippingAddress = {},
        paymentMethod,
        totalPrice,
        couponCode
    } = req.body;

    // Basic validations
    if (!orderItems.length) {
        return res.status(400).json({ message: "No order items" });
    }

    if (totalPrice < 1) {
        return res.status(400).json({ message: "Total price must be greater than 0" });
    }

    // Validate shipping address
    const { city, postalCode, country, address } = shippingAddress;
    if (!address || !city || !postalCode || !country) {
        return res.status(400).json({ message: "Complete address is required" });
    }

    if (country === 'India' && postalCode.length !== 6) {
        return res.status(400).json({ message: "Invalid Indian Postal Code" });
    }

    if (!paymentMethod) {
        return res.status(400).json({ message: "Payment Method is required" });
    }

    // Validate each order item and calculate total
    for (const item of orderItems) {
        const product = await productSchema.findById(item.product);
        if (!product) {
            return res.status(404).json({ message: `Product not found for ID ${item.product}` });
        }

        if (item.quantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        if (item.quantity > product.stock) {
            return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
        }
    }

    // Payment logic
    let isPaid = paymentMethod !== 'cod';

    // Coupon logic
    let discount = 0;
    let coupon;

    if (couponCode) {
        coupon =  await couponSchema.findOne({ code: couponCode });

        if(!coupon || coupon.length === 0) {
            return res.status(400).json({ message: "Invalid coupon code" });
        }

        if (coupon) {
            // Optional: Validate product category if your coupon is category-specific
            const allCategories = await productSchema.find({ _id: { $in: orderItems.map(i => i.product) } }).distinct("category");

            if (coupon.productType && !allCategories.includes(coupon.productType)) {
                return res.status(400).json({
                    message: `Coupon not valid for these product categories: ${coupon.productType}`
                });
            }

            // Optional: Additional checks
            if (coupon.expiryDate < new Date()) {
                return res.status(400).json({ message: "Coupon has expired" });
            }

            if (coupon.minOrderValue && totalPrice < coupon.minOrderValue) {
                return res.status(400).json({ message: "Order does not meet the minimum value for this coupon" });
            }

            if (coupon.discountType === 'percentage') {
                discount = (coupon.discountValue / 100) * totalPrice;
            } else if (coupon.discountType === 'fixed') {
                discount = coupon.discountValue;
            }

            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
                discount = coupon.maxDiscount;
            }
        }
    }

    const totalAmount = totalPrice - discount;

    const order = new orderSchema({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        totalAmount,
        isPaid,
        couponCode: coupon ? coupon._id : undefined
    });

    await order.save();

    res.status(201).json({ message: "Order Created Successfully", order });
});

const viewOrder = asyncWrapper(async (req, res) => {
    const orderId = req.params.orderId;
    const order = await orderSchema.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order Details", order });
});

const orders = asyncWrapper(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const orders = await orderSchema.find().skip((page - 1) * limit).limit(limit);

    if(!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ message: "Orders", totalOrders: orders.length, page: page, limit: limit, orders });
})

export { createOrder, viewOrder, orders };