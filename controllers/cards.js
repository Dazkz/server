const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.postCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.send({ message: 'Данной карты не существует в базе' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: 'Нет карточки с таким id' });
      }
      return res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.send(card);
  })
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
