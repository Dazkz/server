const routerCards = require('express').Router();
const {
  getCards, setLike, postCard, deleteCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/cards', getCards);
routerCards.post('/cards', postCard);
routerCards.delete('/cards/:cardId', deleteCard);
routerCards.put('/cards/:cardId/likes', setLike);
routerCards.delete('/cards/:cardId/likes', dislikeCard);
module.exports = routerCards;
