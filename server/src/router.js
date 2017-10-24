import express from 'express';
import ssrHandler from './modules/ssr';

const router = express.Router();

router.use('/*', ssrHandler);

export default router;
