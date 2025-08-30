
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./src/routes');
const { errorMiddleware } = require('./src/middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));


// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/', apiRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
