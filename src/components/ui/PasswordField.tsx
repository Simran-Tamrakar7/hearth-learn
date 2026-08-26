"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
  required,
  placeholder,
  name,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  name?: string;
}) {
  const [show, setShow] = useState(false);
  const field = (
    <span className="relative mt-1 block">
      <input
        type={show ? "text" : "password"}
        name={name}
        className="w-full h-11 px-3 pr-10 text-sm font-normal bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A9B95] hover:text-[#1C2A26]"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((s) => !s)}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </span>
  );
  if (!label) return field;
  return (
    <label className="block text-xs font-semibold text-[#52635E]">
      {label}
      {field}
    </label>
  );
}
