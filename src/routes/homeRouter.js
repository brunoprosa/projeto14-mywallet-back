import {Router} from 'express';
import { getHome } from '../controllers/getHome.controller.js';
import { deleteSession } from '../controllers/deleteSession.controller.js';

const homeRouter = Router();
homeRouter.get('/home', getHome);
homeRouter.delete('/home', deleteSession)
export default homeRouter;