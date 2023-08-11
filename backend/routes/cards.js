const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const celebrates = require('../middlewares/celebrates');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrates.createCard, createCard);
cardRouter.delete('/:cardId', celebrates.deleteCard, deleteCard);
cardRouter.put('/:cardId/likes', celebrates.likesCard, likeCard);
cardRouter.delete('/:cardId/likes', celebrates.likesCard, dislikeCard);

module.exports = cardRouter;
