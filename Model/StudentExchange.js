const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const studentExchangeSchema = new Schema({

    FromWhichClassToWhichYear: {type: String},
    DepartmentNameConvert: {type: String},
    ToConvertedSchool:{type: String},
    Province: {type:String},
    ConvertedWrittenNumber: {type:Number },
    GraduatedClassName: {type: String },

    ClassNameAndYear: {type: String },
    DepartmentNameSeparation: {type: String },
    SeparationCause:{type: String },
    SeparationWrittenNumber: {type:Number },

    RegisterationClassName: {type: String },
    DepartmentNameRagister: {type: String},
    RegistrationYear:{type: Number},
    WrittenNumber: {type:Number},
    
    GraduatedYear:{type: Number},
    GovernmentalExam: {type:String},
    FinalAverage: {type: Number},
    GraduatedDegree: {type: Number},
    GraduatedWrittenNumber: {type:Number}
    
});

module.exports = Mongoose.model("StudentExchange", studentExchangeSchema);