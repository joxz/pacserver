const express = require('express');
const networks = require('../controllers/networks.controller');

const router = express.Router();

// Create a new networks
router.post("/", networks.create);

// Retrieve all networks
router.get("/", networks.findAll);

// Retrieve a single network with id
router.get("/:id", networks.findOne);

// Update a network with id
router.put("/:id", networks.update);

// Delete a network with id
router.delete("/:id", networks.delete);

module.exports = router;
