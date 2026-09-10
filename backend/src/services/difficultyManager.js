/**
 * Difficulty Manager Service
 * Controla a progressão de dificuldade dinamicamente
 */

class DifficultyManager {
  constructor(initialDifficulty = 0.3) {
    this.current = initialDifficulty;
    this.minimum = 0.1;
    this.maximum = 1.0;
    this.adjustmentRate = 0.05;
    this.lastAdjustment = 0;
  }

  update(successRate, playerSkill) {
    const optimalDifficulty = playerSkill + 0.15;
    const delta = optimalDifficulty - this.current;

    const adjustment = Math.max(
      -this.adjustmentRate,
      Math.min(this.adjustmentRate, delta * 0.1)
    );

    const newDifficulty = Math.max(
      this.minimum,
      Math.min(this.maximum, this.current + adjustment)
    );

    this.lastAdjustment = newDifficulty - this.current;
    this.current = newDifficulty;

    return this.getModifiers();
  }

  increase(amount = this.adjustmentRate) {
    this.current = Math.min(this.maximum, this.current + amount);
    this.lastAdjustment = amount;
  }

  decrease(amount = this.adjustmentRate) {
    this.current = Math.max(this.minimum, this.current - amount);
    this.lastAdjustment = -amount;
  }

  getModifiers() {
    return {
      taskComplexity: this.current,
      monsterHealth: Math.round(100 + (this.current * 200)),
      monsterSpeed: 1 + (this.current * 1),
      timeLimit: Math.max(10, Math.round(60 - (this.current * 30))),
      monsterAggressiveness: this.current,
      rewardMultiplier: 1 + (this.current * 0.5)
    };
  }

  getLevel() {
    if (this.current < 0.33) return 'Easy';
    if (this.current < 0.66) return 'Normal';
    return 'Hard';
  }

  reset(initialDifficulty = 0.3) {
    this.current = initialDifficulty;
    this.lastAdjustment = 0;
  }

  getVisualInfo() {
    const bars = Math.round(this.current * 10);
    const empty = 10 - bars;
    
    return {
      level: this.getLevel(),
      percentage: Math.round(this.current * 100),
      bar: '█'.repeat(bars) + '░'.repeat(empty),
      current: this.current
    };
  }
}

module.exports = DifficultyManager;
