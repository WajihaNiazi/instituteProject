const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const staffRegister = new Schema({
    name: {type: String, required: true},
    Lastname:{type: String, required: true},
    Fathername:{type: String, required: true},
    grandFather:{type: String, required: true},
    currentJob:{type: String, required: true},
    major:{type: String, required: true},
    degree:{type: String, required: true},
    yearsOfWorking:{type: String},
    position:{type: String},
    step:{type: String}
});

module.exports = Mongoose.model("staff", staffRegister);