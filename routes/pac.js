const express = require('express');
const router = express.Router();
const pac = require('../controllers/pac.controller');

router.get("/", pac);

module.exports = router;
