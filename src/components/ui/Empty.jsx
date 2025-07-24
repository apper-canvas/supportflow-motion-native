import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  message = "No data found", 
  description = "Get started by creating your first item",
  actionLabel = "Get Started",
  onAction,
  icon = "Package",
  className 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ApperIcon name={icon} className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <Button 
            onClick={onAction}
            variant="primary"
            className="w-full"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Empty