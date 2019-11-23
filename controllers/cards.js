const Card = require('../models/cards');
const NotFoundError = require('../errors/not-found-error');

const cardMissing = new NotFoundError('Нет карточки с таким id');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};
module.exports.postCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данной карты не существует в базе / у вас недостаточно прав для удаления');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw cardMissing;
      }
      return res.send(card);
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw cardMissing;
    }
    return res.send(card);
  })
  .catch(next);
