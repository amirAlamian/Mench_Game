const mongoose = require('mongoose');

// Schema
const ShopSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    dices: {
        type: Array,
    },
    avatars: {
        type: Array,
    },
    powerUps: {
        type: Array,
    },
    nuts: {
        type: Array,
    },
    currencyItems: {
        type: Array,
    },
}, { timestamps: true });


// Converting This To JSON Object
ShopSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.userId;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

// Setuping Profile Schema
module.exports = mongoose.model('shopModel', ShopSchema, 'shop');
