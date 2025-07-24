import { useState } from "react"
import TicketList from "@/components/organisms/TicketList"
import CreateTicketModal from "@/components/organisms/CreateTicketModal"

const Tickets = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCreateTicket = () => {
    setShowCreateModal(true)
  }

  const handleTicketCreated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support Tickets</h1>
        <p className="text-gray-600">
          Manage and track customer support requests
        </p>
      </div>

      <TicketList
        key={refreshTrigger}
        onCreateTicket={handleCreateTicket}
      />

      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleTicketCreated}
      />
    </div>
  )
}

export default Tickets