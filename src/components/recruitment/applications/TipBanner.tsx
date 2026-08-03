'use client';

import { Lightbulb } from 'lucide-react';

export default function TipBanner() {
  return (
    <div
      role="note"
      aria-label="Keyboard navigation tip"
      className="mx-5 lg:mx-6 mb-6 flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl"
    >
      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
        <Lightbulb size={14} className="text-amber-600" />
      </div>
      <p className="text-xs text-amber-800 font-medium">
        <span className="font-bold">Tip:</span> Use arrow keys{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-[10px] font-mono">
          ←
        </kbd>{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-[10px] font-mono">
          →
        </kbd>{' '}
        to move between candidates quickly.
      </p>
    </div>
  );
}
