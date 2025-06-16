import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { TaskService } from '@/services'

const Header = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const tasks = await TaskService.getAll()
      const completed = tasks.filter(task => task.completed).length
      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-8 flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-plus-jakarta text-gray-900">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-600">
              Organize your tasks efficiently
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {stats.total}
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-success">
                {stats.completed}
              </div>
              <div className="text-xs text-gray-600">Done</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-warning">
                {stats.pending}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray={`${completionRate}, 100`}
                  className="transition-all duration-500 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-900">
                  {completionRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header