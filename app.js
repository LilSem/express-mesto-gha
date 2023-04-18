const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const {PORT = 3000} = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(`${DB_URL}/mestodb`);

app.use((req, res, next) => {
  req.user = { _id: '643c580a1e4bd947cf1d7e23' };
  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((error, req, res, next) => {
  const {statusCode = 500, message} = error;

  res.status(statusCode).send({message});
})

app.listen(PORT);