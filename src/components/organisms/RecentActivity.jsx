import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ticketService } from "@/services/api/ticketService"
import { customerService } from "@/services/api/customerService"
import Card from "@/components/atoms/Card"
import StatusBadge from "@/components/molecules/StatusBadge"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"

const RecentActivity = () => {
  const [recentTickets, setRecentTickets] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadRecentActivity()
  }, [])

  const loadRecentActivity = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [tickets, customersData] = await Promise.all([
        ticketService.getAll(),
        customerService.getAll()
      ])

      // Sort by updatedAt and take the 5 most recent
      const sortedTickets = tickets
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)

      setRecentTickets(sortedTickets)
      setCustomers(customersData)
    } catch (err) {
      setError(err.message || "Failed to load recent activity")
    } finally {
      setLoading(false)
    }
  }

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.Id === customerId)
    return customer?.companyName || "Unknown Customer"
  }

  if (loading) {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </Card.Header>
        <Card.Content>
          <Loading />
        </Card.Content>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </Card.Header>
        <Card.Content>
          <Error message={error} onRetry={loadRecentActivity} />
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <ApperIcon name="Activity" className="w-5 h-5 text-gray-400" />
        </div>
      </Card.Header>
      <Card.Content className="p-0">
        {recentTickets.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <ApperIcon name="Activity" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentTickets.map((ticket) => (
              <div key={ticket.Id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {ticket.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {getCustomerName(ticket.customerId)} • {ticket.category}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Updated {format(new Date(ticket.updatedAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <PriorityBadge priority={ticket.priority} size="sm" />
                    <StatusBadge status={ticket.status} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Content>
    </Card>
  )
}

export default RecentActivity