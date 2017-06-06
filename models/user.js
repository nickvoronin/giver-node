/**
 * Created by palzuncoff on 5/26/17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


let userSchema = new mongoose.Schema({
  // Логин
  email:{
    type:String, // тип: String
    required:[true,"usernameRequired"],
    // Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
    maxlength:[32,"tooLong"],
    // Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
    minlength:[6,"tooShort"],
    // Слишком короткий Логин!
    unique:true // Оно должно быть уникальным
  },
  // Пароль
  password:{
    type:String, // тип String
    // В дальнейшем мы добавим сюда хеширование
    maxlength:[32,"tooLong"],
    minlength:[8, "tooShort"],
    match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"],
    required:[true,"passwordRequired"]
    // Думаю здесь все уже очевидно
  },
  // Здесь будут и другие поля, но сейчас еще рано их сюда ставить!
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
  })
}

module.exports = mongoose.model('User',userSchema);