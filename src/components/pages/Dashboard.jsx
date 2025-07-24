import DashboardStats from "@/components/organisms/DashboardStats"
import RecentActivity from "@/components/organisms/RecentActivity"

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Monitor your support team's performance and recent activity
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity />
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">View All Tickets</p>
                <p className="text-xs text-gray-600">Manage and track support requests</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors duration-200 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Manage Customers</p>
                <p className="text-xs text-gray-600">View customer information and history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard