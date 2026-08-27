"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  id?: string;
  name?: string;
};

/** Show/hide password field with lock + eye icons (profile / reset forms). */
export function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "new-password",
  required,
  minLength,
  className = "",
  id,
  name,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95] pointer-events-none" />
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-11 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9B95] hover:text-[#52635E]"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}
