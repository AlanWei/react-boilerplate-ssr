import express from 'express';
import morgan from 'morgan';
import localAssetServer from './modules/local-asset-server';
import { clientVersionMiddleware } from './client';
import router from './router';

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('combined'))
app.use(clientVersionMiddleware);

if (process.env.NODE_ENV !== 'production') {
  app.get('/assets/*', localAssetServer);
}

app.use(router);

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info(`Server listening on ${app.get('port')}`);
});

export default app;
