const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour name is required'],
        unique: true,
    },
    duration: {
        type: String,
        required: [true, "Duration is required"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "Max group size is required"]
    },
    difficulty: {
        type: String,
        required: [true, "Difficulty is required"]
    },
    ratingsAverage: {
        type: Number,
        default: 3.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    priceDiscount: {
        type: Number,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "Summary is required"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover:{
        type: String,
        required: [true, "Image cover is required"]
    },
    images: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]


});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour