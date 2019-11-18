require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const auth = require("./middlewares/auth");
const { login, makeUser} = require('./controllers/users');

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/signin', login);
app.use('/signup', makeUser);

app.use(auth);
app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.use('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
