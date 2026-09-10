import axios from 'axios'
import io from 'socket.io-client'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
let socket = null

export const connectSocket = () => {
  if (!socket) {
    socket = io(API_URL, {
      transports: ['websocket'],
      reconnection: true
    })
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const getGameHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/health`)
    return response.data
  } catch (error) {
    console.error('Erro ao verificar saúde do servidor:', error)
    throw error
  }
}

export const sendPlayerAction = (action) => {
  if (socket && socket.connected) {
    socket.emit('playerAction', action)
  }
}

export const onActionProcessed = (callback) => {
  if (socket) {
    socket.on('actionProcessed', callback)
  }
}

export const generateTask = (difficulty, taskType) => {
  const taskTypes = {
    puzzle: generatePuzzleTask,
    action: generateActionTask,
    strategy: generateStrategyTask
  }
  
  return taskTypes[taskType]?.(difficulty) || generatePuzzleTask(difficulty)
}

function generatePuzzleTask(difficulty) {
  const complexities = [
    { numPatterns: 3, timeLimit: 30 },
    { numPatterns: 5, timeLimit: 25 },
    { numPatterns: 8, timeLimit: 20 }
  ]
  
  const level = Math.min(Math.floor(difficulty * 3), 2)
  const complexity = complexities[level]
  
  return {
    id: `puzzle-${Date.now()}`,
    type: 'puzzle',
    title: 'Pattern Memory',
    description: 'Memorize e reproduza o padrão!',
    patterns: Array.from({ length: complexity.numPatterns }, (_, i) => ({
      id: i,
      color: `hsl(${(i * 360) / complexity.numPatterns}, 70%, 50%)`
    })),
    timeLimit: complexity.timeLimit,
    difficulty: difficulty,
    reward: Math.round(100 + (difficulty * 200))
  }
}

function generateActionTask(difficulty) {
  const speed = 1 + (difficulty * 2)
  const targetCount = 5 + Math.floor(difficulty * 5)
  
  return {
    id: `action-${Date.now()}`,
    type: 'action',
    title: 'Target Practice',
    description: 'Clique nos alvos antes que desapareçam!',
    targetCount,
    speed,
    timeLimit: 60,
    difficulty: difficulty,
    reward: Math.round(80 + (difficulty * 150))
  }
}

function generateStrategyTask(difficulty) {
  return {
    id: `strategy-${Date.now()}`,
    type: 'strategy',
    title: 'Strategic Choice',
    description: 'Escolha a melhor estratégia para vencer!',
    options: [
      { id: 'aggressive', label: 'Ataque Direto', risk: 0.8 },
      { id: 'defensive', label: 'Defesa Total', risk: 0.2 },
      { id: 'balanced', label: 'Estratégia Balanceada', risk: 0.5 }
    ],
    difficulty: difficulty,
    reward: Math.round(120 + (difficulty * 250))
  }
}
