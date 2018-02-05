import express from 'express';
import service from './service';

const router = express.Router();

router.get('/getProvince', service.download);

export default router;
