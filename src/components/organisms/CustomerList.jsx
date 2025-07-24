import { useState, useEffect } from "react"
import { format } from "date-fns"
import { customerService } from "@/services/api/customerService"
import Card from "@/components/atoms/Card"
import SearchBar from "@/components/molecules/SearchBar"
import PlanBadge from "@/components/molecules/PlanBadge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCustomers, setFilteredCustomers] = useState([])

  useEffect(() => {
    loadCustomers()
  }, [])

  useEffect(() => {
    filterCustomers()
  }, [customers, searchQuery])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      setError("")
      const customersData = await customerService.getAll()
      setCustomers(customersData)
    } catch (err) {
      setError(err.message || "Failed to load customers")
    } finally {
      setLoading(false)
    }
  }

  const filterCustomers = () => {
    if (!searchQuery.trim()) {
      setFilteredCustomers(customers)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = customers.filter(customer =>
      customer.companyName.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.subscriptionPlan.toLowerCase().includes(query)
    )
    setFilteredCustomers(filtered)
  }

  if (loading) {
    return <Loading variant="table" />
  }

  if (error) {
    return <Error message={error} onRetry={loadCustomers} />
  }

  if (customers.length === 0) {
    return (
      <Empty
        message="No customers found"
        description="Customer information will appear here once you have support tickets"
        icon="Building2"
      />
    )
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Customers</h2>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search customers..."
            className="w-full sm:w-64"
          />
        </div>
      </Card.Header>

      <Card.Content className="p-0">
        {filteredCustomers.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <ApperIcon name="Search" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Since
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.Id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <ApperIcon name="Building2" className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.companyName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PlanBadge plan={customer.subscriptionPlan} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(customer.createdAt), "MMM d, yyyy")}
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

export default CustomerList