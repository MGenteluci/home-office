const express = require('express');
const router = express.Router();

const userExists = require('../middlewares/userExists');
const checkAuth = require('../middlewares/check-auth');
const checkPassword = require('../middlewares/checkPassword');

const UserController = require('../controllers/users');

/**
 * Endpoint to create a new user
 * @method POST
 */
router.post('/', userExists, UserController.create);

/**
 * Endpoint to find all users
 * @method GET
 */
router.get('/', UserController.findAll);

/**
 * Endpoint to update an User
 * @method PATCH
 * @param id
 */
router.patch('/:id', UserController.update);

/**
 * Endpoint to delete an User
 * @method DELETE
 * @param id
 */
router.delete('/:id', checkAuth, UserController.remove);

/**
 * Endpoint to login
 * @method POST
 */
router.post('/signin', UserController.signIn);

/**
 * Endpoint to change user's password
 * @method PATCH
 */
router.patch('/password/:userId', checkPassword, UserController.changePassword);

module.exports = router;