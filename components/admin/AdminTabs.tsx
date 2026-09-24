"use client";

import { useRef, useState, useEffect, ComponentType } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TabItem {
  id: string;
  name: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
}

interface AdminTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  actions?: React.ReactNode;
}

export default function AdminTabs({
  tabs,
  activeTab,
  onChange,
  className = "",
  actions,
}: AdminTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Beri toleransi 4px untuk pembulatan subpixel
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    // Tunggu render awal
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [tabs]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -220 : 220;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScroll, 250);
  };

  return (
    <div className={`sticky top-0 z-20 relative flex items-center gap-2 bg-white/95 p-1.5 md:p-2 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur overflow-hidden ${className}`}>
      {/* Left Scroll Button with Gradient Overlay */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1.5 pr-4 bg-gradient-to-r from-white via-white/90 to-transparent">
          <button
            type="button"
            onClick={() => scroll("left")}
            title="Geser ke kiri"
            aria-label="Geser tab ke kiri"
            className="w-8 h-8 rounded-xl bg-white hover:bg-amber-50 text-slate-700 hover:text-emerald-950 flex items-center justify-center shadow-md border border-slate-200 transition-all active:scale-90 shrink-0"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-1.5 md:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth w-full px-1"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onChange(tab.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 select-none ${
                isActive
                  ? "bg-amber-500 text-emerald-950 shadow-md shadow-amber-500/20 font-bold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {Icon && (
                <Icon
                  size={17}
                  className={isActive ? "text-emerald-950" : "text-slate-400 shrink-0"}
                />
              )}
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right Scroll Button with Gradient Overlay */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1.5 pl-4 bg-gradient-to-l from-white via-white/90 to-transparent">
          <button
            type="button"
            onClick={() => scroll("right")}
            title="Geser ke kanan (ada menu berikutnya)"
            aria-label="Geser tab ke kanan"
            className="w-8 h-8 rounded-xl bg-white hover:bg-amber-50 text-slate-700 hover:text-emerald-950 flex items-center justify-center shadow-md border border-slate-200 transition-all active:scale-90 shrink-0"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      )}
      {actions && <div className="relative z-30 shrink-0">{actions}</div>}
    </div>
  );
}
