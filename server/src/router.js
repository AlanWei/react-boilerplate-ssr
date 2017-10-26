import express from 'express';
import ssr from './modules/ssr';

const router = express.Router();

router.use('/*', ssr);

export default router;
