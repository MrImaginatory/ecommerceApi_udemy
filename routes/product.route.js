import {createProduct, deleteProduct, findProducts, updateProduct,findSingleProduct} from "../controllers/product.controller.js";
import { Router } from "express";
import checkToken from "../middlewares/token.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const productRouter = Router();

productRouter.use(checkToken);

productRouter.route('/create').post(upload.array('files', 10),createProduct);
productRouter.route('/products').get(findProducts);
productRouter.route('/update/:productId').put(upload.array('files', 10),updateProduct);
productRouter.route('/delete/:productId').delete(deleteProduct);
productRouter.route('/product/:productId').get(findSingleProduct);

export default productRouter;