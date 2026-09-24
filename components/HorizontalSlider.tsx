"use client";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function HorizontalSlider({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const items = Children.toArray(children),
    track = useRef<HTMLDivElement>(null),
    [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false),
    [pageVisible, setPageVisible] = useState(true),
    [visibleCount, setVisibleCount] = useState(1);
  const max = useCallback(
    () => Math.max(0, items.length - visibleCount),
    [items.length, visibleCount],
  );
  const go = useCallback(
    (next: number) => {
      const value = Math.min(Math.max(next, 0), max());
      setIndex(value);
      const el = track.current,
        card = el?.firstElementChild as HTMLElement | null;
      if (el && card)
        el.scrollTo({
          left: value * (card.offsetWidth + 24),
          behavior: "smooth",
        });
    },
    [max],
  );
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || paused || !pageVisible || items.length <= visibleCount) return;
    const timer = window.setInterval(
      () =>
        setIndex((current) => {
          const next = current >= max() ? 0 : current + 1,
            el = track.current,
            card = el?.firstElementChild as HTMLElement | null;
          if (el && card)
            el.scrollTo({
              left: next * (card.offsetWidth + 24),
              behavior: "smooth",
            });
          return next;
        }),
      5000,
    );
    return () => clearInterval(timer);
  }, [items.length, max, pageVisible, paused, visibleCount]);
  useEffect(() => { const update=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update) }, []);
  useEffect(() => {
    const resize = () => {
      const nextVisibleCount =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      setVisibleCount(nextVisibleCount);
      setIndex((current) =>
        Math.min(current, Math.max(0, items.length - nextVisibleCount)),
      );
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [items.length]);
  if (!items.length) return null;
  return (
    <div
      role="region"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      className="space-y-5"
    >
      <div
        ref={track}
        onScroll={() => {
          const el = track.current,
            card = el?.firstElementChild as HTMLElement | null;
          if (el && card)
            setIndex(Math.round(el.scrollLeft / (card.offsetWidth + 24)));
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-[calc(100%-1rem)] snap-start sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)]"
          >
            {item}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex gap-1.5">
            {Array.from({ length: max() + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ke slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === Math.min(index, max()) ? "w-7 bg-emerald-600" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index <= 0}
              aria-label="Slide sebelumnya"
              className="rounded-full border bg-white p-2.5 text-slate-700 shadow-sm disabled:opacity-35"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index >= max()}
              aria-label="Slide berikutnya"
              className="rounded-full border bg-white p-2.5 text-slate-700 shadow-sm disabled:opacity-35"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
