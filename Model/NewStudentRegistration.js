const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const studentGraduatedSchema = new Schema({
    RegisterationClassName: {type: String, required: true},
    DepartmentName: {type: String, required: true},
    RegistrationYear:{type: Number, required: true},
    WrittenNumber: {type:Number, required: true}
});

module.exports = Mongoose.model("StudentGraduated", studentGraduatedSchema);