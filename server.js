const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Dynamic File-Based Routing ---
const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  // Only load .js files
  if (file.endsWith('.js')) {
    const route = require(path.join(routesPath, file));
    const routeName = file.split('.')[0]; // e.g., 'auth.js' becomes 'auth'
    
    // Mount routes at /api/filename
    app.use(`/api/${routeName}`, route);
    console.log(`Route loaded: /api/${routeName}`);
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});