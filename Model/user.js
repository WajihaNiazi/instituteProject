const Mongoose =require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      resetToken: String,
      resetTokenExpiration: Date,
});

module.exports = Mongoose.model("user", userSchema);