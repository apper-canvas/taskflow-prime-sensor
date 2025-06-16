import taskData from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...taskData]
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.tasks]
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(task => task.Id === parseInt(id))
    return task ? { ...task } : null
  }

  async create(taskData) {
    await this.delay()
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    }
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) return null
    
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) return false
    
    this.tasks.splice(index, 1)
    return true
  }
}

export default new TaskService()