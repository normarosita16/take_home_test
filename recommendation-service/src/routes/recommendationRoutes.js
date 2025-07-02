const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/recommendation', recommendationController.getWeatherRecommendation);
router.delete('/cache', recommendationController.clearCache);

module.exports = router;
