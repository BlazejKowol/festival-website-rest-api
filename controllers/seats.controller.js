//seats.controller.js

const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getById = async (req, res) => {

    try {
      const seat = await Seat.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

exports.post = async (req, res) => {
    const { day, seat, client, email } = req.body;
    if(day, seat, client, email ) {
        try {
        const selectedDay = await Seat.find({day: day})
        const selectedSeats = selectedDay.find({seat: seat});
        const selectedSeat = await Seat.findOne({$and: [{day: day}, {seat: seat}]});
        if(selectedSeat) {
          res.status(400).json({ message: 'The slot is already taken...' })
        }
      else {
        const newSeat = new Seat(
          { day: day, seat: seat, client: client, email: email })
        await newSeat.save();
        const seats = await Seat.find();
        req.io.emit('seatsUpdated', seats);
        res.json({message: 'ok' })
      }
    } catch(err) {
        res.status(500).json({ message: err });
      }
    }
  };

exports.put = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        await Seat.updateOne({ _id: req.params.id}, 
          {$set: { day: day, seat: seat, client: client, email: email}});
        res.json({ message: 'ok' })
    } 
    catch(err) {
        res.status(500).json({ message: err });
      }
  };

exports.delete = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
          await Seat.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
    };