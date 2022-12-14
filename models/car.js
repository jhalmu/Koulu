// Mongo conn
const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var CarSchema = new Schema(
    {
        brand: { type: String, required: true, maxlenght: 50 },
        model: { type: String, required: true, maxlenght: 50 },
        color: { type: String, required: true, maxlenght: 50 },
        year: { type: Number, required: true }
    }
);

//Export model
module.exports = mongoose.model('Car', CarSchema)