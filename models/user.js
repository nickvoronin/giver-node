/**
 * Created by palzuncoff on 5/26/17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


let userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:[true,"usernameRequired"],
    maxlength:[32,"tooLong"],
    minlength:[3,"tooShort"],
    unique:true
  },
  password:{
    type:String,
    maxlength:[32,"tooLong"],
    minlength:[4, "tooShort"],
    match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
    required:[true,"passwordRequired"]
  },
  created: {
    type: Date,
    default: Date.now
  }
});


// Befor the saving data run this function
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function (candidatePasword, callback) {
  bcrypt.compare(candidatePasword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);