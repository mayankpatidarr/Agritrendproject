require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { exec } = require('child_process');

// Routes
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const predictRoutes = require('./routes/predictRoute');
const advisoryRoutes = require('./routes/advisoryRoutes');

const app = express();
app.use(
  cors({
    origin: '*', // allows any frontend to access the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// Middleware
//app.use(cors());
app.use(express.json()); // Allows JSON data

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Stop server if DB fails
  }
};

// Default Route
app.get('/', (req, res) => {
  res.send('Backend is running...');


  exec('python3 --version', (error, stdout, stderr) => {
    if (error) {
      console.error('⚠️ Python not found:', error.message);
    } else {
      console.log('🐍 Python version:', stdout.trim());
    }
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/advisory', advisoryRoutes);


const startServer = async () => {
  await connectDB(); 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
