import {Router} from 'express';
import { postCadastro } from '../controllers/postCadastro.controller.js';

const cadastroRouter = Router();
cadastroRouter.post('/cadastro', postCadastro);
export default cadastroRouter;