const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const departmentName = new Schema({
    name : {type: String},
    
});

module.exports = Mongoose.model("Departments", departmentName);