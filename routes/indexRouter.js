import { Router } from 'express';
import cadastroRouter from './cadastroRouter.js';
import homeRouter from './homeRouter.js';
import loginRouter from './loginRouter.js';
import novaTransacaoRouter from './novaTransacaoRouter.js';

const router = Router()

router.use(cadastroRouter)
router.use(homeRouter)
router.use(loginRouter)
router.use(novaTransacaoRouter)

export default router