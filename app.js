
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5dbaea2aebb8fb2a5844c48a',
  };
  next();
});
app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
