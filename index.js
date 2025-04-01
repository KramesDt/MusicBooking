require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/artists', require('./routes/artistRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle port conflicts gracefully
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    console.log('Try:');
    console.log(`1. kill-process.ps1 -port ${PORT}`);
    console.log(`2. netstat -ano | findstr :${PORT}`);
    console.log(`3. taskkill /PID <PID> /F`);
  } else {
    console.error('Server error:', error);
  }
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\nServer shutting down');
  server.close();
  process.exit(0);
});