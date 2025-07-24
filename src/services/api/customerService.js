import customersData from "@/services/mockData/customers.json"

let customers = [...customersData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const customerService = {
  async getAll() {
    await delay(250)
    return [...customers]
  },

  async getById(id) {
    await delay(200)
    const customer = customers.find(c => c.Id === parseInt(id))
    if (!customer) {
      throw new Error("Customer not found")
    }
    return { ...customer }
  },

  async create(customerData) {
    await delay(400)
    const newCustomer = {
      ...customerData,
      Id: Math.max(...customers.map(c => c.Id)) + 1,
      createdAt: new Date().toISOString()
    }
    customers.push(newCustomer)
    return { ...newCustomer }
  },

  async update(id, updateData) {
    await delay(300)
    const index = customers.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Customer not found")
    }
    
    customers[index] = {
      ...customers[index],
      ...updateData
    }
    return { ...customers[index] }
  },

  async delete(id) {
    await delay(250)
    const index = customers.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Customer not found")
    }
    
    customers.splice(index, 1)
    return true
  }
}