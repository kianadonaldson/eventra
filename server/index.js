const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
const Event = require('./models/Event');

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB();

app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

app.listen(PORT, () => {
    console.log(`We be listening on ${PORT}`);
});