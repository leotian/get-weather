import express from 'express';
import service from './service';

const router = express.Router();

router.get('/getWeather/:date', service.download);
router.get('/getForecast/', service.downloadForecast);

export default router;
