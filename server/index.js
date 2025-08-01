const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import database
const { initDatabase } = require('./database/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
const ledgerRoutes = require('./routes/ledger');
const emailRoutes = require('./routes/email');
const reconciliationRoutes = require('./routes/reconciliation');

// API routes
app.use('/api/ledger', ledgerRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/reconciliation', reconciliationRoutes);

// API-only server - no frontend serving
app.get('/', (req, res) => {
  res.json({ 
    message: 'Email Receipt Processor API',
    endpoints: {
      ledger: '/api/ledger',
      email: '/api/email',
      reconciliation: '/api/reconciliation'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Initialize database
  await initDatabase();
});

module.exports = app; 