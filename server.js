const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
app.use((req, res, next) => {
  req.io = io;
  next();
});

// import routes
const testimonialsRoutes =  require('./routes/testimonials.routes');
const concertsRoutes =  require('./routes/concerts.routes');
const seatsRoutes =  require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://user1:${process.env.DB_PASS}@cluster1.7cvqbd6.mongodb.net/NewWaveDB`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
 });
 db.on('error', err => console.log('Error ' + err));     

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  });

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New Socket' + socket);
});

module.exports = server;
