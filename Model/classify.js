const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const classify = new Schema({
    nameOfBaseNumber:String,
    nameOfClass:String
});

module.exports = Mongoose.model("Classify", classify);