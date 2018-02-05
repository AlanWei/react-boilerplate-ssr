const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dnsPrefetchControl = require('dns-prefetch-control');
const hidePoweredBy = require('hide-powered-by');
const hsts = require('hsts');
const ieNoOpen = require('ienoopen');
const noSniff = require('dont-sniff-mimetype');
const xssFilter = require('x-xss-protection');
const { clientVersionMiddleware } = require('./client');
const router = require('./router');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const IS_PROD = ENV === 'production';

const app = express();

app.use(dnsPrefetchControl({allow: false}));
app.use(hidePoweredBy());
app.use(hsts());
app.use(ieNoOpen());
app.use(noSniff());
app.use(xssFilter({setOnOldIE: true}));

app.use(cookieParser());
app.use(morgan(IS_PROD ? 'common' : 'dev'));

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
