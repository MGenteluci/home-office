const express = require('express');
const router = express.Router();
const userExists = require('../middlewares/userExists');

const UserController = require('../controllers/users');

/**
 * Request to create a new user
 * bcrypt used to hash the password
 * Path: /users/signup
 * @method POST
 */
router.post('/signup', userExists, UserController.signUp);

/**
 * Request to login
 * Path: /users/signin
 * @method POST
 */
router.post('/signin', UserController.signIn);

/**
 * Request to delete an User
 * Path /users/id
 * @method DELETE
 * @param id
 */
router.delete('/:id', UserController.removeUser);

/**
 * Request to fetch all users
 * Path: /users
 * @method GET
 */
router.get('/', UserController.getAllUsers);

module.exports = router;