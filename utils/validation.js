const { Joi } = require('celebrate');
const { regexUrl } = require('./regex');

const signInValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
}

const signUpValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl)
  })
}

const getUserValidation = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex()
  })
}

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).regex(regexUrl)
  })
}

const cardIdValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24)
  })
}

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(regexUrl)
  })
}

module.exports = {
  signInValidation,
  signUpValidation,
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  cardIdValidation,
  createCardValidation
}