const express = require('express');
const cors = require('cors');

const watcher = require('./routes/watcherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', watcher);
app.use('/add', watcher);
app.use('/get', watcher);

module.exports = app;