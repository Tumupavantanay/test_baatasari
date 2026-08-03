'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const toastConfig: Record<ToastType, { icon: React.ElementType; classes: string }> = {
  success: { icon: CheckCircle, classes: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  error: { icon: AlertCircle, classes: 'bg-red-50 border-red-200 text-red-800' },
  info: { icon: Info, classes: 'bg-blue-50 border-blue-200 text-blue-800' },
  warning: { icon: AlertCircle, classes: 'bg-amber-50 border-amber-200 text-amber-800' },
};

function Toast({ toast, onDismiss }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { icon: Icon, classes } = toastConfig[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium max-w-sm w-full',
        'animate-in slide-in-from-right-5 duration-300',
        classes
      )}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-24 lg:bottom-6 right-4 z-[100] flex flex-col gap-2 items-end"
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
