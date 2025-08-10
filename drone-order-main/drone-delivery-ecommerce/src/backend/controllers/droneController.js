const Drone = require('../models/Drone');
const DeliveryRoute = require('../models/DeliveryRoute');

// Get all drones
exports.getAllDrones = async (req, res) => {
    try {
        const drones = await Drone.find();
        res.status(200).json(drones);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving drones', error });
    }
};

// Get a single drone by ID
exports.getDroneById = async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id);
        if (!drone) {
            return res.status(404).json({ message: 'Drone not found' });
        }
        res.status(200).json(drone);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving drone', error });
    }
};

// Create a new drone
exports.createDrone = async (req, res) => {
    const { name, image, battery, status, location, manufacturer, manufactureDate, usageTime } = req.body;

    const newDrone = new Drone({
        name,
        image,
        battery,
        status,
        location,
        manufacturer,
        manufactureDate,
        usageTime
    });

    try {
        const savedDrone = await newDrone.save();
        res.status(201).json(savedDrone);
    } catch (error) {
        res.status(500).json({ message: 'Error creating drone', error });
    }
};

// Update a drone
exports.updateDrone = async (req, res) => {
    try {
        const updatedDrone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDrone) {
            return res.status(404).json({ message: 'Drone not found' });
        }
        res.status(200).json(updatedDrone);
    } catch (error) {
        res.status(500).json({ message: 'Error updating drone', error });
    }
};

// Delete a drone
exports.deleteDrone = async (req, res) => {
    try {
        const deletedDrone = await Drone.findByIdAndDelete(req.params.id);
        if (!deletedDrone) {
            return res.status(404).json({ message: 'Drone not found' });
        }
        res.status(200).json({ message: 'Drone deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting drone', error });
    }
};

// Get delivery routes for a drone
exports.getDroneRoutes = async (req, res) => {
    try {
        const routes = await DeliveryRoute.find({ droneId: req.params.id });
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving delivery routes', error });
    }
};