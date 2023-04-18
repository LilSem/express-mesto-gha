const User = require('../models/user');

const {BadRequestError, NotFoundError} = require("../errors/errorsExport");


const getAllUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({users}))
    .catch(err => next(err));
}

const getUser = (req, res, next) => {
  const {userId} = req.params;

  User.findById(userId)
    .then(user => {
      res.send({user})
    })
    .catch(err => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Пользователь по указанному _id не найден.'))
      }
      next(err)
    })
}

const createUser = (req, res, next) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({user}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'))
      }
      next(err)
    })
}

const updateUser = (req, res, next) => {
  const {name, about} = req.body;

  User.findByIdAndUpdate(req.user._id, {name, about},
    {
      new: true,
      runValidators: true
    })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'))
      }
      next(err)
    })
}

const updateAvatar = (req, res, next) => {
  const {avatar} = req.body;

  User.findByIdAndUpdate(req.user._id, {avatar},
    {
      new: true,
      runValidators: true
    })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'))
      }
      next(err)
    })
}


module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
};