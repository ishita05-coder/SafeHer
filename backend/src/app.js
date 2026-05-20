const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

const authRoutes = require('./routes/authRoutes');
const sosRoutes = require('./routes/sosRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/contacts', contactRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('SafeHer AI API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
