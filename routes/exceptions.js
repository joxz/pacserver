const express = require('express');
const exceptions = require('../controllers/exceptions.controller');

const router = express.Router();

// Create a new networks
router.post("/", exceptions.create);

// Retrieve all networks
router.get("/", exceptions.findAll);

// Retrieve a single network with id
router.get("/:id", exceptions.findOne);

// Update a network with id
router.put("/:id", exceptions.update);

// Delete a network with id
router.delete("/:id", exceptions.delete);

module.exports = router;
