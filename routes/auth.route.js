import { Router } from 'express';
import { login, register, logout, testRoute, verifyUser } from '../controllers/auth.controller.js';
import checkToken from '../middlewares/token.middleware.js';

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/register').post(register);
authRouter.route('/logout').post(logout);
authRouter.route('/verify').get(verifyUser);
authRouter.route('/test').get(checkToken,testRoute);

export default authRouter;