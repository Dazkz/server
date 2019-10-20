const users = require('../data/users.json');

const usersCheck = (req,res,next) => {
  for (let i=0; i < users.length; i++) {
    if (users[i]._id === req.params.id) {
      res.status(404);
      res.send(users[i]);
      return;
    }
  }
  res.status(404);
  res.send({ 'message': "Нет пользователя с таким id" });
};

const allUsers = (req,res,next) => {
  res.status(200);
  console.log(users);
  res.send(users);
};
module.exports = { usersCheck, allUsers };