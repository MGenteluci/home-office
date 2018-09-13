const express = require('express');
const router = express.Router();
const isTeamNameUsed = require('../middlewares/isTeamNameUsed');

const TeamController = require('../controllers/teams');

/**
 * Endpoint to create a new Team
 * @method POST
 */
router.post('/', isTeamNameUsed, TeamController.create);

/**
 * Endpoint to find all Teams
 * @method GET
 */
router.get('/', TeamController.findAll);

/**
 * Endpoint to update a Team
 * @method PATCH
 * @param id
 */
router.patch('/:id', TeamController.update);

module.exports = router;