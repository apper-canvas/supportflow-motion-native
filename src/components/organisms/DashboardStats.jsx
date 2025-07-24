import { useState, useEffect } from "react"
import { ticketService } from "@/services/api/ticketService"
import { customerService } from "@/services/api/customerService"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    closedTickets: 0,
    highPriorityTickets: 0,
    totalCustomers: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [tickets, customers] = await Promise.all([
        ticketService.getAll(),
        customerService.getAll()
      ])

      const newStats = {
        totalTickets: tickets.length,
        openTickets: tickets.filter(t => t.status === "Open").length,
        inProgressTickets: tickets.filter(t => t.status === "In Progress").length,
        closedTickets: tickets.filter(t => t.status === "Closed").length,
        highPriorityTickets: tickets.filter(t => t.priority === "High").length,
        totalCustomers: customers.length
      }

      setStats(newStats)
    } catch (err) {
      setError(err.message || "Failed to load dashboard statistics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading variant="cards" />
  }

  if (error) {
    return <Error message={error} onRetry={loadStats} />
  }

  const statCards = [
    {
      title: "Total Tickets",
      value: stats.totalTickets,
      icon: "Ticket",
      color: "from-primary-500 to-blue-600",
      bgColor: "from-primary-50 to-blue-50"
    },
    {
      title: "Open Tickets",
      value: stats.openTickets,
      icon: "AlertCircle",
      color: "from-primary-500 to-blue-600",
      bgColor: "from-primary-50 to-blue-50"
    },
    {
      title: "In Progress",
      value: stats.inProgressTickets,
      icon: "Clock",
      color: "from-warning-500 to-orange-600",
      bgColor: "from-warning-50 to-orange-50"
    },
    {
      title: "Resolved",
      value: stats.closedTickets,
      icon: "CheckCircle",
      color: "from-success-500 to-green-600",
      bgColor: "from-success-50 to-green-50"
    },
    {
      title: "High Priority",
      value: stats.highPriorityTickets,
      icon: "AlertTriangle",
      color: "from-error-500 to-red-600",
      bgColor: "from-error-50 to-red-50"
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: "Building2",
      color: "from-accent-500 to-purple-600",
      bgColor: "from-accent-50 to-purple-50"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
          <Card.Content className="p-6">
            <div className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  )
}

export default DashboardStats