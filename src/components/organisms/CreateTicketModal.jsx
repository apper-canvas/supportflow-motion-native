import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { ticketService } from "@/services/api/ticketService"
import { customerService } from "@/services/api/customerService"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Textarea from "@/components/atoms/Textarea"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"

const CreateTicketModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    customerId: "",
    priority: "Medium",
    category: "Technical Issue"
  })
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      loadCustomers()
    }
  }, [isOpen])

  const loadCustomers = async () => {
    try {
      const customersData = await customerService.getAll()
      setCustomers(customersData)
    } catch (err) {
      toast.error("Failed to load customers")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    
    if (!formData.customerId) {
      newErrors.customerId = "Please select a customer"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      await ticketService.create({
        ...formData,
        customerId: parseInt(formData.customerId)
      })
      
      toast.success("Ticket created successfully!")
      onSuccess?.()
      handleClose()
    } catch (err) {
      toast.error(err.message || "Failed to create ticket")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      customerId: "",
      priority: "Medium",
      category: "Technical Issue"
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Ticket</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField label="Title" required error={errors.title}>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Brief description of the issue"
            />
          </FormField>

          <FormField label="Customer" required error={errors.customerId}>
            <Select
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
            >
              <option value="">Select a customer</option>
              {customers.map(customer => (
                <option key={customer.Id} value={customer.Id}>
                  {customer.companyName}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Priority">
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormField>

            <FormField label="Category">
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Technical Issue">Technical Issue</option>
                <option value="Billing">Billing</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Account">Account</option>
                <option value="Integration">Integration</option>
                <option value="Mobile">Mobile</option>
                <option value="API">API</option>
                <option value="Performance">Performance</option>
                <option value="Other">Other</option>
              </Select>
            </FormField>
          </div>

          <FormField label="Description" required error={errors.description}>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed description of the issue..."
              rows={4}
            />
          </FormField>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  Create Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateTicketModal