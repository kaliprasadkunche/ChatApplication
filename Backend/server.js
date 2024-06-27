// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes
// const messageRoutes = require('./routes/messageRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Include 'Authorization' if needed
};

app.use(cors(corsOptions)); // Apply CORS middleware with options

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process with failure
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // Use user routes
// app.use('/api',messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('./websocket')(server); // Pass server instance to WebSocket setup
