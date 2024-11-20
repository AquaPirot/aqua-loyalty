import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const alertVariants = cva(
  "p-4 rounded-lg border",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        destructive: "bg-red-50 border-red-200 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={alertVariants({ variant, className })} {...props} />
))
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
