const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
require("dotenv").config();
const PORT = process.env.PORT || 6000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/ErrorMiddleware');
const { notFound } = require('./middlewares/RouteMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectDB();

//Routes
app.use('/api/entreprises', require('./routes/entrepriseRoute'));

//404
app.use(notFound);

//Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold));