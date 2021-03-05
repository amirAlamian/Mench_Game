const mongoose = require('mongoose');

// Schema
const CafesSchema = mongoose.Schema({
    cafeId: {
        type: String,
        unique: true,
        required: [ true, 'Username is Required' ],
    },
    title: String,
    description: String,
}, { timestamps: true });


// Converting This To JSON Object
CafesSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

// Setuping Profile Schema
mongoose.model('Cafes', CafesSchema);
