// concerts.routes.js

const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

// get all concerts
router.get('/concerts', ConcertController.getAll);
// get all concerts properties
router.get('/concerts/:id', ConcertController.getById);
// add concerts 
router.post('/concerts', ConcertController.post);
// update selected concert
router.put('/concerts/:id', ConcertController.put)
// remove selected concert
router.delete('/concerts/:id', ConcertController.delete);
// get concerts by performer
router.get('/concerts/performer/:performer', ConcertController.getByPerformer);
// get concerts by genre
router.get('/concerts/genre/:genre', ConcertController.getByGenre);
// get concerts by price
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);
// get concerts by day
router.get('/concerts/price/day/:day', ConcertController.getByDay);

module.exports = router;