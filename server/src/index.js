const express = require('express');
const morgan = require('morgan');
const { clientVersionMiddleware } = require('./client');
const router = require('./router');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const IS_PROD = ENV === 'production';

const app = express();
const logger = morgan(IS_PROD ? 'common' : 'dev');

app.use(logger);
app.use(clientVersionMiddleware);
app.get('/assets/*', (req, res) => {
  const file = req.params[0] ? req.params[0] : 'index.html';
  res.sendFile(`assets/${file}`, {
    root: res.locals.clientFolders.CLIENT_FOLDER,
  });
});

app.use(router);

app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}`);
});

module.exports = app;
