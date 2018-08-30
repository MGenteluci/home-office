const express = require('express');
const router = express.Router();
const userExists = require('../middlewares/userExists');
const checkAuth = require('../middlewares/check-auth');
const checkPassword = require('../middlewares/checkPassword');

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
router.delete('/:id', checkAuth, UserController.removeUser);

/**
 * Request to fetch all users
 * Path: /users
 * @method GET
 */
router.get('/', UserController.getAllUsers);

/**
 * Endpoint to add or change team in user
 * Path: /users/updateTeam
 * @method PATCH
 */
router.patch('/updateTeam', UserController.updateUsersTeam);

/**
 * Endpoint to change user's password
 * Path: /users/changePassword
 * @method PATCH
 */
router.patch('/changePassword', checkPassword, UserController.changePassword);

/**
 * Endpoint to change user's role
 * Path: /users/updateUserRole
 * @method PATCH
 */
router.patch('/updateUserRole', UserController.updateUserRole);

module.exports = router;