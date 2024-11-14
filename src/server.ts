import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/api/userRoutes'; 
import thoughtRoutes from './routes/api/thoughtRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost/social-network')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/thoughts', thoughtRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello from the Social Network API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});