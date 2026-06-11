const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    location: String,
    date: Date,
    description: String,
    category: String,
});

module.exports = mongoose.model('Event', EventSchema);