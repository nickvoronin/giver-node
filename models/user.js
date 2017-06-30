/**
 * Created by palzuncoff on 5/26/17.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const Partner = require('./partner');


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"usernameRequired"],
    unique:true
  },
  hashedPassword:{
    type:String,
    required:[true,"passwordRequired"]
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String
  },
  email: {
    type: String,
    minlength:[5,"tooShort"],
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  fullName: {
    type: String
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
  }
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
//   return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
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


module.exports = mongoose.model('User', userSchema);
