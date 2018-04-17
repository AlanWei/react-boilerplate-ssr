const express = require('express');
const ssr = require('./modules/ssr');
const mock = require('./modules/mock');

const router = express.Router();
router.use('/message', mock);
router.use('/*', ssr);

module.exports = router;
