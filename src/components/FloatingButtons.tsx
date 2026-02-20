'use client';

import { useState, useEffect } from 'react';

const buttons = [
  {
    id: 'kakao',
    label: '카카오톡',
    icon: '💬',
    bg: '#FEE500',
    color: '#3D2B1F',
    href: '#',
  },
  {
    id: 'blog',
    label: '블로그',
    icon: '📝',
    bg: '#03C75A',
    color: 'white',
    href: '#',
  },
  {
    id: 'channel',
    label: '카카오채널',
    icon: 'Ch',
    bg: '#FAE100',
    color: '#3D2B1F',
    href: '#',
    isText: true,
  },
  {
    id: 'instagram',
    label: '인스타그램',
    icon: '📸',
    bg: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    color: 'white',
    href: '#',
  },
];

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className="fixed z-50 flex flex-col items-center gap-3"
      style={{ bottom: '24px', right: '24px' }}
    >
      {/* Expanded Buttons */}
      <div className="flex flex-col items-center gap-3">
        {buttons.map((btn, i) => (
          <div
            key={btn.id}
            className="relative flex items-center"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
              transition: `all 0.3s cubic-bezier(0.34,1.56,0.64,1) ${(buttons.length - 1 - i) * 60}ms`,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
            onMouseEnter={() => setHoveredId(btn.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tooltip */}
            {hoveredId === btn.id && (
              <div
                className="absolute right-14 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
                style={{ background: '#3D2B1F', color: 'white' }}
              >
                {btn.label}
              </div>
            )}

            {/* Button */}
            <a
              href={btn.href}
              className="floating-btn w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: btn.bg,
                color: btn.color,
                boxShadow: '0 4px 15px rgba(61,43,31,0.2)',
                fontSize: btn.isText ? '12px' : '20px',
                fontWeight: btn.isText ? '800' : 'normal',
                textDecoration: 'none',
              }}
              onClick={e => e.preventDefault()}
            >
              {btn.icon}
            </a>
          </div>
        ))}

        {/* TOP Button */}
        {showTop && (
          <div
            className="relative flex items-center"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
            onMouseEnter={() => setHoveredId('top')}
            onMouseLeave={() => setHoveredId(null)}
          >
            {hoveredId === 'top' && (
              <div
                className="absolute right-14 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
                style={{ background: '#3D2B1F', color: 'white' }}
              >
                맨 위로
              </div>
            )}
            <button
              onClick={scrollToTop}
              className="floating-btn w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white"
              style={{ background: '#6B5344', boxShadow: '0 4px 15px rgba(61,43,31,0.2)' }}
            >
              ↑
            </button>
          </div>
        )}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: '#C4A882',
          boxShadow: '0 6px 25px rgba(196,168,130,0.5)',
          transform: `rotate(${isOpen ? '45deg' : '0deg'})`,
          transition: 'transform 0.3s ease, background 0.3s ease',
        }}
        aria-label="메뉴 열기"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
