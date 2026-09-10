/**
 * Monster Behavior Engine Service
 * Define como o monstro se comporta baseado no aprendizado
 */

class MonsterBehaviorEngine {
  constructor() {
    this.strength = 30;
    this.intelligence = 35;
    this.speed = 25;
    this.adaptability = 20;
    this.personality = 'aggressive';
    this.behaviorPattern = 'random';
    this.lastUpdate = Date.now();
    this.recognizedPatterns = [];
  }

  getState() {
    return {
      strength: this.strength,
      intelligence: this.intelligence,
      speed: this.speed,
      adaptability: this.adaptability,
      personality: this.personality,
      behaviorPattern: this.behaviorPattern,
      stats: this._calculateStats()
    };
  }

  increaseStrength(amount) {
    this.strength = Math.min(100, this.strength + amount);
    this.lastUpdate = Date.now();
  }

  increaseIntelligence(amount) {
    this.intelligence = Math.min(100, this.intelligence + amount);
    this.lastUpdate = Date.now();
  }

  increaseSpeed(amount) {
    this.speed = Math.min(100, this.speed + amount);
    this.lastUpdate = Date.now();
  }

  increaseAdaptability(amount) {
    this.adaptability = Math.min(100, this.adaptability + amount);
    this.lastUpdate = Date.now();
  }

  adaptToBehavior(playerSkill, playerStrategy) {
    if (playerStrategy === 'aggressive') {
      this.personality = 'aggressive';
      this.behaviorPattern = 'counter';
    } else if (playerStrategy === 'defensive') {
      this.personality = 'strategic';
      this.behaviorPattern = 'strategic_counter';
    } else if (playerStrategy === 'strategic') {
      this.personality = 'strategic';
      this.behaviorPattern = 'anticipate';
    } else {
      this.personality = 'aggressive';
      this.behaviorPattern = 'chase';
    }

    this.lastUpdate = Date.now();
  }

  generateAction(gameState) {
    const { playerPosition, lastPlayerAction, playerRecentActions } = gameState;

    switch (this.behaviorPattern) {
      case 'counter':
        return {
          type: 'attack',
          intensity: this.strength / 100,
          position: this._calculateAttackPosition(playerPosition)
        };

      case 'strategic_counter':
        return {
          type: 'counter',
          strategy: this._findCounter(lastPlayerAction),
          intelligence: this.intelligence / 100
        };

      case 'anticipate':
        return {
          type: 'anticipate',
          predictedAction: this._predictNextAction(playerRecentActions),
          confidence: this.intelligence / 100
        };

      case 'chase':
      default:
        return {
          type: 'chase',
          position: playerPosition,
          speed: this.speed / 100
        };
    }
  }

  getExpression() {
    const expressions = {
      aggressive: '😈',
      defensive: '🛡️',
      strategic: '🧠',
      tired: '😴',
      maestro: '👑'
    };

    return expressions[this.personality] || '👹';
  }

  getMessage() {
    const messages = {
      aggressive: ['Vou te pegar!', 'Prepare-se!', 'Sinta meu poder!'],
      defensive: ['Vou me proteger...', 'Você não passa!', 'Bloqueio total!'],
      strategic: ['Seu padrão é previsível...', 'Estou analisando...', 'Entendi sua tática!'],
      tired: ['Cansado... mas continuo!', 'Você é forte...', 'Isso vai ser épico!'],
      maestro: ['Você é hábil... Vamos ver!', 'Que interessante!', 'Agora, de verdade!']
    };

    const msgs = messages[this.personality] || ['👹'];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }

  // ==================== MÉTODOS PRIVADOS ====================

  _calculateStats() {
    const total = this.strength + this.intelligence + this.speed + this.adaptability;
    return {
      strengthPercent: (this.strength / 100) * 100,
      intelligencePercent: (this.intelligence / 100) * 100,
      speedPercent: (this.speed / 100) * 100,
      adaptabilityPercent: (this.adaptability / 100) * 100,
      overallLevel: total / 4
    };
  }

  _calculateAttackPosition(playerPosition) {
    return {
      x: playerPosition.x + (Math.random() * 100 - 50),
      y: playerPosition.y + (Math.random() * 100 - 50)
    };
  }

  _findCounter(lastPlayerAction) {
    const counters = {
      'attack': 'defend',
      'defend': 'attack',
      'move_left': 'block_left',
      'move_right': 'block_right'
    };

    return counters[lastPlayerAction] || 'defend';
  }

  _predictNextAction(playerRecentActions) {
    if (playerRecentActions.length < 2) return 'random';
    return playerRecentActions[playerRecentActions.length - 1];
  }
}

module.exports = MonsterBehaviorEngine;
