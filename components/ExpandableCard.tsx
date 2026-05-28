'use client';

import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

export default function ExpandableCard({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white border-2 border-[#e8d9a0] rounded-3xl p-3 shadow-xl rotate-[-1.5deg] hover:rotate-0 transition-all duration-300 cursor-pointer relative group aspect-[210/297] mx-auto w-full flex flex-col"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex-1 w-full h-full relative rounded-2xl overflow-hidden flex flex-col">
          {children}
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white text-[#0a1c12] p-3 rounded-full shadow-lg">
              <ZoomIn size={24} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-[#0a1c12]/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          <div 
            className="relative z-10 w-full bg-white rounded-3xl p-3 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
            style={{ aspectRatio: '210/297', maxHeight: '85vh', maxWidth: 'calc(85vh * (210 / 297))' }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white text-[#0a1c12] p-2.5 sm:p-3 rounded-full shadow-xl hover:bg-gray-100 transition-colors z-20 border border-gray-100"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <div className="flex-1 w-full h-full rounded-2xl overflow-hidden flex flex-col relative bg-[#f0f7f3]">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
