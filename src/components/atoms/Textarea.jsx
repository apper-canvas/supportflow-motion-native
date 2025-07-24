import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "form-textarea w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea