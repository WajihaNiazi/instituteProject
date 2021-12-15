const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const FS5 = new Schema({
    quantity: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true}
});

module.exports = Mongoose.model("FS5-equipments", FS5);