const express = require('express');
const proxy = require('../controllers/getproxy.controller');

const router = express.Router();

// Find proxy for IP
router.get("/", proxy.find);

module.exports = router;