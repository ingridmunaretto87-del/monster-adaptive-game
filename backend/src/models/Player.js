const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  xp: {
    type: Number,
    default: 0,
    min: 0
  },
  totalScore: {
    type: Number,
    default: 0
  },
  gamesPlayed: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  preferences: {
    difficulty: {
      type: String,
      default: 'normal',
      enum: ['easy', 'normal', 'hard']
    },
    soundEnabled: {
      type: Boolean,
      default: true
    }
  },
  achievements: [
    {
      id: String,
      unlockedAt: Date
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

playerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Player', playerSchema);
