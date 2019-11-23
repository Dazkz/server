require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const error = new AuthError('Ошибка авторизации');
    next(error);
  }

  req.user = payload;
  next();
};
