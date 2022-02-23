const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const flightSchema = new Schema({
    flightDate: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true }
}, { collection: 'flights' });

flightSchema.plugin(AutoIncrement, { inc_field: 'flightId' });

const Flight = model('Flight', flightSchema);
module.exports = Flight;