const express = require('express');
const ssr = require('./modules/ssr');

const router = express.Router();
router.use('/*', ssr);

module.exports = router;
