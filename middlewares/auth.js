require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/errorsExport');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};
