import {Router} from 'express';
import { postLogin } from '../controllers/postLogin.controller.js';

const loginRouter = Router();
loginRouter.post('/', postLogin);
export default loginRouter;