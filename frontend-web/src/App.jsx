import { useEffect } from 'react'
import useGameStore from './store/gameStore'
import MainMenu from './components/MainMenu'
import GameBoard from './components/GameBoard'
import MonsterCompanion from './components/MonsterCompanion'
import GameOver from './components/GameOver'
import { connectSocket, disconnectSocket, getGameHealth } from './services/gameService'

function App() {
  const { gameState } = useGameStore()

  useEffect(() => {
    // Conectar ao servidor
    const initializeGame = async () => {
      try {
        const health = await getGameHealth()
        console.log('✅ Servidor conectado:', health)
        connectSocket()
      } catch (error) {
        console.error('❌ Erro ao conectar ao servidor:', error)
      }
    }

    initializeGame()

    return () => {
      disconnectSocket()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {gameState === 'menu' && <MainMenu />}
      
      {gameState === 'playing' && (
        <div className="min-h-screen p-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GameBoard />
            </div>
            <div className="lg:col-span-1">
              <MonsterCompanion />
            </div>
          </div>
        </div>
      )}
      
      {gameState === 'game_over' && <GameOver />}
    </div>
  )
}

export default App
