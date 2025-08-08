const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    battery: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'in transit'],
        default: 'offline',
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    manufacturer: {
        type: String,
        required: true,
    },
    manufactureDate: {
        type: Date,
        required: true,
    },
    usageTime: {
        type: Number, // in hours
        required: true,
    },
});

// Create a 2dsphere index for geospatial queries
droneSchema.index({ location: '2dsphere' });

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;