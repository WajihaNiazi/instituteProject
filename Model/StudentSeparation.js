const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const studentSeparationSchema = new Schema({
    ClassNameAndYear: {type: String, required: true},
    DepartmentName: {type: String, required: true},
    SeparationCause:{type: String, required: true},
    SeparationWrittenNumber: {type:Number, required: true}
});

module.exports = Mongoose.model("StudentSeparation", studentSeparationSchema);