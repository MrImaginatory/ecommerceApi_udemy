import { Router } from "express";
import {createOrder,updateOrder, viewOrder, orders} from "../controllers/order.controller.js";
import checkToken from "../middlewares/token.middleware.js";

const orderRouter = Router();
orderRouter.use(checkToken);

orderRouter.route('/createOrder').post(createOrder);
orderRouter.route('/updateOrder/:orderId').put(updateOrder);
orderRouter.route('/viewOrder/:orderId').get(viewOrder);
orderRouter.route('/orders').get(orders);

export default orderRouter;