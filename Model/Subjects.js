const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Subjects = new Schema({
  name:{type:String}
});

module.exports = Mongoose.model("Subjects", Subjects);