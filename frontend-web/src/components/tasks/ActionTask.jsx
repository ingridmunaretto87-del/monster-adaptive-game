import { useState, useEffect } from 'react'

function ActionTask({ task, timeRemaining, onSuccess, onFailure }) {
  const [targets, setTargets] = useState([])
  const [hitsCount, setHitsCount] = useState(0)
  const [missesCount, setMissesCount] = useState(0)

  useEffect(() => {
    generateTargets()
    const interval = setInterval(generateTargets, 500 / task.speed)
    return () => clearInterval(interval)
  }, [task.speed])

  useEffect(() => {
    if (hitsCount >= task.targetCount) {
      onSuccess(task.reward)
    }
  }, [hitsCount, task.targetCount, task.reward, onSuccess])

  const generateTargets = () => {
    const newTargets = Array.from({ length: task.targetCount }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10
    }))
    setTargets(newTargets)
  }

  const handleTargetClick = (targetId, e) => {
    e.stopPropagation()
    setTargets(targets.filter(t => t.id !== targetId))
    setHitsCount(hitsCount + 1)
  }

  const handleMiss = () => {
    if (missesCount + 1 >= 5) {
      onFailure()
    } else {
      setMissesCount(missesCount + 1)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-white mb-2">{task.title}</h2>
        <p className="text-purple-300">{task.description}</p>
      </div>

      {/* Game Area */}
      <div
        className="relative w-full h-96 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl overflow-hidden border-2 border-purple-500"
        onClick={handleMiss}
      >
        {/* Targets */}
        {targets.map(target => (
          <button
            key={target.id}
            onClick={(e) => handleTargetClick(target.id, e)}
            className="absolute w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full cursor-pointer transform hover:scale-110 transition-transform animate-pulse shadow-lg border-2 border-yellow-300"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-6 text-white">
        <div>
          <p className="text-sm text-gray-400">ACERTOS</p>
          <p className="text-3xl font-bold text-green-400">{hitsCount}/{task.targetCount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">ERROS</p>
          <p className="text-3xl font-bold text-red-400">{missesCount}/5</p>
        </div>
      </div>
    </div>
  )
}

export default ActionTask
