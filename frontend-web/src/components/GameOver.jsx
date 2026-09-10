import { FiRotateCcw, FiHome } from 'react-icons/fi'
import useGameStore from '../store/gameStore'

function GameOver() {
  const { currentSession, score, resetGame, setGameState } = useGameStore()

  const result = currentSession?.result || 'draw'
  const resultMessages = {
    player_win: { text: '🎉 VOCÊ VENCEU!', color: 'text-green-400' },
    monster_win: { text: '😈 O MONSTRO VENCEU!', color: 'text-red-400' },
    draw: { text: '🤝 EMPATE!', color: 'text-yellow-400' }
  }

  const message = resultMessages[result]

  const handlePlayAgain = () => {
    resetGame()
    setGameState('menu')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center bg-slate-800 rounded-2xl p-12 border-2 border-purple-500">
        {/* Result */}
        <h1 className={`text-6xl font-bold mb-6 ${message.color}`}>
          {message.text}
        </h1>

        {/* Final Score */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg mb-2">Pontuação Final</p>
          <p className="text-5xl font-bold text-yellow-400">{score}</p>
        </div>

        {/* Stats Summary */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-2xl font-bold text-white mb-4">Resumo da Sessão</h3>
          <div className="space-y-2 text-gray-300">
            <p>⏱️ Duração: {currentSession?.duration || 'N/A'}</p>
            <p>📂 Tarefas Completadas: {currentSession?.tasksCompleted || 0}</p>
            <p>🐉 Monstro Evoluído: {currentSession?.monsterEvolved ? 'Sim' : 'Não'}</p>
            <p>📊 Dificuldade Final: {Math.round(currentSession?.endingDifficulty * 100 || 0)}%</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePlayAgain}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <FiRotateCcw size={24} />
            Jogar Novamente
          </button>

          <button
            onClick={() => {
              resetGame()
              setGameState('menu')
            }}
            className="w-full py-3 px-6 bg-slate-700 text-white font-bold text-lg rounded-xl hover:bg-slate-600 transition-all flex items-center justify-center gap-3"
          >
            <FiHome size={24} />
            Menu Principal
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver
