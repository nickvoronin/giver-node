/**
 * Created by palzuncoff on 5/26/17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"usernameRequired"],
    maxlength:[32,"tooLong"],
    minlength:[3,"tooShort"],
    unique:true
  },
  hashedPassword:{
    type:String,
    // maxlength:[32,"tooLong"],
    // minlength:[3, "tooShort"],
    // match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
    required:[true,"passwordRequired"]
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

userSchema.virtual('userId')
  .get(function () {
    return this.id;
  });

userSchema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString('base64');
    //more secure - this.salt = crypto.randomBytes(128).toString('base64');
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


userSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};


/*// Befor the saving data run this function
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
    return isMatch;
  });
};*/


module.exports = mongoose.model('User', userSchema);