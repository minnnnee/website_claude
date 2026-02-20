'use client';

import { useState, useEffect } from 'react';

const buttons = [
  {
    id: 'channel',
    label: '카카오채널',
    bg: '#FEE500',
    color: '#3D2B1F',
    href: 'https://pf.kakao.com/_zHwMn',
    icon: (
      // 카카오톡 말풍선 공식 아이콘 형태
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.686 2 11c0 2.698 1.573 5.086 3.97 6.538L5 21l4.207-2.103A11.7 11.7 0 0012 19c5.523 0 10-3.686 10-8S17.523 3 12 3z"/>
        <ellipse cx="8.5" cy="11" rx="1.3" ry="1.3" fill="#FEE500"/>
        <ellipse cx="12" cy="11" rx="1.3" ry="1.3" fill="#FEE500"/>
        <ellipse cx="15.5" cy="11" rx="1.3" ry="1.3" fill="#FEE500"/>
      </svg>
    ),
  },
  {
    id: 'blog',
    label: '네이버 블로그',
    bg: '#03C75A',
    color: 'white',
    href: 'https://blog.naver.com/seswotn11',
    icon: (
      // 네이버 N 로고
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 3h-2.5L12 7.5 10.5 3H8v18h2.5v-9l1.5 4 1.5-4v9H16V3z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: '인스타그램',
    bg: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    color: 'white',
    href: 'https://www.instagram.com/leejeongsuk1224',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.2"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: '틱톡',
    bg: '#010101',
    color: 'white',
    href: 'https://www.tiktok.com/@dobae_dobae',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z"/>
      </svg>
    ),
  },
];

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3"
      style={{ bottom: '28px', right: '20px' }}
    >
      {/* 상담문의 ~ 인스타그램 버튼 */}
      {buttons.map((btn, i) => (
        <div
          key={btn.id}
          className="relative flex items-center"
          style={{
            animation: `fabSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms both`,
          }}
          onMouseEnter={() => setHoveredId(btn.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* 툴팁 */}
          <div
            className="absolute right-16 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none transition-all duration-200"
            style={{
              background: '#3D2B1F',
              color: 'white',
              opacity: hoveredId === btn.id ? 1 : 0,
              transform: hoveredId === btn.id ? 'translateX(0) scale(1)' : 'translateX(6px) scale(0.95)',
            }}
          >
            {btn.label}
          </div>

          {/* 버튼 */}
          <a
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              width: '52px',
              height: '52px',
              background: btn.bg,
              color: btn.color,
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              textDecoration: 'none',
            }}
            aria-label={btn.label}
          >
            {btn.icon}
          </a>
        </div>
      ))}

      {/* TOP 버튼 */}
      <div
        className="relative flex items-center"
        style={{
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(10px)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
        onMouseEnter={() => setHoveredId('top')}
        onMouseLeave={() => setHoveredId(null)}
      >
        <div
          className="absolute right-16 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none transition-all duration-200"
          style={{
            background: '#3D2B1F',
            color: 'white',
            opacity: hoveredId === 'top' ? 1 : 0,
            transform: hoveredId === 'top' ? 'translateX(0) scale(1)' : 'translateX(6px) scale(0.95)',
          }}
        >
          맨 위로
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            width: '52px',
            height: '52px',
            background: '#6B5344',
            boxShadow: '0 4px 16px rgba(61,43,31,0.3)',
          }}
          aria-label="맨 위로"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fabSlideIn {
          from { opacity: 0; transform: translateX(20px) scale(0.8); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
