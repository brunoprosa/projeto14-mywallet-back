import {Router} from 'express';
import { postLogin } from '../controllers/postLogin.controller.js';

const loginRouter = Router();
loginRouter.get('/', postLogin);
export default loginRouter;