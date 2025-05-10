import reviewSchema from '../models/review.model.js';
import asyncWrapper from '../utils/asyncWrapper.utils.js';
import productSchema from '../models/product.model.js';

const postReview = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await productSchema.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (!rating || !comment) {
        return res.status(400).json({ message: "Rating and comment are required." });
    }

    const hasPurchased = await Order.exists({
        user: userId,
        "orderItems.product": productId,
    });

    if (!hasPurchased) {
        return res
            .status(403)
            .json({ message: "You can only review products you have purchased." });
    }

    const existingReview = await reviewSchema.findOne({
        user: userId,
        product: productId,
    });
    if (existingReview) {
        return res
            .status(400)
            .json({ message: "You have already reviewed this product." });
    }

    const review = await reviewSchema.create({
        user: userId,
        product: productId,
        rating,
        comment,
    });

    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({ message: "Review added", review });
});

const editReview = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const { rating, comment } = req.body;
    const { productId, reviewId } = req.params;

    const product = await productSchema.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const review = await reviewSchema.findById(reviewId);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "You can only edit your own reviews." });
    }

    if (review.product.toString() !== productId) {
        return res.status(400).json({ message: "Review does not belong to the specified product." });
    }

    review.rating = rating;
    review.comment = comment;
    review.updatedAt = Date.now();
    await review.save();
    res.status(200).json({ message: "Review updated", review });
})

const deleteReview = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const { productId, reviewId } = req.params;
    const review = await reviewSchema.findById(reviewId);

    if (review.product.toString() !== productId) {
        return res.status(400).json({ message: "Review does not belong to the specified product." });
    }

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "You can only delete your own reviews." });
    }

    await reviewSchema.deleteOne({ _id: reviewId });
    await productSchema.updateOne({ review: reviewId }, { $unset: { review: "" } });

    res.status(200).json({ message: "Review deleted", deletedReview: review });
})

const getProductReviews = asyncWrapper(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const { productId } = req.params;

    const product = await productSchema
        .findById(productId)
        .skip(skip)
        .limit(limit)
        .populate("reviews")
        

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
        message: "Reviews fetched successfully",
        totalReviews: product.reviews.length,
        noOfData:limit,
        totalPages: Math.ceil(product.reviews.length / limit),
        reviews: product.reviews,
    });
});

const getReviews = asyncWrapper(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const reviews = await reviewSchema.find().skip(skip).limit(limit);
    if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found' });
    }
    return res.status(200).json({ message: 'Reviews found',
                                totalReviews: reviews.length,
                                pageNo:page,
                                noOfData:limit,
                                totalPages: Math.ceil(reviews.length / limit),
                                reviews:reviews,
                            });
})

const getSpecificReview = asyncWrapper(async (req, res) => {
    const {productId, reviewId } = req.params;
    
    const product = await productSchema.findById(productId);
    const review = await reviewSchema.findById({ productId, reviewId });
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review found', review });
})

export { postReview, editReview, deleteReview, getProductReviews, getReviews, getSpecificReview };