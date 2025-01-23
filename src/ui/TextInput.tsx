// TextInput.tsx
import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  pattern?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder = "",
  value,
  onChange,
  required = false,
  type = "text",
  pattern,
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-bold text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      pattern={pattern}
      className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
    />
  </div>
);

export default TextInput;
