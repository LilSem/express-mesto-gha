require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/errorsExport');

module.exports = (req, res, next) => {
  const { JWT_SECRET } = process.env || 'bc4483042d6a57a978c87a786aa9a8aa4d0ed0657cdd5c927dc290a68fc96bfe';

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};
