import { Router } from 'express';
import UrlShornterRouteHandler from './urlShortner';

const router = Router();

// In the future, this would be changed to another router handling version two
router.use('/urlshortner', UrlShornterRouteHandler);
export default router;
