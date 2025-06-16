import TasksPage from '@/components/pages/TasksPage'

const routes = [
  {
    path: '/',
    element: <TasksPage />
  },
  {
    path: '*',
    element: <TasksPage />
  }
]

export default routes