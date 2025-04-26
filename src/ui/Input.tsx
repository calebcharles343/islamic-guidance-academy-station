import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = "default", style, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        min={type === "number" ? 0 : undefined}
        className="w-full h-6 md:h-8 px-3 rounded-md border placeholder:text-sm focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
        style={
          inputSize !== "default"
            ? { width: `${inputSize}px`, ...style }
            : style
        }
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
