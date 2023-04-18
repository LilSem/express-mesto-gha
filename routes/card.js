const router = require('express').Router();
const {getAllCards, removeCard, createCard, likeCard, dislikeCard} = require('../controllers/card');

router.get('/', getAllCards);
router.delete('/:cardId', removeCard);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;