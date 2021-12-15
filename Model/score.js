const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Score = new Schema({
  s_id:{
      type:Schema.Types.ObjectId,
      ref:'StudentRegistration',
  },
  year:String,
  class:String,
  semester:String,
  scores:[{
    subject: String,
    score: Number
  }],
  sum:Number,
  average:Number
  
});
// Score.methods.updatescore=function(db_id){
//     const students = this.scores.findIndex(st => {
//       return st.s_id.toString() === db._id.toString();
//     });  
// }
module.exports = Mongoose.model("result", Score);




// const Score = new Schema({
//   s_id:{
//       type:Schema.Types.ObjectId,
//       ref:'StudentRegistration',
//   },
//   year:Number,
//   class:Number,
//   semester:Number,
//   score:[],
//   sum:Number,
//   average:Number

// const Score = new Schema({
//   department:String,
//   semester:Number,
//   subject:[]
// });
// // subject:[{Subject:String,
// //   Score:Number}]
