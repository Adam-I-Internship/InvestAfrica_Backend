import { Router } from 'express';
import registerUser from '../controllers/userController';

const router = Router();

router.post('/api/userregister', registerUser);

export default router;
