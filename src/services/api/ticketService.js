import ticketsData from "@/services/mockData/tickets.json"

let tickets = [...ticketsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const ticketService = {
  async getAll() {
    await delay(300)
    return [...tickets]
  },

  async getById(id) {
    await delay(200)
    const ticket = tickets.find(t => t.Id === parseInt(id))
    if (!ticket) {
      throw new Error("Ticket not found")
    }
    return { ...ticket }
  },

  async create(ticketData) {
    await delay(400)
    const newTicket = {
      ...ticketData,
      Id: Math.max(...tickets.map(t => t.Id)) + 1,
      status: "Open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tickets.push(newTicket)
    return { ...newTicket }
  },

  async update(id, updateData) {
    await delay(300)
    const index = tickets.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Ticket not found")
    }
    
    tickets[index] = {
      ...tickets[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    return { ...tickets[index] }
  },

  async delete(id) {
    await delay(250)
    const index = tickets.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Ticket not found")
    }
    
    tickets.splice(index, 1)
    return true
  },

  async getByStatus(status) {
    await delay(300)
    return tickets.filter(t => t.status === status).map(t => ({ ...t }))
  },

  async getByPriority(priority) {
    await delay(300)
    return tickets.filter(t => t.priority === priority).map(t => ({ ...t }))
  }
}