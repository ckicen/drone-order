const mongoose = require('mongoose');

const deliveryRouteSchema = new mongoose.Schema({
    droneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drone',
        required: true
    },
    startLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    endLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    estimatedDeliveryTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'canceled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

deliveryRouteSchema.index({ startLocation: '2dsphere' });
deliveryRouteSchema.index({ endLocation: '2dsphere' });

module.exports = mongoose.model('DeliveryRoute', deliveryRouteSchema);