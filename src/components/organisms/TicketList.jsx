import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { ticketService } from "@/services/api/ticketService"
import { customerService } from "@/services/api/customerService"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import StatusBadge from "@/components/molecules/StatusBadge"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"

const TicketList = ({ onCreateTicket }) => {
  const [tickets, setTickets] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTickets, setFilteredTickets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterTickets()
  }, [tickets, searchQuery])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      const [ticketsData, customersData] = await Promise.all([
        ticketService.getAll(),
        customerService.getAll()
      ])
      setTickets(ticketsData)
      setCustomers(customersData)
    } catch (err) {
      setError(err.message || "Failed to load tickets")
    } finally {
      setLoading(false)
    }
  }

  const filterTickets = () => {
    if (!searchQuery.trim()) {
      setFilteredTickets(tickets)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = tickets.filter(ticket => {
      const customer = customers.find(c => c.Id === ticket.customerId)
      return (
        ticket.title.toLowerCase().includes(query) ||
        ticket.status.toLowerCase().includes(query) ||
        ticket.priority.toLowerCase().includes(query) ||
        ticket.category.toLowerCase().includes(query) ||
        customer?.companyName.toLowerCase().includes(query)
      )
    })
    setFilteredTickets(filtered)
  }

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.Id === customerId)
    return customer?.companyName || "Unknown Customer"
  }

  if (loading) {
    return <Loading variant="table" />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  if (tickets.length === 0) {
    return (
      <Empty
        message="No tickets found"
        description="Create your first support ticket to get started"
        actionLabel="Create Ticket"
        onAction={onCreateTicket}
        icon="Ticket"
      />
    )
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search tickets..."
              className="w-full sm:w-64"
            />
            <Button onClick={onCreateTicket} variant="primary">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </Card.Header>

      <Card.Content className="p-0">
        {filteredTickets.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <ApperIcon name="Search" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
<tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
{filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket.Id} 
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => navigate(`/tickets/${ticket.Id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                          {ticket.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ticket.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getCustomerName(ticket.customerId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ticket.assignedTo || "Unassigned"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/tickets/${ticket.Id}`)
                        }}
                      >
                        <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card.Content>
    </Card>
  )
}

export default TicketList