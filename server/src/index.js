import express from 'express';
import morgan from 'morgan';
import localAssetServer from './modules/local-asset-server';
import { clientVersionMiddleware } from './client';
import router from './router';

const app = express();

app.use(morgan('combined'))

app.use(clientVersionMiddleware);

app.set('port', process.env.PORT || 3000);

app.use(router);

app.listen(app.get('port'), () => {
  console.info(`Server listening on ${app.get('port')}`);
});

export default app;
