import express from 'express';
export default function (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
}
