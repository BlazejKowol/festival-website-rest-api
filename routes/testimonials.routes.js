// testimonials.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const random = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[random]);
});

router.route('/testimonials/:id').get((req, res) => {
    const testimonial = db.testimonials.find(item => item.id === parseInt(req.params.id));
    res.json(testimonial);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = uuidv4();
    db.testimonials.push({id, author, text});
    res.json({message: 'ok' })
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    let changedTestimonial = db.testimonials.find(item => item.id === parseInt(req.params.id));
    changedTestimonial.author = author;
    changedTestimonial.text = text;
    res.json({ message: 'ok' })
});

router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    db.testimonials.splice(id);
    res.json({ message: 'ok' })
});

module.exports = router;