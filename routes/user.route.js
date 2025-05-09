import { Router } from "express";
import updateUser from "../controllers/user.controller.js";
import uploadSingle from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route('/update/:id').put(uploadSingle.single('profileImage'), updateUser);

export default userRouter;