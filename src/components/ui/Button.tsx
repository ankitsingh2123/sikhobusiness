import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "destructive" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-b from-[#FF8A1F] to-[#FF7A00] 
    text-[#3D1D00] border border-[#FF7A00]/50
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(255,122,0,0.15)]
    hover:from-[#FFA040] hover:to-[#FF8A1F] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_12px_rgba(255,122,0,0.3)]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px]
  `,
  secondary: `
    bg-gradient-to-b from-[#2A2A2A] to-[#1C1C1C]
    text-[#F0EDED] border border-white/10
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)]
    hover:border-white/20 hover:from-[#333333] hover:to-[#242424]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px]
  `,
  destructive: `
    bg-gradient-to-b from-[#F25A5A] to-[#E03131]
    text-white border border-[#E03131]/50
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(224,49,49,0.15)]
    hover:from-[#FA7070] hover:to-[#F25A5A] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_12px_rgba(224,49,49,0.3)]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px]
  `,
  outline: `
    bg-transparent text-white border border-white/20
    hover:bg-white/5 hover:border-white/30
    active:bg-white/10 active:translate-y-[1px]
  `,
  ghost: `
    bg-transparent text-[#8A8A8A] border border-transparent
    hover:bg-white/5 hover:text-white
    active:bg-white/10 active:translate-y-[1px]
  `,
  glass: `
    bg-white/5 text-white border border-white/10 backdrop-blur-md
    shadow-[0_4px_24px_rgba(0,0,0,0.2)]
    hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    active:translate-y-[1px]
  `
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
  md: "px-4 py-2 text-sm gap-2 rounded-xl",
  lg: "px-6 py-3 text-base gap-2.5 rounded-xl",
  icon: "p-2 rounded-lg"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      href,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Combine base styles
    const baseStyles = "inline-flex items-center justify-center font-bold font-sans transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]";
    
    // Determine dynamic classes
    const classes = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? "w-full" : "",
      isDisabled ? "opacity-60 cursor-not-allowed pointer-events-none grayscale-[0.2]" : "cursor-pointer",
      className
    ].filter(Boolean).join(" ");

    const content = (
      <>
        {isLoading ? (
          <span className="material-symbols-outlined animate-spin text-[1.2em]">progress_activity</span>
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </>
    );

    if (href && !isDisabled) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={isDisabled} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
