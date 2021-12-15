const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const studentConversionSchema = new Schema({
    FromWhichClassToWhichYear: {type: String, required: true},
    DepartmentName: {type: String, required: true},
    ToConvertedSchool:{type: String, required: true},
    Province: {type:String, required: true},
    ConvertedWrittenNumber: {type:Number, required: true}
});

module.exports = Mongoose.model("StudentConversion", studentConversionSchema);