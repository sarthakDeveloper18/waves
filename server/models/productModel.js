const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: 1,
        maxlength: 100
    },
    description: {
        type: String, 
        required: true,
        maxlength: 100000
    },
    price: {
        type: Number, 
        required: true,
        maxlength: 255
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    wood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wood',
        required: true
    },
    frets: {
        required: true,
        type: Number
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        type: Boolean,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    available: {
        required: true,
        type: Boolean
    },
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = {Product}