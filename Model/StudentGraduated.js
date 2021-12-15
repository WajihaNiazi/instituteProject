const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const studentGraduatedSchema = new Schema({
    GraduatedClassName: {type: String, required: true},
    DepartmentName: {type: String, required: true},
    GraduatedYear:{type: Number, required: true},
    GovernmentalExam: {type:String, required: true},
    FinalAverage: {type: Number, required: true},
    GraduatedDegree: {type: Number, required: true}
});

module.exports = Mongoose.model("StudentGraduated", studentGraduatedSchema);