import CustomerList from "@/components/organisms/CustomerList"

const Customers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Customers</h1>
        <p className="text-gray-600">
          View and manage your customer information
        </p>
      </div>

      <CustomerList />
    </div>
  )
}

export default Customers