const mongoose = require('mongoose');

// Schema: decsribes the content of a database document
const ProductSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }
)

// Model
const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;