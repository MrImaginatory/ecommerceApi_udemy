import { Router } from "express";
import checkToken from "../middlewares/token.middleware.js";
import { postReview, editReview, deleteReview, getProductReviews, getReviews, getSpecificReview } from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.use(checkToken);

reviewRouter.route('/product/:productId/postReview').post(postReview);
reviewRouter.route('/product/:productId/review/:reviewId').put(editReview);
reviewRouter.route('/product/:productId/review/:reviewId').delete(deleteReview);
reviewRouter.route('/product/:productId').get(getProductReviews);
reviewRouter.route('/productReview').get(getReviews)
reviewRouter.route('/product/:productId/review/:reviewId').get(getSpecificReview)

export default reviewRouter;