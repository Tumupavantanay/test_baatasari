'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // stagger delay multiplier
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Simple CSS-based entrance animation as fallback
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';

    const timer = setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} id={id} className={cn('w-full', className)}>
      {children}
    </div>
  );
}
