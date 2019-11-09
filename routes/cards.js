const cards = require('../data/cards.json');

const cardsSend = (req,res,next) => {
  res.send(cards);
  next();
}
module.exports = cardsSend;