


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('./models/User');

const app = express();
const PORT = 5000;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ENG_WORDS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to wordApp DB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Session Configuration
app.use(session({
  secret: '27f657dc2c769fd5822827edfd0e0e0feefac228cec8543c21aa97ab9a1966b9', // Generate using: require('crypto').randomBytes(64).toString('hex')
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/ENG_WORDS',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: false // Set to true in production with HTTPS
  }
}));

app.post('/api/register', async (req, res) => {
    try {
      console.log('Registration request received:', req.body); // Debug log
      
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      // Case-insensitive search
      const existingUser = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ username, password: hashedPassword });
  
      // Explicit save with callback to debug
      await newUser.save((err, savedUser) => {
        if (err) {
          console.error('Save error:', err);
          return res.status(500).json({ error: 'Failed to save user' });
        }
        console.log('User saved:', savedUser); // Debug log
        
        req.session.user = {
          id: savedUser._id,
          username: savedUser.username
        };
  
        res.status(201).json({
          message: 'Registration successful',
          user: {
            id: savedUser._id,
            username: savedUser.username
          }
        });
      });
  
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed', details: error.message });
    }
  });

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout Endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Check Authentication Status
app.get('/api/auth/check', (req, res) => {
  if (req.session.user) {
    res.json({ 
      isAuthenticated: true,
      user: req.session.user 
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Protected Route Example
app.get('/api/protected', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ 
    message: 'Protected content',
    user: req.session.user 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});