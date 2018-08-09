const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const checkDate = require('../middlewares/check-date');

const HomeOfficeController = require('../controllers/homeOffices');

/**
 * Request to fetch all Home Offices
 * Path: /homeOffices
 * @method GET
 */
router.get('/', HomeOfficeController.getAllHomeOffices);

/**
 * Request to add a new Home Office
 * Path: /homeOffices
 * @method POST
 */
router.post('/', checkDate, HomeOfficeController.addHomeOffice);

/**
 * Request to remove a Home Office
 * Path: /homeOffices/id
 * @method DELETE
 * @param id
 */
router.delete('/:id', HomeOfficeController.removeHomeOffice);

module.exports = router;