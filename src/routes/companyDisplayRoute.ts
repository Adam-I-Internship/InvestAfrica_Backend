import { Router } from 'express';
import companyDisplay from '../controllers/companydisplayController';

const router = Router();

router.get('/api/companydisplay', companyDisplay);

export default router;
