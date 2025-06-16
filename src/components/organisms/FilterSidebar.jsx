import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ 
  categories, 
  filters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  tasks 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: 'List' },
    { value: 'active', label: 'Active', icon: 'Circle' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priorities', icon: 'BarChart3' },
    { value: 'high', label: 'High Priority', icon: 'AlertCircle', color: 'text-error' },
    { value: 'medium', label: 'Medium Priority', icon: 'Minus', color: 'text-warning' },
    { value: 'low', label: 'Low Priority', icon: 'ChevronDown', color: 'text-success' }
  ]

  const getTaskCountByCategory = (categoryName) => {
    if (categoryName === 'all') return tasks.length
    return tasks.filter(task => task.category === categoryName).length
  }

  const getTaskCountByStatus = (status) => {
    if (status === 'all') return tasks.length
    if (status === 'completed') return tasks.filter(task => task.completed).length
    return tasks.filter(task => !task.completed).length
  }

  const getTaskCountByPriority = (priority) => {
    if (priority === 'all') return tasks.length
    return tasks.filter(task => task.priority === priority).length
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-surface border-r border-gray-200 flex flex-col"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <ApperIcon 
            name="Search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 font-plus-jakarta">
            Status
          </h3>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange({ status: option.value })}
                className={`w-full flex items-center justify-between p-3 rounded-8 transition-all duration-200 ${
                  filters.status === option.value
                    ? 'bg-primary text-white shadow-subtle'
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon name={option.icon} className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  filters.status === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getTaskCountByStatus(option.value)}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 font-plus-jakarta">
            Categories
          </h3>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange({ category: 'all' })}
              className={`w-full flex items-center justify-between p-3 rounded-8 transition-all duration-200 ${
                filters.category === 'all'
                  ? 'bg-primary text-white shadow-subtle'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <span className="font-medium">All Categories</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${
                filters.category === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getTaskCountByCategory('all')}
              </span>
            </motion.button>
            
            {categories.map((category) => (
              <motion.button
                key={category.Id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange({ category: category.name })}
                className={`w-full flex items-center justify-between p-3 rounded-8 transition-all duration-200 ${
                  filters.category === category.name
                    ? 'bg-primary text-white shadow-subtle'
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  filters.category === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getTaskCountByCategory(category.name)}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 font-plus-jakarta">
            Priority
          </h3>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange({ priority: option.value })}
                className={`w-full flex items-center justify-between p-3 rounded-8 transition-all duration-200 ${
                  filters.priority === option.value
                    ? 'bg-primary text-white shadow-subtle'
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name={option.icon} 
                    className={`w-5 h-5 ${
                      filters.priority === option.value 
                        ? 'text-white' 
                        : option.color || 'text-gray-600'
                    }`} 
                  />
                  <span className="font-medium">{option.label}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  filters.priority === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getTaskCountByPriority(option.value)}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FilterSidebar