var express = require('express');
var router = express.Router();
var ctrlLocattions = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

router.get('/', ctrlLocattions.homelist);
router.get('/location', ctrlLocattions.locationInfo);
router.get('/location/review/new', ctrlLocattions.addReview);

module.exports = router;
