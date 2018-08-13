const express = require('express');
const router = express.Router();
const isTeamNameUsed = require('../middlewares/isTeamNameUsed');

const TeamController = require('../controllers/teams');

/**
 * Request to add a new Team
 * Path: /homeOffices
 * @method POST
 */
router.post('/', isTeamNameUsed, TeamController.addTeam);

/**
 * Request to fetch all Teams
 * Path: /teams
 * @method GET
 */
router.get('/', TeamController.getAllTeams);

module.exports = router;