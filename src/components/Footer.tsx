'use client';

export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: '#3D2B1F', color: '#C4A882' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black text-white mb-1">감성도배</div>
            <div className="text-sm italic mb-4" style={{ color: '#C4A882' }}>
              Designing Spaces, Crafting Emotions
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#8B7355' }}>
              세심한 여성 도배사의 손길로 당신의 공간을<br />
              아름답게 변화시켜드립니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold text-white mb-4 text-sm">빠른 메뉴</div>
            <div className="space-y-2">
              {[
                { label: '시공 포트폴리오', id: 'gallery' },
                { label: '고객 후기', id: 'reviews' },
                { label: '문의 / 예약', id: 'contact' },
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-xs transition-colors hover:text-white"
                  style={{ color: '#8B7355' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold text-white mb-4 text-sm">연락처</div>
            <div className="space-y-2 text-xs" style={{ color: '#8B7355' }}>
              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 4.18 2 2 0 012.1 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.1 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                010-3322-1992
              </div>
              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                seswotn11@naver.com
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-4">
              {[
                {
                  label: 'KakaoTalk',
                  bg: '#FEE500',
                  color: '#3D2B1F',
                  href: 'https://pf.kakao.com/_zHwMn',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.477 3 2 6.686 2 11c0 2.698 1.573 5.086 3.97 6.538L5 21l4.207-2.103A11.7 11.7 0 0012 19c5.523 0 10-3.686 10-8S17.523 3 12 3z"/>
                      <ellipse cx="8.5" cy="11" rx="1.2" ry="1.2" fill="#FEE500"/>
                      <ellipse cx="12" cy="11" rx="1.2" ry="1.2" fill="#FEE500"/>
                      <ellipse cx="15.5" cy="11" rx="1.2" ry="1.2" fill="#FEE500"/>
                    </svg>
                  ),
                },
                {
                  label: 'Blog',
                  bg: '#03C75A',
                  color: 'white',
                  href: 'https://blog.naver.com/seswotn11',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 3h-2.5L12 7.5 10.5 3H8v18h2.5v-9l1.5 4 1.5-4v9H16V3z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  bg: 'linear-gradient(45deg,#f09433,#dc2743,#bc1888)',
                  color: 'white',
                  href: 'https://www.instagram.com/leejeongsuk1224',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2.2"/>
                      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.2"/>
                    </svg>
                  ),
                },
                {
                  label: 'TikTok',
                  bg: '#010101',
                  color: 'white',
                  href: 'https://www.tiktok.com/@dobae_dobae',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: s.bg, color: s.color }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-2 text-xs"
          style={{ borderTop: '1px solid rgba(196,168,130,0.2)', color: '#8B7355' }}
        >
          <div>© 2025 감성도배. All rights reserved.</div>
          <div>Designed with ♥ for beautiful spaces</div>
        </div>
      </div>
    </footer>
  );
}
