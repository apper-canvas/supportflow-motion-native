import { cn } from "@/utils/cn"

const FormField = ({ label, error, required, className, children, ...props }) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-error-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-error-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField