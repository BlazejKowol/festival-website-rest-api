// seats.routes.js

const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

// get all seats
router.get('/seats', SeatController.getAll);
// get all seats properties
router.get('/seats/:id', SeatController.getById);
// add seats Nie działa - status 500
router.post('/seats', SeatController.post);
// update selected seat
router.put('/seats/:id', SeatController.put);
// remove selected seat
router.delete('/seats/:id', SeatController.delete);

module.exports = router;