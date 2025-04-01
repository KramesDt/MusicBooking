const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const { connectDB } = require('./config/database');
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
require("dotenv").config();

// Import routes
const authRoutes = require('./routes/auth.js');
const depositRoutes = require('./routes/deposits.js');
const interestRoutes = require('./routes/interest.js');
const withdrawalRoutes = require('./routes/withdrawal.js');

const PORT = process.env.PORT || 8000;

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yeeld-Hive API",
      version: "1.0.0",
      description: "Yeeld-Hive Express API Library",
    },
    servers: [
      {
        url: `http://localhost:8000${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// Initialize express app
const app = express();
// const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(helmet()); // Set security HTTP headers
app.use(xss()); // Sanitize user input
app.use(mongoSanitize()); // Sanitize against NoSQL query injection
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10kb' })); // Body parser

// Rate limiting
const limiter = rateLimit({
  max: 100, // 100 requests per IP
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/withdrawals', withdrawalRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  
  res.status(statusCode).json({
    status,
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
// app.all('*', (req, res) => {
//   res.status(404).json({
//     status: 'fail',
//     message: `Can't find ${req.originalUrl} on this server!`
//   });
// });

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Yeeld Hive API',
    version: '1.0.0'
  });
});

// Start cron jobs
// require('./scripts/cron');

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
