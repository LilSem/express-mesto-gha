const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { NotFoundError } = require('./errors/errorsExport');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(require('./routes/login'));

app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use(errors());

app.use(() => {
  throw new NotFoundError('Маршрут не найден :( ');
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : error.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
