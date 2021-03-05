const mongoose = require('mongoose');
const crypto = require('crypto');

// Schema
const userModel = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    hash: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    deviceId: {
        type: String,
    },
    inviteCode: {
        type: String,
    },
    salt: {
        type: String,
    },
    score: {
        type: Number,
        default: 0,
    },
    lastWeekScore: {
        type: Number,
        default: 0,
    },
    weeklyScoreChange: {
        type: Number,
        default: 0,
    },
    matches: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
    loses: {
        type: Number,
        default: 0,
    },
    coin: {
        type: Number,
        default: 600,
    },
    gem: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        default: 'User',
    },
    friendsUsername: {
        type: Array,
    },
    pendingFriends: {
        type: Array,
    },
    requestFriends: {
        type: Array,
    },
    avatarIndex: {
        type: Number,
        default: 0,
    },

}, { minimize: false }, { timestamps: true });


// Hashing Password
userModel.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};


// Checking Password
userModel.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return hash === this.hash;
};

// Generating Invite Code
userModel.methods.setInviteCode = function () {
    this.inviteCode = crypto.randomBytes(4).toString('hex');
};


// Converting This To JSON Object
userModel.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.hash;
    delete obj.salt;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

userModel.methods.toAbstract = function (rank) {
    const obj = this.toObject();
    obj.rank = rank;
    delete obj.deviceId;
    delete obj.friendsUsername;
    delete obj.pendingFriends;
    delete obj.requestFriends;
    delete obj.hash;
    delete obj.salt;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};


// Converting This To JSON Object
userModel.methods.toLeaderboard = function (rank) {
    const obj = this.toObject();
    obj.rank = rank;
    delete obj.phoneNumber;
    delete obj.deviceId;
    delete obj.inviteCode;
    delete obj.email;
    delete obj.friendsUsername;
    delete obj.pendingFriends;
    delete obj.requestFriends;
    delete obj.hash;
    delete obj.salt;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};


// Setuping Profile Schema
module.exports = mongoose.model('userModel', userModel, 'users');
