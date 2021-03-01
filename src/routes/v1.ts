import { Router } from 'express';
import UrlShornterRouteHandler from './urlShortner';

const router = Router();

router.get('/', function (_req, res, _next) {
  const message = { message: 'all is well' };
  return res.status(200).json(message);
});

router.use('/urlshortner', UrlShornterRouteHandler);
export default router;
