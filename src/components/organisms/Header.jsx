import ApperIcon from "@/components/ApperIcon"

const Header = ({ onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <ApperIcon name="Menu" className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center ml-2 lg:ml-0">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <ApperIcon name="Headphones" className="w-5 h-5 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            SupportFlow
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
          <ApperIcon name="Bell" className="w-5 h-5 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-error-500 to-red-600 rounded-full"></div>
        </button>
        
        <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
          <ApperIcon name="User" className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  )
}

export default Header