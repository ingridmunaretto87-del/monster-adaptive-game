import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set, get) => ({
      // Player State
      player: {
        id: null,
        username: '',
        level: 1,
        xp: 0,
        totalScore: 0,
        gamesPlayed: 0,
        wins: 0,
        losses: 0
      },
      
      // Monster State
      monster: {
        name: 'Shadow Beast',
        strength: 30,
        intelligence: 35,
        speed: 25,
        adaptability: 20,
        personality: 'aggressive',
        behaviorPattern: 'random'
      },
      
      // Game Session
      currentSession: null,
      gameState: 'menu', // menu, playing, paused, game_over
      difficulty: 0.3,
      score: 0,
      tasksCompleted: 0,
      
      // Actions
      setPlayer: (player) => set({ player }),
      setMonster: (monster) => set({ monster }),
      setGameState: (state) => set({ gameState: state }),
      setDifficulty: (diff) => set({ difficulty: diff }),
      incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
      incrementTasksCompleted: () => set((state) => ({ tasksCompleted: state.tasksCompleted + 1 })),
      
      // Session Management
      startSession: (sessionData) => set({ currentSession: sessionData, gameState: 'playing', score: 0, tasksCompleted: 0 }),
      endSession: (result) => set({
        currentSession: {
          ...get().currentSession,
          result,
          endedAt: new Date()
        },
        gameState: 'game_over'
      }),
      
      resetGame: () => set({
        gameState: 'menu',
        score: 0,
        tasksCompleted: 0,
        currentSession: null,
        monster: { name: 'Shadow Beast', strength: 30, intelligence: 35, speed: 25, adaptability: 20, personality: 'aggressive', behaviorPattern: 'random' }
      })
    }),
    {
      name: 'monster-game-store',
      version: 1
    }
  )
)

export default useGameStore
