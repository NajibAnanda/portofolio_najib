"use client";

import * as React from "react";

type ButtonVariant = "default" | "outline" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  default: "bg-[var(--primary)] px-4 py-3 text-[var(--background)] hover:bg-[#7c5fe6]",
  outline:
    "border border-[var(--border)] bg-[var(--card)]/70 px-4 py-3 text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
  ghost: "px-4 py-3 text-[var(--foreground)] hover:text-[var(--primary)]",
};

function mergeClassName(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant = "default", children, ...props }, ref) => {
    const mergedClassName = mergeClassName(baseClass, variants[variant], className);

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: mergeClassName(mergedClassName, children.props.className),
      });
    }

    return (
      <button ref={ref} className={mergedClassName} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
