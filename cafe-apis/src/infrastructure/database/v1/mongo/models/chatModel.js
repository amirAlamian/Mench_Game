const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
    userA: {
        type: String,
    },
    userB: {
        type: String,
    },
    chats: {
        type: Object,
    },
}, { timestamps: true });


module.exports = mongoose.model('chatModel', ChatSchema, 'chat');
