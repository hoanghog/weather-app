import express from 'express';
import WeatherService from '#v1-services/weather-service';

import { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await WeatherService.getByAddress(
    req.query.address as string,
    req.query.type as 'factual' | 'tabloid',
    req.query.language as 'sk' | 'en'
  );
  return res.json(result);
});

export default router;
