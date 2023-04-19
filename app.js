const express = require('express');
const mongoose = require('mongoose');
const { NotFoundError } = require('./errors/errorsExport');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '643c580a1e4bd947cf1d7e23' };
  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use(() => {
  throw new NotFoundError('Маршрут не найден :( ');
});

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({ message });

  next();
});

app.listen(PORT);
