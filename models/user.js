const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (avatar) => validator.isURL(avatar),
      message: (props) => `${props.value} Эта строка должна быть ссылкой!`,
    },
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);
