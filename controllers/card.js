const Card = require('../models/card');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send({cards}))
    .catch(next());
}

const createCard = (req, res, next) => {
  const {name, link} = req.body;

  Card.create({name, link, owner: req.user._id})
    .then(card => res.send({card}))
    .catch(next());
}

const removeCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params)
    .then(cards => res.send({cards}))
    .catch(next());
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => res.send({card}))
    .catch(next());
}

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.send({card}))
    .catch(next());
}

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard
};