const router = require('express').Router();
const cardsSend = require('./cards');
const {usersCheck, allUsers} = require('./users');

router.get('/users/:id', usersCheck);
router.get('/cards', cardsSend);
router.get('/users', allUsers);
module.exports = router;