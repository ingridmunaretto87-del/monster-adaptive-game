import { useState } from 'react'
import useGameStore from '../store/gameStore'
import { FiPlay, FiSettings, FiTrendingUp } from 'react-icons/fi'

function MainMenu() {
  const { player, monster, setGameState, startSession } = useGameStore()
  const [menuState, setMenuState] = useState('main')

  const handleStartGame = () => {
    startSession({
      startedAt: new Date(),
      playerStats: player,
      monsterStats: monster
    })
    setGameState('playing')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-9xl mb-4 drop-shadow-lg">👹</div>
          <h1 className="text-5xl font-bold text-white mb-2">Monster Adaptive Game</h1>
          <p className="text-purple-300 text-xl">Desafie-se contra um monstro que aprende</p>
        </div>

        {menuState === 'main' ? (
          /* Main Menu */
          <div className="space-y-4">
            <button
              onClick={handleStartGame}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-2xl rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <FiPlay size={32} />
              Começar Jogo
            </button>

            <button
              onClick={() => setMenuState('stats')}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all"
            >
              <FiTrendingUp className="inline mr-2" />
              Ver Estatísticas
            </button>

            <button
              onClick={() => setMenuState('settings')}
              className="w-full py-4 px-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all"
            >
              <FiSettings className="inline mr-2" />
              Configurações
            </button>
          </div>
        ) : menuState === 'stats' ? (
          /* Stats Screen */
          <div className="bg-slate-800 rounded-xl p-6 text-white">
            <h2 className="text-3xl font-bold mb-6">Suas Estatísticas</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatCard label="Nível" value={player.level} />
              <StatCard label="XP" value={player.xp} />
              <StatCard label="Vitórias" value={player.wins} />
              <StatCard label="Derrotas" value={player.losses} />
            </div>

            <button
              onClick={() => setMenuState('main')}
              className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
            >
              Voltar
            </button>
          </div>
        ) : (
          /* Settings Screen */
          <div className="bg-slate-800 rounded-xl p-6 text-white">
            <h2 className="text-3xl font-bold mb-6">Configurações</h2>
            
            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>Som Ativado</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>Vibrações</span>
              </label>
            </div>

            <button
              onClick={() => setMenuState('main')}
              className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-4 rounded-lg text-center">
      <p className="text-purple-200 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-yellow-400">{value}</p>
    </div>
  )
}

export default MainMenu
