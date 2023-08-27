import {Router} from 'express';
import { postTransacao } from '../controllers/postTransacao.controller.js';

const novaTransacaoRouter = Router();
novaTransacaoRouter.get('/nova-transacao/:tipo', postTransacao);
export default novaTransacaoRouter;