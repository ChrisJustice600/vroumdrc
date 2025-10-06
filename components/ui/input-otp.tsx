"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const InputOTP = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
    maxLength?: number;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    autoFocus?: boolean;
  }
>(
  (
    {
      className,
      maxLength = 6,
      value = "",
      onChange,
      disabled = false,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const focusHiddenInput = () => {
      inputRef.current?.focus();
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-2", className)}
        onClick={focusHiddenInput}
        role="group"
        {...props}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="sr-only"
          autoComplete="one-time-code"
        />
        {Array.from({ length: maxLength }, (_, i) => (
          <InputOTPSlot
            key={i}
            index={i}
            value={value[i] || ""}
            disabled={disabled}
          />
        ))}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <div className="w-2 h-0.5 bg-gray-300 mx-2" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number;
    value: string;
    disabled?: boolean;
  }
>(({ value, className, disabled = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-12 w-12 text-center text-xl font-bold transition-all duration-200",
      "border-2 border-gray-300 rounded-sm",
      "focus-within:border-[#a99df1] focus-within:ring-2 focus-within:ring-[#a99df1]/20",
      "hover:border-gray-400",
      value && "border-[#a99df1] bg-red-50",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-center h-full">{value}</div>
    <div className="absolute inset-0 rounded-sm ring-1 ring-transparent focus-within:ring-[#a99df1]/20" />
  </div>
));
InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
