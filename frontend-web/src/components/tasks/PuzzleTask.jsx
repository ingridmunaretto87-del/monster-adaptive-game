import { useState, useEffect } from 'react'

function PuzzleTask({ task, timeRemaining, onSuccess, onFailure }) {
  const [sequence, setSequence] = useState([])
  const [userSequence, setUserSequence] = useState([])
  const [gameSequence, setGameSequence] = useState([])
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    initializeSequence()
  }, [task])

  const initializeSequence = () => {
    const newSequence = task.patterns.map((_, i) => i)
    setSequence(newSequence)
    setGameSequence(newSequence)
    setUserSequence([])
  }

  const handleColorClick = (index) => {
    if (playing) return

    const newUserSequence = [...userSequence, index]
    setUserSequence(newUserSequence)

    if (newUserSequence[newUserSequence.length - 1] !== gameSequence[newUserSequence.length - 1]) {
      onFailure()
      return
    }

    if (newUserSequence.length === gameSequence.length) {
      onSuccess(task.reward)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">{task.title}</h2>
        <p className="text-purple-300 text-lg">{task.description}</p>
      </div>

      {/* Pattern Display */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {task.patterns.map((pattern, index) => (
          <button
            key={pattern.id}
            onClick={() => handleColorClick(index)}
            className="aspect-square rounded-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            style={{
              backgroundColor: pattern.color,
              opacity: userSequence.includes(index) ? 0.5 : 1,
              border: '3px solid rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-white mb-2">
          <span>Progresso</span>
          <span className="font-bold">{userSequence.length}/{gameSequence.length}</span>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
            style={{ width: `${(userSequence.length / gameSequence.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default PuzzleTask
