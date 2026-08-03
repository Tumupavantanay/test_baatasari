'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported?: (count: number) => void;
}

export default function ImportCSVModal({ isOpen, onClose, onImported }: ImportCSVModalProps) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) { setFile(null); setError(''); setProcessing(false); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const validateFile = (f: File) => {
    if (!f.name.endsWith('.csv')) { setError('Only .csv files are accepted.'); return false; }
    if (f.size > 5 * 1024 * 1024) { setError('File must be under 5 MB.'); return false; }
    setError('');
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && validateFile(f)) setFile(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && validateFile(f)) setFile(f);
  };

  const handleImport = async () => {
    if (!file) return;
    setProcessing(true);
    // TODO: replace with API call → POST /api/club-admin/members/import (multipart/form-data)
    await new Promise((r) => setTimeout(r, 1500));
    setProcessing(false);
    onImported?.(42); // mock: API returns count of imported members
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" aria-modal="true" role="dialog" aria-label="Import members CSV">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md mx-0 sm:mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF2FB] flex items-center justify-center">
              <Upload size={18} className="text-[#A1BCE6]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0C1E3C]">Import Members</h2>
              <p className="text-xs text-[#828894]">Upload a CSV file to bulk-add members</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close import modal" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F8F6F0] transition-all">
            <X size={16} className="text-[#828894]" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
              dragging ? 'border-[#A1BCE6] bg-[#EBF2FB]/50' : file ? 'border-emerald-300 bg-emerald-50/40' : 'border-[#E5E7EB] hover:border-[#A1BCE6] hover:bg-[#F8F6F0]'
            }`}
            aria-label="Drop CSV file here or click to browse"
          >
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} className="hidden" aria-label="CSV file input" />
            {file ? (
              <>
                <FileText size={32} className="mx-auto mb-2 text-emerald-500" />
                <p className="text-sm font-semibold text-[#0C1E3C]">{file.name}</p>
                <p className="text-xs text-[#828894] mt-0.5">{(file.size / 1024).toFixed(1)} KB · Ready to import</p>
              </>
            ) : (
              <>
                <Upload size={32} className="mx-auto mb-2 text-[#A1BCE6]" />
                <p className="text-sm font-semibold text-[#0C1E3C]">Drop your CSV here</p>
                <p className="text-xs text-[#828894] mt-0.5">or click to browse · Max 5 MB</p>
              </>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Template download */}
          <button
            aria-label="Download CSV template"
            className="w-full py-2 text-xs text-[#A1BCE6] hover:text-[#0C1E3C] font-medium transition-colors"
          >
            Download CSV template
          </button>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-medium text-[#828894] hover:border-[#A1BCE6] hover:text-[#0C1E3C] transition-all">
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!file || processing}
              className="flex-1 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all active:scale-95"
            >
              {processing ? 'Importing...' : 'Import Members'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
