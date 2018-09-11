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

/**
 * Endpoint to update the Team's Chat URL
 * Path: /teams/updateTeamChatUrl
 * @method PATCH
 */
router.patch('/updateTeamChatUrl', TeamController.updateTeamChatUrl);

/**
 * Endpoint to update the Team's email
 * Path: /teams/updateEmail
 * @method PATCH
 */
router.patch('/updateEmail', TeamController.updateEmail);

module.exports = router;