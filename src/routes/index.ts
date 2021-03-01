import { Router } from 'express';
import VersionOneHandler from './v1';
import VersionTwoHandler from './v2';

const router = Router();

router.use('/v1', VersionOneHandler);
router.use('/v2', VersionTwoHandler);
export default router;
