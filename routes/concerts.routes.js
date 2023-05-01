// concerts.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get all concerts properties
router.route('/concerts/:id').get((req, res) => {
    const concert = db.concerts.find(item => item.id === parseInt(req.params.id));
    res.json(concert);
});

// add concerts 
router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = uuidv4();
    db.concerts.push({id, performer, genre, price, day, image });
    res.json({message: 'ok' })
});

// update selected concert
router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image  } = req.body;
    let changedConcerts = db.concerts.find(item => item.id === parseInt(req.params.id));
    changedConcerts.performer = performer;
    changedConcerts.genre = genre;
    changedConcerts.price = price;
    changedConcerts.day = day;
    changedConcerts.image = image;
    res.json({ message: 'ok' })
});

// remove selected concert
router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    db.concerts.splice(id);
    res.json({ message: 'ok' })
});

module.exports = router;