const express = require('express');
const cors = require('cors');

const watcher = require('./routes/watcherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/home', watcher);

module.exports = app;