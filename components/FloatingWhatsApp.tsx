'use client'

import { useState, useEffect } from 'react'

export default function FloatingWhatsApp({ phoneNumber, message }: { phoneNumber: string; message: string }) {
  const [isVisible, setIsVisible] = useState(false)
  // Animate in after a short delay so it doesn't pop aggressively on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="relative group">
        
        {/* Tooltip text (pops out on hover) */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-[#0a1c12] text-sm font-bold rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap origin-right scale-95 group-hover:scale-100">
          Tanya Admin
          {/* Triangle pointer */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45" />
        </div>

        {/* Pulse rings */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
        
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-gradient-to-tr from-[#128C7E] to-[#25D366] rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Chat WhatsApp"
        >
          {/* Authentic WhatsApp SVG Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="white"
          >
            <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.126.556 4.195 1.614 6.012L.15 23.364l5.46-1.433a11.97 11.97 0 006.42 1.848h.005c6.648 0 12.032-5.383 12.032-12.031C24.067 5.383 18.683 0 12.031 0zm.005 21.758a10.02 10.02 0 01-5.115-1.396l-.367-.217-3.8.997 1.018-3.7-.238-.378a10.007 10.007 0 01-1.53-5.378C1.996 6.046 6.862 1.18 12.036 1.18c5.174 0 10.04 4.866 10.04 10.04 0 5.174-4.866 10.04-10.04 10.04l-.001.498zm5.502-7.514c-.302-.151-1.785-.882-2.062-.983-.277-.101-.479-.151-.68.151-.202.302-.781.983-.957 1.185-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.5-.897-.802-1.503-1.792-1.68-2.094-.176-.302-.019-.465.132-.616.136-.136.302-.353.453-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.68-1.639-.933-2.244-.246-.591-.497-.511-.68-.521h-.58c-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.52 0 1.487 1.083 2.924 1.234 3.125.151.202 2.132 3.256 5.166 4.565.722.31 1.286.495 1.724.633.725.23 1.385.197 1.905.12.583-.086 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.075-.126-.277-.202-.579-.353z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
