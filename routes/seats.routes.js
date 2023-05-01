// seats.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const seat = db.seats.find(item => item.id === parseInt(req.params.id));
    res.json(seat);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuidv4();
    db.seats.push({id, day, seat, client, email});
    res.json({message: 'ok' })
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    let changedSeats = db.seats.find(item => item.id === parseInt(req.params.id));
    changedSeats.day = day;
    changedSeats.seat = seat;
    changedSeats.client = client;
    changedSeats.email = email;
    res.json({ message: 'ok' })
});

router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    db.seats.splice(id);
    res.json({ message: 'ok' })
});

module.exports = router;