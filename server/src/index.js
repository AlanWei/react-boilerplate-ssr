import express from 'express';
import morgan from 'morgan';
import router from './router';

const app = express();

app.use(router);

app.listen(() => {
});

export default app;
