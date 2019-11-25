const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, setLike, postCard, deleteCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/', getCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/),
  }),
}), postCard);
routerCards.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), deleteCard);
routerCards.put('/:cardId/likes', setLike);
routerCards.delete('/:cardId/likes', dislikeCard);
module.exports = routerCards;
