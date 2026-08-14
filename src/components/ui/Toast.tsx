"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "achievement" | "error" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastListener: ((item: Omit<ToastItem, "id">) => void) | null = null;

export const showToast = (item: Omit<ToastItem, "id">) => {
  if (toastListener) {
    toastListener(item);
  }
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  React.useEffect(() => {
    toastListener = (item) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type: "success", ...item };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    };

    return () => {
      toastListener = null;
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E7E0D3] shadow-lg shadow-[#1C2A26]/5 text-[#1C2A26]"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "achievement" && (
                <div className="p-1.5 bg-[#FEF3C7] text-[#D97706] rounded-xl animate-pulse">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
              {toast.type === "success" && (
                <div className="p-1.5 bg-[#EBF3F0] text-[#223832] rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {toast.type === "error" && (
                <div className="p-1.5 bg-red-50 text-red-600 rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="p-1.5 bg-sky-50 text-sky-600 rounded-xl">
                  <Info className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[#1C2A26] leading-tight">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[#52635E] mt-1 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8A9B95] hover:text-[#1C2A26] transition-colors p-1 rounded-lg"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  return {
    toast: showToast,
  };
}
