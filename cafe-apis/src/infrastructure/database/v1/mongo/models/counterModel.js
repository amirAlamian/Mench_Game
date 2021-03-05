const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    collectionName: {
        type: String,
        required: true,
        enum: [ 'users' ],
    },
    nextId: {
        type: Number,
        required: true,
        default: 100, // reserve first ids for special users
    },
});

const model = mongoose.model('counter', schema);

module.exports = model;
