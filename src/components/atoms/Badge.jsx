import { cn } from "@/utils/cn"

const Badge = ({ variant = "default", size = "md", className, children, ...props }) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full shadow-sm"
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    primary: "bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-md",
    success: "bg-gradient-to-r from-success-500 to-green-600 text-white shadow-md",
    warning: "bg-gradient-to-r from-warning-500 to-orange-600 text-white shadow-md",
    danger: "bg-gradient-to-r from-error-500 to-red-600 text-white shadow-md",
    accent: "bg-gradient-to-r from-accent-500 to-purple-600 text-white shadow-md",
    // Status variants
    open: "bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-md",
    "in-progress": "bg-gradient-to-r from-warning-500 to-orange-600 text-white shadow-md",
    closed: "bg-gradient-to-r from-success-500 to-green-600 text-white shadow-md",
    // Priority variants
    high: "bg-gradient-to-r from-error-500 to-red-600 text-white shadow-md",
    medium: "bg-gradient-to-r from-warning-500 to-orange-600 text-white shadow-md",
    low: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md",
    // Plan variants
    basic: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md",
    pro: "bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-md",
    enterprise: "bg-gradient-to-r from-accent-500 to-purple-600 text-white shadow-md"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  }
  
  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge