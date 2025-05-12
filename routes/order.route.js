import { Router } from "express";
import {createOrder, viewOrder, orders} from "../controllers/order.controller.js";
import checkToken from "../middlewares/token.middleware.js";

const orderRouter = Router();
orderRouter.use(checkToken);

orderRouter.route('/createOrder').post(createOrder);
orderRouter.route('/viewOrder/:orderId').get(viewOrder);
orderRouter.route('/orders').get(orders);

export default orderRouter;