import { useState } from 'react'

function StrategyTask({ task, timeRemaining, onSuccess, onFailure }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [result, setResult] = useState(null)

  const handleOptionClick = (optionId) => {
    if (selectedOption) return

    setSelectedOption(optionId)

    const selected = task.options.find(opt => opt.id === optionId)
    const success = Math.random() > selected.risk

    if (success) {
      const reward = task.reward - Math.round(selected.risk * 100)
      setResult({ success: true, reward })
      setTimeout(() => onSuccess(reward), 1500)
    } else {
      setResult({ success: false })
      setTimeout(() => onFailure(), 1500)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">{task.title}</h2>
        <p className="text-purple-300 text-lg">{task.description}</p>
      </div>

      {/* Options */}
      <div className="w-full max-w-2xl space-y-4">
        {task.options.map(option => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={selectedOption !== null}
            className={`w-full p-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
              selectedOption === option.id
                ? 'bg-purple-600 text-white ring-4 ring-yellow-400'
                : 'bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{option.label}</span>
              <span className="text-sm opacity-75">Risco: {Math.round(option.risk * 100)}%</span>
            </div>
          </button>
        ))}
      </div>

      {/* Result */}
      {result && (
        <div className={`text-center text-3xl font-bold ${
          result.success ? 'text-green-400' : 'text-red-400'
        }`}>
          {result.success ? '✅ Estratégia Correta!' : '❌ Falha na Estratégia'}
        </div>
      )}
    </div>
  )
}

export default StrategyTask
