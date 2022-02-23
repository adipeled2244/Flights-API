const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userIdCard: { type: Number, required: true },
    userName: { type: String, required: true },
    userType: { type: String, required: true },
    userKey: { type: Number },
    userDateTimeKey: { type: Number },
}, { collection: 'users' });

const User = model('User', userSchema);
module.exports = User;