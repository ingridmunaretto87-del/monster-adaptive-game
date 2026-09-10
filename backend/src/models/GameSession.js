const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  monsterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Monster'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  
  // Tarefas
  tasksCompleted: {
    type: Number,
    default: 0
  },
  tasksFailed: {
    type: Number,
    default: 0
  },
  
  // Scores
  finalScore: {
    type: Number,
    default: 0
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  
  // Dificuldade
  startingDifficulty: {
    type: Number,
    default: 0.3
  },
  endingDifficulty: {
    type: Number,
    default: 0.3
  },
  
  // Monster State
  monsterStats: {
    strength: Number,
    intelligence: Number,
    speed: Number,
    adaptability: Number,
    personality: String
  },
  
  // Métricas
  averageResponseTime: Number,
  successRate: Number,
  
  // Detalhes de tarefas
  tasks: [
    {
      taskId: String,
      type: String,
      completed: Boolean,
      timeSpent: Number,
      success: Boolean,
      score: Number
    }
  ],
  
  result: {
    type: String,
    enum: ['player_win', 'monster_win', 'draw'],
    default: 'draw'
  },
  
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'completed', 'abandoned']
  }
});

module.exports = mongoose.model('GameSession', gameSessionSchema);
