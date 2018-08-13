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
router.delete('/:id', checkAuth, HomeOfficeController.removeHomeOffice);

/**
 * Request to update the Home Office's day
 * Path: /homeOffices/id
 * @method PATCH
 * @param id
 */
router.patch('/:id', checkDate, HomeOfficeController.updateHomeOfficeDay);

module.exports = router;