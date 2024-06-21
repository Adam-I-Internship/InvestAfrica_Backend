import { Router } from 'express';
import loginAccount from '../controllers/loginController';

const router = Router();

router.post('/api/login', loginAccount);

export default router;
