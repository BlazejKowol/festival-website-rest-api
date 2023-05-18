// testimonials.routes.js

const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

// get all testimonials
router.get('/testimonials', TestimonialController.getAll);
// get random testimonial
router.get('/testimonials/random', TestimonialController.getRandom);
// get all testimonials properties
router.get('/testimonials/:id', TestimonialController.getById);
// add testimonials
router.post('/testimonials', TestimonialController.post);
// update testimonials
router.put('/testimonials/:id', TestimonialController.put);
// remove selected testimonial
router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;