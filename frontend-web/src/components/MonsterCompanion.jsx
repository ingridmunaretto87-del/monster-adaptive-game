import { useEffect, useState } from 'react'
import useGameStore from '../store/gameStore'

function MonsterCompanion() {
  const { monster, score, tasksCompleted } = useGameStore()
  const [expression, setExpression] = useState('😈')
  const [message, setMessage] = useState('Vamos começar!')

  useEffect(() => {
    const updateExpression = () => {
      if (tasksCompleted === 0) {
        setExpression('😈')
        setMessage('Vamos começar!')
      } else if (tasksCompleted < 3) {
        setExpression('😤')
        setMessage('Você é bom, mas ainda não basta...')
      } else if (tasksCompleted < 6) {
        setExpression('🤔')
        setMessage('Entendi seu estilo... Vou me adaptar!')
      } else if (tasksCompleted < 10) {
        setExpression('😡')
        setMessage('Agora sim! Vou ficar mais forte!')
      } else {
        setExpression('👹')
        setMessage('Somos rivais dignos! Vamos lutar!')
      }
    }

    updateExpression()
  }, [tasksCompleted])

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-b from-purple-900 to-purple-950 rounded-2xl border-2 border-purple-500 shadow-2xl">
      {/* Monster Avatar */}
      <div className="text-8xl drop-shadow-lg animate-bounce">
        {expression}
      </div>

      {/* Monster Stats */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <StatBar label="Força" value={monster.strength} max={100} color="red" />
        <StatBar label="Inteligência" value={monster.intelligence} max={100} color="blue" />
        <StatBar label="Velocidade" value={monster.speed} max={100} color="yellow" />
        <StatBar label="Adaptabilidade" value={monster.adaptability} max={100} color="green" />
      </div>

      {/* Monster Name and Personality */}
      <div className="text-center w-full mt-4 border-t border-purple-500 pt-4">
        <h3 className="text-2xl font-bold text-white mb-2">{monster.name}</h3>
        <p className="text-purple-300 text-sm">Modo: {monster.personality}</p>
        <p className="text-purple-400 italic mt-3 text-lg">\"  {message}\"</p>
      </div>

      {/* Evolution Progress */}
      <div className="w-full mt-4">
        <p className="text-white text-sm mb-2">Evolução Geral</p>
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{
              width: `${((monster.strength + monster.intelligence + monster.speed + monster.adaptability) / 400) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}

function StatBar({ label, value, max, color }) {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500'
  }

  return (
    <div>
      <div className="flex justify-between text-sm text-white mb-1">
        <span>{label}</span>
        <span className="font-bold">{value}/{max}</span>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default MonsterCompanion
