const routerUsers = require('express').Router();
const {
  getUserById, getAllUsers, makeUser, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.post('/users', makeUser);
routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/:id', getUserById);
routerUsers.patch('/users/me', updateUser);
routerUsers.patch('/users/me/avatar', updateAvatar)
routerUsers.get('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = routerUsers;
