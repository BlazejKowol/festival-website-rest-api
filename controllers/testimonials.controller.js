//testimonials.controller.js

const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getRandom = async (req, res) => {
    try {
    const count = await Testimonial.countDocuments(); 
    const random = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(random);
    if(!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
    }
    catch(err) {
    res.status(500).json({ message: err });
    }
   };

exports.getById = async (req, res) => {

    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if(!testimonial) res.status(404).json({ message: 'Not found' });
      else res.json(testimonial);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.post = async (req, res) => {

    try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial(
        { author: author, text: text })
    await newTestimonial.save();
    res.json({message: 'ok' })
    } catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.put = async (req, res) => {
    const { author, text } = req.body;
    try {
        await Testimonial.updateOne(
            { _id: req.params.id}, {$set: { author: author, text: text }});
        res.json({ message: 'ok' })
    } 
    catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.delete = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if(testimonial) {
          await Testimonial.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
    };