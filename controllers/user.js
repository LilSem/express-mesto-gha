const User = require('../models/user');

const {BadRequestError, NotFoundError} = require("../errors/errorsExport");

const validateUser= (res, user) => {
  if (!user) {
    throw new NotFoundError('Пользователь по указанному _id не найден.')
  }
  return res.send(user)
}

const getAllUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({users}))
    .catch(err => next(err));
}

const getUser = (req, res, next) => {
  const {userId} = req.params;

  User.findById(userId)
    .then(user => validateUser(res, user))
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
  const owner = req.user._id;
  const {name, about} = req.body;

  User.findByIdAndUpdate(owner, {name, about}, {new: true,runValidators: true, upsert:false})
    .then(user => validateUser(res, user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'))
      }
      next(err)
    })
}

const updateAvatar = (req, res, next) => {
  const owner = req.user._id;
  const {avatar} = req.body;

  User.findByIdAndUpdate(owner, {avatar},{new: true,runValidators: true})
    .then(user => validateUser(res, user))
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