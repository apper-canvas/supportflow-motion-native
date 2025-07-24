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
    const createdAt = new Date().toISOString()
    const newTicket = {
      ...ticketData,
      Id: Math.max(...tickets.map(t => t.Id)) + 1,
      status: "Open",
      assignedTo: ticketData.assignedTo || "",
      createdAt,
      updatedAt: createdAt,
      statusHistory: [
        {
          status: "Open",
          changedAt: createdAt,
          changedBy: "System"
        }
      ]
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
    
    const updatedAt = new Date().toISOString()
    const currentTicket = tickets[index]
    
    // Track status changes
    let statusHistory = [...(currentTicket.statusHistory || [])]
    if (updateData.status && updateData.status !== currentTicket.status) {
      statusHistory.push({
        status: updateData.status,
        previousStatus: currentTicket.status,
        changedAt: updatedAt,
        changedBy: updateData.changedBy || "System"
      })
    }

    tickets[index] = {
      ...currentTicket,
      ...updateData,
      assignedTo: updateData.assignedTo !== undefined ? updateData.assignedTo : currentTicket.assignedTo,
      updatedAt,
      statusHistory
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