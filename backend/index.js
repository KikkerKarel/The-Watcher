const express = require('express');
const cors = require('cors');

const drama = require('./routes/dramaRoutes');
const user = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/drama', drama);
app.use('/user', user)

module.exports = app;