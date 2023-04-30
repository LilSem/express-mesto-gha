const router = require('express').Router();
const protectedDeleteCard = require('../middlewares/deleteCard');

const {
  getAllCards,
  removeCard,
  createCard,
  likeCard,
  dislikeCard
} = require('../controllers/card');

router.get('/', getAllCards);
router.delete('/:cardId', protectedDeleteCard, removeCard);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
