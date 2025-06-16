import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-12 p-6 w-full max-w-md shadow-hover"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-8 flex items-center justify-center">
                <ApperIcon name="AlertTriangle" className="w-5 h-5 text-error" />
              </div>
              <h2 className="text-lg font-bold font-plus-jakarta text-gray-900">
                {title}
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCancel}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-8 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="flex-1 px-4 py-3 bg-error text-white rounded-8 font-medium hover:bg-error/90 transition-colors"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConfirmationModal