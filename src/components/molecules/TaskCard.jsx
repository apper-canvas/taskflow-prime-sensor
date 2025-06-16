import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const TaskCard = ({ task, onUpdate, onDelete, categories }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description
  })

  const handleToggleComplete = () => {
    onUpdate(task.Id, { completed: !task.completed })
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editData.title.trim()) {
      onUpdate(task.Id, editData)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description
    })
    setIsEditing(false)
  }

  const formatDueDate = (dateString) => {
    const date = new Date(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM dd, yyyy')
  }

  const getDueDateColor = (dateString) => {
    const date = new Date(dateString)
    if (task.completed) return 'text-gray-500'
    if (isPast(date) && !isToday(date)) return 'text-error'
    if (isToday(date)) return 'text-warning'
    return 'text-gray-600'
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error'
      case 'medium': return 'bg-warning'
      case 'low': return 'bg-success'
      default: return 'bg-gray-400'
    }
  }

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName)
    return category?.color || '#6B7280'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      className={`bg-white rounded-12 p-6 shadow-subtle hover:shadow-hover transition-all duration-200 border border-gray-100 ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleComplete}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-gradient-to-r from-success to-success border-success'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ApperIcon name="Check" className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={2}
              />
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-3 py-1 bg-primary text-white rounded-4 text-sm font-medium"
                >
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-4 text-sm font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className={`text-lg font-semibold font-plus-jakarta ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2 ml-4">
                  {task.priority === 'high' && (
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} ${
                      !task.completed ? 'animate-pulse-gentle' : ''
                    }`} />
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleEdit}
                    className="p-1 hover:bg-gray-100 rounded-4 transition-colors"
                  >
                    <ApperIcon name="Edit2" className="w-4 h-4 text-gray-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(task)}
                    className="p-1 hover:bg-gray-100 rounded-4 transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {task.description && (
                <p className={`text-gray-600 ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(task.category) }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {task.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                    <span className="text-sm text-gray-600 capitalize">
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm font-medium ${getDueDateColor(task.dueDate)}`}>
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard