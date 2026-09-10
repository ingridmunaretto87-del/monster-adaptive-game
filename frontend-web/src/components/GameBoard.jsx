import { useState, useEffect } from 'react'
import useGameStore from '../store/gameStore'
import { generateTask, sendPlayerAction } from '../services/gameService'
import PuzzleTask from './tasks/PuzzleTask'
import ActionTask from './tasks/ActionTask'
import StrategyTask from './tasks/StrategyTask'

function GameBoard() {
  const { gameState, difficulty, score, tasksCompleted, incrementScore, incrementTasksCompleted, setDifficulty } = useGameStore()
  const [currentTask, setCurrentTask] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [taskResult, setTaskResult] = useState(null)

  useEffect(() => {
    if (gameState === 'playing' && !currentTask) {
      const taskTypes = ['puzzle', 'action', 'strategy']
      const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)]
      const task = generateTask(difficulty, taskType)
      setCurrentTask(task)
      setTimeRemaining(task.timeLimit)
    }
  }, [gameState, currentTask, difficulty])

  useEffect(() => {
    if (gameState !== 'playing' || !currentTask) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTaskFailure()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentTask, gameState])

  const handleTaskSuccess = (points) => {
    const reward = currentTask.reward + (Math.max(0, timeRemaining) * 10)
    incrementScore(reward)
    incrementTasksCompleted()
    setDifficulty(Math.min(1, difficulty + 0.05))
    setTaskResult({ success: true, points: reward })
    
    sendPlayerAction({
      type: 'task_completed',
      success: true,
      score: reward,
      taskType: currentTask.type
    })

    setTimeout(() => {
      setTaskResult(null)
      setCurrentTask(null)
    }, 2000)
  }

  const handleTaskFailure = () => {
    setDifficulty(Math.max(0.1, difficulty - 0.03))
    setTaskResult({ success: false, points: 0 })
    
    sendPlayerAction({
      type: 'task_failed',
      success: false,
      taskType: currentTask.type
    })

    setTimeout(() => {
      setTaskResult(null)
      setCurrentTask(null)
    }, 2000)
  }

  const getTaskComponent = () => {
    if (!currentTask) return null

    const props = {
      task: currentTask,
      timeRemaining,
      onSuccess: handleTaskSuccess,
      onFailure: handleTaskFailure
    }

    switch (currentTask.type) {
      case 'puzzle':
        return <PuzzleTask {...props} />
      case 'action':
        return <ActionTask {...props} />
      case 'strategy':
        return <StrategyTask {...props} />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* HUD - Score e Info */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex gap-8">
          <div className="text-white">
            <p className="text-sm text-gray-400">PONTUAÇÃO</p>
            <p className="text-4xl font-bold text-yellow-400">{score}</p>
          </div>
          <div className="text-white">
            <p className="text-sm text-gray-400">TAREFAS</p>
            <p className="text-4xl font-bold text-blue-400">{tasksCompleted}</p>
          </div>
          <div className="text-white">
            <p className="text-sm text-gray-400">DIFICULDADE</p>
            <p className="text-4xl font-bold text-red-400">{Math.round(difficulty * 100)}%</p>
          </div>
        </div>
        
        {/* Timer */}
        <div className="text-center">
          <p className="text-sm text-gray-400">TEMPO</p>
          <div className={`text-4xl font-bold ${
            timeRemaining < 10 ? 'text-red-500 animate-pulse' : 'text-green-400'
          }`}>
            {timeRemaining}s
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border-2 border-purple-500 p-8 min-h-96 flex flex-col items-center justify-center">
        {taskResult ? (
          <div className={`text-center ${
            taskResult.success ? 'text-green-400' : 'text-red-400'
          }`}>
            <p className="text-6xl mb-4">{taskResult.success ? '✅' : '❌'}</p>
            <p className="text-2xl font-bold mb-2">
              {taskResult.success ? 'SUCESSO!' : 'FALHOU!'}
            </p>
            <p className="text-xl">{taskResult.success ? `+${taskResult.points} pontos` : 'Próxima tarefa...'}</p>
          </div>
        ) : currentTask ? (
          getTaskComponent()
        ) : (
          <p className="text-white text-xl">Carregando tarefa...</p>
        )}
      </div>
    </div>
  )
}

export default GameBoard
