const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: 'Shadow Beast'
  },
  // Stats (0-100)
  strength: {
    type: Number,
    default: 30,
    min: 0,
    max: 100
  },
  intelligence: {
    type: Number,
    default: 35,
    min: 0,
    max: 100
  },
  speed: {
    type: Number,
    default: 25,
    min: 0,
    max: 100
  },
  adaptability: {
    type: Number,
    default: 20,
    min: 0,
    max: 100
  },
  // Comportamento
  personality: {
    type: String,
    default: 'aggressive',
    enum: ['aggressive', 'defensive', 'strategic', 'mimic', 'maestro']
  },
  behaviorPattern: {
    type: String,
    default: 'random',
    enum: ['random', 'chase', 'counter', 'strategic_counter', 'anticipate', 'maestro_mode']
  },
  // Aprendizado
  learningHistory: [
    {
      patternId: String,
      frequency: Number,
      effectiveness: Number,
      lastSeen: Date
    }
  ],
  recognizedPatterns: [String],
  
  // Estatísticas
  totalSessionsAnalyzed: {
    type: Number,
    default: 0
  },
  totalWins: {
    type: Number,
    default: 0
  },
  totalLosses: {
    type: Number,
    default: 0
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

monsterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Monster', monsterSchema);
