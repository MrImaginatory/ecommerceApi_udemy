import { Router} from "express";
import { createCoupon, updateCoupon, deleteCoupon, viewCoupons, viewSpecificCoupon } from "../controllers/coupon.controller.js";
import checkToken from "../middlewares/token.middleware.js";

const couponRouter = Router();
couponRouter.use(checkToken)

couponRouter.route('/coupons').get(viewCoupons);
couponRouter.route('/createCoupon').post(createCoupon);
couponRouter.route('/couponDetails/:couponId').get(viewSpecificCoupon);
couponRouter.route('/updateCoupon/:couponId').put(updateCoupon);
couponRouter.route('/deleteCoupon/:couponId').delete(deleteCoupon);

export default couponRouter;