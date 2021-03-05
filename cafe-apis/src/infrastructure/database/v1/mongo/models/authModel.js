const mongoose = require('mongoose');
const AuthSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    playCount: {
        type: Number,
    },
}, { timestamps: true });


module.exports = mongoose.model('authModel', AuthSchema, 'auth');
