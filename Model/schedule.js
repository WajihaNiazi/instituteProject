const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const schedule = new Schema({
    chosenClass:String,
    day:String,
    firstHourSubject:String,
    firstHourTeacher:String,
    secondHourSubject:String,
    secondHourTeacher:String,
    thirdHourSubject:String,
    thirdHourTeacher:String,
    fourthHourSubject:String,
    fourthHourTeacher:String,
    fifthHourSubject:String,
    fifthHourTeacher:String,
    sixthHourSubject:String,
    sixthHourTeacher:String
});

module.exports = Mongoose.model("schedule", schedule);