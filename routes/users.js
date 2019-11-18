const routerUsers = require('express').Router();
const {
  getUserById, getAllUsers, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/:id', getUserById);
routerUsers.patch('/users/me', updateUser);
routerUsers.patch('/users/me/avatar', updateAvatar);
/* routerUsers.use('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
}); */

module.exports = routerUsers;
