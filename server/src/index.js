import express from 'express';
import morgan from 'morgan';
import { clientVersionMiddleware, clientAssetsMiddleware } from './client';
import router from './router';

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const IS_PROD = ENV === 'production';

const app = express();

app.use(morgan(IS_PROD ? 'common' : 'dev'));
app.use(clientVersionMiddleware);
app.get('/assets/*', (req, res) => {
  const file = req.params[0] ? req.params[0] : 'index.html';
  res.sendFile(`assets/${file}`, {
    root: res.locals.clientFolders.CLIENT_FOLDER,
  });
});

app.use(router);

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info(`Server listening on ${app.get('port')}`);
});

export default app;
