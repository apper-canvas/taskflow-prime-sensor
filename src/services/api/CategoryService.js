import categoryData from '@/services/mockData/categories.json'

class CategoryService {
  constructor() {
    this.categories = [...categoryData]
  }

  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.categories]
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(cat => cat.Id === parseInt(id))
    return category ? { ...category } : null
  }

  async create(categoryData) {
    await this.delay()
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      taskCount: 0
    }
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) return null
    
    this.categories[index] = { ...this.categories[index], ...updates }
    return { ...this.categories[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) return false
    
    this.categories.splice(index, 1)
    return true
  }
}

export default new CategoryService()