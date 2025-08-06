const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');
const { admin } = require('../middleware/admin');

// Get all drones
router.get('/', droneController.getAllDrones);

// Get a specific drone by ID
router.get('/:id', droneController.getDroneById);

// Create a new drone
router.post('/', admin, droneController.createDrone);

// Update an existing drone
router.put('/:id', admin, droneController.updateDrone);

// Delete a drone
router.delete('/:id', admin, droneController.deleteDrone);

// Get delivery routes for a specific drone
router.get('/:id/routes', droneController.getDroneRoutes);

module.exports = router;