import Badge from "@/components/atoms/Badge"

const PriorityBadge = ({ priority, ...props }) => {
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "high"
      case "medium":
        return "medium"
      case "low":
        return "low"
      default:
        return "default"
    }
  }

  return (
    <Badge variant={getPriorityVariant(priority)} {...props}>
      {priority}
    </Badge>
  )
}

export default PriorityBadge