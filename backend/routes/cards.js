const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/cards');
const { cardIdValidation, cardCreateValidation } = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', cardCreateValidation, createCard);

router.delete('/:cardId', cardIdValidation, deleteCard);

router.put('/:cardId/likes', cardIdValidation, putLikeCard);

router.delete('/:cardId/likes', cardIdValidation, deleteLikeCard);

module.exports = router;
