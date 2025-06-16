import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { format } from 'date-fns'

const AddTaskForm = ({ categories, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium',
    category: categories[0]?.name || 'Personal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'bg-success', icon: 'ChevronDown' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-warning', icon: 'Minus' },
    { value: 'high', label: 'High Priority', color: 'bg-error', icon: 'AlertCircle' }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-12 p-6 w-full max-w-md shadow-hover"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-plus-jakarta text-gray-900">
              Add New Task
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-8 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Add a description..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category.Id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorityOptions.map(option => (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChange('priority', option.value)}
                    className={`p-3 rounded-8 border-2 transition-all duration-200 ${
                      formData.priority === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-3 h-3 rounded-full ${option.color}`} />
                      <span className="text-xs font-medium text-gray-700">
                        {option.value.charAt(0).toUpperCase() + option.value.slice(1)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-8 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!formData.title.trim() || isSubmitting}
                className="flex-1 px-4 py-3 gradient-primary text-white rounded-8 font-medium shadow-subtle hover:shadow-hover transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AddTaskForm