const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const className = new Schema({
    nameOfClass:String
});

module.exports = Mongoose.model("Classes", className);