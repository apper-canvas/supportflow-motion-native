import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:ring-primary-500",
    secondary: "bg-white border-2 border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-700 shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:ring-primary-500",
    accent: "bg-gradient-to-r from-accent-500 to-purple-600 hover:from-accent-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:ring-accent-500",
    danger: "bg-gradient-to-r from-error-500 to-red-600 hover:from-error-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:ring-error-500",
    ghost: "text-gray-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button