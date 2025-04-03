require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const {connectDB} = require('./config/database.js'); 
const app = express();
const artistRoutes = require('./routes/artist.routes.js');
const eventRoutes = require('./routes/event.routes.js');
const authRoutes = require('./routes/user.routes.js');


// Middleware
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Sanitize against NoSQL query injection
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10kb' })); // Body parser

// Database connection
connectDB()

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Music Booking API',
    version: '1.0.0'
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\nServer shutting down');
  server.close();
  process.exit(0);
});