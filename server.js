const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Import Routes Explicitly
const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Use Routes
// This maps everything in auth.js to /api/auth
app.use('/api/auth', authRoutes);

// This maps everything in todos.js to /api/todos
app.use('/api/todos', todoRoutes);

// Root Route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});