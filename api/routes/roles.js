const express = require('express');
const router = express.Router();

const RoleController = require('../controllers/roles');

/**
 * Endpoint to create a new role
 * @method POST
 */
router.post('/', RoleController.create);

/**
 * Endpoint to find all roles
 * @method GET
 */
router.get('/', RoleController.findAll);

module.exports = router;