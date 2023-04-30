require('dotenv').config();

const { UnauthorizedError } = require("../errors/errorsExport");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { JWT_SECRET } = process.env;

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