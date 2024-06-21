import { Router } from 'express';
import registerCompany from '../controllers/companyController';

const router = Router();

router.post('/api/companyregister', registerCompany);

export default router;
