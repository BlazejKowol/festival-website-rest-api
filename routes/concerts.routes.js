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

module.exports = router;