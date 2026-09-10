/**
 * Player Profiler Service
 * Coleta e analisa dados sobre o estilo de jogo do jogador
 */

class PlayerProfiler {
  constructor() {
    this.recentActions = [];
    this.responseTime = [];
    this.successCount = 0;
    this.failureCount = 0;
    this.patterns = {};
  }

  /**
   * Registrar ação do jogador
   */
  recordAction(action) {
    const record = {
      type: action.type,
      timestamp: Date.now(),
      duration: action.duration || 0,
      success: action.success || false,
      metadata: action.metadata || {}
    };

    this.recentActions.push(record);
    this.responseTime.push(record.duration);

    if (record.success) {
      this.successCount++;
    } else {
      this.failureCount++;
    }

    if (this.recentActions.length > 50) {
      this.recentActions.shift();
      this.responseTime.shift();
    }

    this._analyzePattern(record);
  }

  /**
   * Calcular métricas do jogador
   */
  calculateMetrics() {
    if (this.recentActions.length === 0) {
      return {
        avgResponseTime: 0,
        successRate: 0,
        preferredActionTypes: [],
        consistency: 0,
        learningPace: 0,
        skillLevel: 0
      };
    }

    const avgResponseTime = this._getAverageResponseTime();
    const successRate = this._getSuccessRate();
    const preferredTypes = this._getPreferredActionTypes();
    const consistency = this._getConsistency();
    const learningPace = this._getLearningPace();
    const skillLevel = this._calculateSkillLevel(avgResponseTime, successRate, consistency);

    return {
      avgResponseTime,
      successRate,
      preferredActionTypes: preferredTypes,
      consistency,
      learningPace,
      skillLevel,
      totalActions: this.recentActions.length
    };
  }

  /**
   * Identificar estratégia do jogador
   */
  identifyStrategy() {
    const metrics = this.calculateMetrics();
    const types = metrics.preferredActionTypes;

    if (types.includes('attack') && types[0] === 'attack') {
      return 'aggressive';
    } else if (types.includes('defend') && types[0] === 'defend') {
      return 'defensive';
    } else if (metrics.skillLevel > 0.7) {
      return 'strategic';
    } else {
      return 'balanced';
    }
  }

  // ==================== MÉTODOS PRIVADOS ====================

  _analyzePattern(record) {
    const patternKey = record.type;
    
    if (!this.patterns[patternKey]) {
      this.patterns[patternKey] = {
        count: 0,
        successCount: 0,
        avgDuration: 0
      };
    }

    this.patterns[patternKey].count++;
    if (record.success) {
      this.patterns[patternKey].successCount++;
    }
    
    const pattern = this.patterns[patternKey];
    pattern.avgDuration = (pattern.avgDuration + record.duration) / 2;
  }

  _getAverageResponseTime() {
    if (this.responseTime.length === 0) return 0;
    const sum = this.responseTime.reduce((a, b) => a + b, 0);
    return sum / this.responseTime.length;
  }

  _getSuccessRate() {
    const total = this.successCount + this.failureCount;
    if (total === 0) return 0;
    return this.successCount / total;
  }

  _getPreferredActionTypes() {
    return Object.entries(this.patterns)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([type]) => type);
  }

  _getConsistency() {
    if (this.responseTime.length < 2) return 0;
    
    const avg = this._getAverageResponseTime();
    const variance = this.responseTime.reduce(
      (sum, time) => sum + Math.pow(time - avg, 2), 0
    ) / this.responseTime.length;
    
    const stdDev = Math.sqrt(variance);
    return Math.max(0, 1 - (stdDev / avg));
  }

  _getLearningPace() {
    if (this.recentActions.length < 10) return 0;

    const recent = this.recentActions.slice(-10);
    const older = this.recentActions.slice(-20, -10);

    const recentSuccess = recent.filter(a => a.success).length / recent.length;
    const olderSuccess = older.length > 0 ? older.filter(a => a.success).length / older.length : 0;

    return recentSuccess - olderSuccess;
  }

  _calculateSkillLevel(avgResponseTime, successRate, consistency) {
    const speedScore = Math.min(0.3, (1 - (avgResponseTime / 5000)) * 0.3);
    const accuracyScore = successRate * 0.5;
    const consistencyScore = consistency * 0.2;

    return speedScore + accuracyScore + consistencyScore;
  }
}

module.exports = PlayerProfiler;
