import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckSquare" className="w-12 h-12 text-white" />
        </div>
        
        <h3 className="text-xl font-bold font-plus-jakarta text-gray-900 mb-2">
          No tasks found
        </h3>
        
        <p className="text-gray-600 mb-6">
          You don't have any tasks matching your current filters. Try adjusting your filters or create a new task to get started.
        </p>
        
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-4 bg-surface rounded-12 text-left"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-8 flex items-center justify-center">
              <ApperIcon name="Plus" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Create your first task</div>
              <div className="text-sm text-gray-600">Click the "Add Task" button to get started</div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-4 bg-surface rounded-12 text-left"
          >
            <div className="w-10 h-10 bg-secondary/10 rounded-8 flex items-center justify-center">
              <ApperIcon name="Filter" className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Adjust your filters</div>
              <div className="text-sm text-gray-600">Clear filters to see all your tasks</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default EmptyState