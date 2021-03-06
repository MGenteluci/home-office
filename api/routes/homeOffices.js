const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const checkDate = require('../middlewares/check-date');

const mailer = require('../helpers/sendMail');

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
router.post('/', checkDate, HomeOfficeController.addHomeOffice, mailer.sendMail);

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

/**
 * Request to fetch the Home Offices where the date is equal or higher than today
 * Path: /homeOffices/current
 * @method GET
 */
router.get('/current', HomeOfficeController.getAllHomeOfficesFromTodayAndBeyond);

module.exports = router;