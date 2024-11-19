import express from 'express';
import WeatherService from '#v1-services/weather-service';
import Validator from '#v1-validator';

import { Request, Response } from 'express';
const router = express.Router();

router.get('/historical', Validator.validateQuery('weather', 'getHistorical'), async (req: Request, res: Response) => {
  const result = await WeatherService.getHistorical(
    req.query.location as string,
    req.query.date as unknown as Date,
    req.query.type as 'factual' | 'tabloid',
    req.query.language as 'sk' | 'en'
  );
  return res.json(result);
});

router.get('/', Validator.validateQuery('weather', 'get'), async (req: Request, res: Response) => {
  const result = await WeatherService.get(
    req.query.location as string,
    req.query.type as 'factual' | 'tabloid',
    req.query.language as 'sk' | 'en'
  );
  return res.json(result);
});

export default router;
