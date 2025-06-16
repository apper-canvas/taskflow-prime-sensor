import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FilterSidebar from '@/components/organisms/FilterSidebar'
import TaskList from '@/components/organisms/TaskList'
import AddTaskForm from '@/components/organisms/AddTaskForm'
import { TaskService, CategoryService } from '@/services'
import { toast } from 'react-toastify'

const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all'
  })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [tasks, searchQuery, filters])

  const loadData = async () => {
    try {
      const [tasksData, categoriesData] = await Promise.all([
        TaskService.getAll(),
        CategoryService.getAll()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...tasks]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => 
        filters.status === 'completed' ? task.completed : !task.completed
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category)
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    setFilteredTasks(filtered)
  }

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await TaskService.create(taskData)
      setTasks(prev => [...prev, newTask])
      setShowAddForm(false)
      toast.success('Task created successfully!')
    } catch (error) {
      toast.error('Failed to create task')
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await TaskService.update(id, updates)
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === id ? updatedTask : task
        ))
        if (updates.completed !== undefined) {
          toast.success(updates.completed ? 'Task completed!' : 'Task reopened')
        }
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      const success = await TaskService.delete(id)
      if (success) {
        setTasks(prev => prev.filter(task => task.Id !== id))
        toast.success('Task deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  if (loading) {
    return (
      <div className="flex-1 flex">
        <div className="w-80 bg-surface border-r border-gray-200 p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded-8 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-12 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex overflow-hidden"
    >
      <FilterSidebar
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tasks={tasks}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-plus-jakarta text-gray-900">
                Tasks
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                {searchQuery || filters.status !== 'all' || filters.category !== 'all' || filters.priority !== 'all' ? ' found' : ''}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 gradient-primary text-white rounded-8 font-medium shadow-subtle hover:shadow-hover transition-shadow duration-200"
            >
              Add Task
            </motion.button>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          categories={categories}
        />
      </div>

      {showAddForm && (
        <AddTaskForm
          categories={categories}
          onSubmit={handleCreateTask}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </motion.div>
  )
}

export default TasksPage