import { Router } from 'express';
import { Redirect, AddUrl } from '../controllers/urlShortnerController';

const router = Router();

router.post('/', AddUrl);
router.get('/', Redirect);

export default router;
