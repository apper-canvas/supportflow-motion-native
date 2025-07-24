import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "BarChart3" },
    { path: "/tickets", label: "Tickets", icon: "Ticket" },
    { path: "/customers", label: "Customers", icon: "Building2" }
  ]

  // Desktop Sidebar - No transforms
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-gradient-to-b lg:from-gray-50 lg:to-white lg:border-r lg:border-gray-200 lg:shadow-sm">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-lg transform scale-[1.02]"
                    : "text-gray-600 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-primary-500"
                    )}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )

  // Mobile Sidebar - Transform overlay
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 flex z-40"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={onClose}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <ApperIcon name="X" className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ApperIcon name="Headphones" className="w-5 h-5 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  SupportFlow
                </h1>
              </div>
              
              <nav className="mt-5 px-2 space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ApperIcon
                          name={item.icon}
                          className={cn(
                            "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                            isActive ? "text-white" : "text-gray-400 group-hover:text-primary-500"
                          )}
                        />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar