const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getAllUsers, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:id', getUserById);
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/),
  }),
}), updateAvatar);

module.exports = routerUsers;
