import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-glow hover:scale-[1.01] hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-white/10 hover:text-foreground",
        outline: "border border-white/15 bg-white/5 hover:bg-white/10"
      },
      size: { default: "h-11 px-5 py-2", sm: "h-9 px-3", lg: "h-12 px-8 text-base" }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, children, ...props }, ref) => {
  const classes = cn(buttonVariants({ variant, size, className }));
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, { className: cn(classes, children.props.className) });
  }
  return <button className={classes} ref={ref} {...props}>{children}</button>;
});
Button.displayName = "Button";

export { Button, buttonVariants };
