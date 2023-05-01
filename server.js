const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Terry', text: 'Nice to meet me' },
    { id: 2, author: 'Gary Cahill', text: 'I\'m glad to be here.' },
  ];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    const testimonial = db.find(item => item.id === parseInt(req.params.id));
    res.json(testimonial);
});

app.get('/testimonials/random', (req, res) => {
    const random = Math.floor(Math.random() * db.length);
    res.json(db[random]); // Why not working? empty site
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const id = uuidv4();
    db.push({id, author, text});
    res.json({message: 'ok' })
});

app.put('testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    let changedTestimonial = db.find(item => item.id === parseInt(req.params.id));
    changedTestimonial.author = author;
    changedTestimonial.text = text;
    res.json({ message: 'ok' }) // Why not working? Res: 404 not found...
});

app.delete('testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.splice(id);
    res.json({ message: 'ok' }) // Why not working? Res: 404 not found...
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
