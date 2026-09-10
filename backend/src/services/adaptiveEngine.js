/**
 * Adaptive Engine Service
 * Toma decisões sobre como adaptar o jogo baseado no jogador
 */

class AdaptiveEngine {
  constructor(playerProfiler, monsterBehavior, difficultyManager) {
    this.profiler = playerProfiler;
    this.monster = monsterBehavior;
    this.difficulty = difficultyManager;
    this.updateInterval = 5000;
  }

  update(gameState) {
    const metrics = this.profiler.calculateMetrics();
    const playerSkill = metrics.skillLevel;
    const playerStrategy = this.profiler.identifyStrategy();

    this.adjustDifficulty(playerSkill, metrics.successRate);
    this.monsterLearnFromPlayer(playerSkill, playerStrategy, metrics);

    return {
      difficulty: this.difficulty.current,
      monsterState: this.monster.getState(),
      metrics: metrics,
      adjustments: {
        difficultyChanged: this.difficulty.lastAdjustment > 0.01,
        monsterEvolved: this.monster.lastUpdate > Date.now() - this.updateInterval
      }
    };
  }

  adjustDifficulty(playerSkill, successRate) {
    if (successRate < 0.5) {
      this.difficulty.decrease(0.08);
    } else if (successRate > 0.75) {
      this.difficulty.increase(0.08);
    }
  }

  monsterLearnFromPlayer(playerSkill, playerStrategy, metrics) {
    const strengthBoost = playerSkill * 25;
    this.monster.increaseStrength(Math.min(strengthBoost, 100));

    const intelligenceBoost = playerSkill * 30;
    this.monster.increaseIntelligence(Math.min(intelligenceBoost, 100));

    if (metrics.avgResponseTime < 300) {
      this.monster.increaseSpeed(2);
    }

    this.monster.increaseAdaptability(1);
    this.monster.adaptToBehavior(playerSkill, playerStrategy);
  }

  recommendNextTasks(playerLevel) {
    const metrics = this.profiler.calculateMetrics();
    const preferredTypes = metrics.preferredActionTypes;

    return {
      nextTaskType: this._selectTaskType(preferredTypes),
      difficulty: this.difficulty.current,
      duration: this._recommendDuration(metrics.avgResponseTime)
    };
  }

  // ==================== MÉTODOS PRIVADOS ====================

  _selectTaskType(preferredTypes) {
    const allTypes = ['puzzle', 'action', 'strategy'];
    
    for (const type of allTypes) {
      if (!preferredTypes.includes(type)) {
        return type;
      }
    }

    return allTypes[Math.floor(Math.random() * allTypes.length)];
  }

  _recommendDuration(avgResponseTime) {
    if (avgResponseTime < 200) return 30;
    if (avgResponseTime < 400) return 45;
    return 60;
  }
}

module.exports = AdaptiveEngine;
