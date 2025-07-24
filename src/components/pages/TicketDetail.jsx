import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { toast } from "react-toastify"
import { ticketService } from "@/services/api/ticketService"
import { customerService } from "@/services/api/customerService"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import StatusBadge from "@/components/molecules/StatusBadge"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import PlanBadge from "@/components/molecules/PlanBadge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
const agents = ["Sarah Chen", "Mike Rodriguez", "Emma Thompson"];

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    loadTicketDetails()
  }, [id])

  const loadTicketDetails = async () => {
    try {
      setLoading(true)
      setError("")
      
      const ticketData = await ticketService.getById(id)
      const customerData = await customerService.getById(ticketData.customerId)
      
      setTicket(ticketData)
      setCustomer(customerData)
    } catch (err) {
      setError(err.message || "Failed to load ticket details")
    } finally {
      setLoading(false)
    }
  }

const handleStatusChange = async (newStatus) => {
    if (newStatus === ticket.status) return
    
    try {
      setUpdating(true)
      const updatedTicket = await ticketService.update(id, { 
        status: newStatus,
        changedBy: "Current User" // In a real app, this would be the logged-in user
      })
      setTicket(updatedTicket)
      toast.success(`Ticket status updated to ${newStatus}`)
    } catch (err) {
      toast.error(err.message || "Failed to update ticket status")
    } finally {
      setUpdating(false)
    }
  }

  const handlePriorityChange = async (newPriority) => {
    try {
      setUpdating(true)
      const updatedTicket = await ticketService.update(id, { priority: newPriority })
      setTicket(updatedTicket)
      toast.success(`Ticket priority updated to ${newPriority}`)
    } catch (err) {
      toast.error(err.message || "Failed to update ticket priority")
    } finally {
      setUpdating(false)
    }
  }

  const handleAssignmentChange = async (newAssignment) => {
    try {
      setUpdating(true)
      const updatedTicket = await ticketService.update(id, { assignedTo: newAssignment })
      setTicket(updatedTicket)
      toast.success(`Ticket assignment updated to ${newAssignment || "Unassigned"}`)
    } catch (err) {
      toast.error(err.message || "Failed to update ticket assignment")
    } finally {
      setUpdating(false)
    }
  }
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadTicketDetails} />
  }

  if (!ticket || !customer) {
    return <Error message="Ticket not found" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/tickets")}
            className="p-2"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket Details</h1>
            <p className="text-gray-600">Ticket #{ticket.Id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
<Card.Header>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {ticket.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Category: {ticket.category}</span>
                    <span>•</span>
                    <span>Assigned to: {ticket.assignedTo || "Unassigned"}</span>
                    <span>•</span>
                    <span>Created {format(new Date(ticket.createdAt), "MMM d, yyyy 'at' h:mm a")}</span>
                    {ticket.updatedAt !== ticket.createdAt && (
                      <>
                        <span>•</span>
                        <span>Updated {format(new Date(ticket.updatedAt), "MMM d, yyyy 'at' h:mm a")}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {ticket.description}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Status and Priority Controls */}
<Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Update Ticket</h3>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updating}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <Select
                    value={ticket.priority}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    disabled={updating}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned To
                  </label>
                  <Select
                    value={ticket.assignedTo || ""}
                    onChange={(e) => handleAssignmentChange(e.target.value)}
                    disabled={updating}
                  >
                    <option value="">Unassigned</option>
                    {agents.map((agent) => (
                      <option key={agent} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Status History */}
          {ticket.statusHistory && ticket.statusHistory.length > 0 && (
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Status History</h3>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {ticket.statusHistory
                    .slice()
                    .reverse()
                    .map((change, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <StatusBadge status={change.status} />
                          {change.previousStatus && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>from</span>
                              <StatusBadge status={change.previousStatus} />
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {format(new Date(change.changedAt), 'MMM dd, yyyy HH:mm')}
                          </div>
                          <div className="text-xs text-gray-500">
                            by {change.changedBy}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <ApperIcon name="Building2" className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {customer.companyName}
                    </h4>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Subscription Plan</span>
                    <PlanBadge plan={customer.subscriptionPlan} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Customer Since</span>
                    <span className="text-sm text-gray-600">
                      {format(new Date(customer.createdAt), "MMM yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2" />
                  Add Response
                </Button>
                <Button variant="secondary" className="w-full">
                  <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                  Email Customer
                </Button>
                <Button variant="secondary" className="w-full">
                  <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                  Log Time
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail