import Link from 'next/link'
import { Image as ImageIcon } from 'lucide-react'

/** Subtle underline-highlight on a span of text */
export function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-[#00923f] after:content-[''] after:absolute after:left-0 after:bottom-[3px] after:w-full after:h-2.5 after:bg-[#00923f]/10 after:z-[-1] px-0.5">
      {children}
    </span>
  )
}

/** Section eyebrow label */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[#00923f] uppercase tracking-widest mb-3">
      <span className="w-4 h-[2px] bg-[#00923f] rounded-full inline-block" />
      {children}
    </p>
  )
}

/** "Lihat Selengkapnya" ghost link — placed near section header */
export function SeeMoreLink({ href, label = 'Lihat Selengkapnya' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-sm font-semibold text-[#007f36] transition-colors hover:text-[#005f29]"
    >
      <span className="border-b border-[#007f36]/35 pb-0.5 transition-colors group-hover:border-[#005f29]">{label}</span>
    </Link>
  )
}

/** Card elevation class — strong but elegant */
export const cardShadow = 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_30px_-8px_rgba(0,0,0,0.1)]'
export const cardShadowHover = 'hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1),0_20px_40px_-8px_rgba(0,0,0,0.13)]'

// Reusable Image Placeholder Component
export function ImagePlaceholder({
  label,
  aspect = 'aspect-video',
  className = '',
}: {
  label: string
  aspect?: string
  className?: string
}) {
  return (
    <div className={`bg-[#f0f7f3] border border-dashed border-[#b8d9c6] rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none ${aspect} ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-white border border-[#d0e8da] flex items-center justify-center text-[#00923f] mb-3 shadow-sm">
        <ImageIcon size={20} className="opacity-70" />
      </div>
      <span className="text-sm font-semibold text-[#4a7060] leading-tight">{label}</span>
      <span className="text-xs text-[#8aaa97] mt-1 font-medium">Image Placeholder</span>
    </div>
  )
}
