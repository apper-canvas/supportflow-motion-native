import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "form-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = "Select"

export default Select