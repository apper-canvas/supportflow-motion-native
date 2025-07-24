import Badge from "@/components/atoms/Badge"

const StatusBadge = ({ status, ...props }) => {
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "open"
      case "in progress":
        return "in-progress"
      case "closed":
        return "closed"
      default:
        return "default"
    }
  }

  return (
    <Badge variant={getStatusVariant(status)} {...props}>
      {status}
    </Badge>
  )
}

export default StatusBadge