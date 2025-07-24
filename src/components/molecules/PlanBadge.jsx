import Badge from "@/components/atoms/Badge"

const PlanBadge = ({ plan, ...props }) => {
  const getPlanVariant = (plan) => {
    switch (plan?.toLowerCase()) {
      case "basic":
        return "basic"
      case "pro":
        return "pro"
      case "enterprise":
        return "enterprise"
      default:
        return "default"
    }
  }

  return (
    <Badge variant={getPlanVariant(plan)} {...props}>
      {plan}
    </Badge>
  )
}

export default PlanBadge