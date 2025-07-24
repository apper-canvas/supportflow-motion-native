import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "form-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input