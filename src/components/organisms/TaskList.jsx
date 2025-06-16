import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import EmptyState from '@/components/molecules/EmptyState'
import ConfirmationModal from '@/components/molecules/ConfirmationModal'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, categories }) => {
  const [taskToDelete, setTaskToDelete] = useState(null)

  const handleDeleteClick = (task) => {
    setTaskToDelete(task)
  }

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.Id)
      setTaskToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setTaskToDelete(null)
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <TaskCard
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={handleDeleteClick}
                  categories={categories}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={!!taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
      />
    </>
  )
}

export default TaskList