const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    battery: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'out of stock'],
        default: 'available'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    manufacturer: {
        type: String,
        required: true
    },
    manufactureDate: {
        type: Date,
        required: true
    },
    usageTime: {
        type: Number, // in hours
        required: true
    }
}, {
    timestamps: true
});

// Create a geospatial index for location
productSchema.index({ location: '2dsphere' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;