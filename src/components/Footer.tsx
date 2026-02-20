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
                { label: '서비스 안내', id: 'services' },
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
              <div>📞 010-0000-0000</div>
              <div>💌 gamseong@dobae.kr</div>
              <div>🕐 평일 09:00 – 18:00</div>
              <div>📍 서울 · 경기 전 지역</div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-4">
              {[
                { label: 'KakaoTalk', icon: '💬', bg: '#FEE500', href: '#' },
                { label: 'Instagram', icon: '📸', bg: 'linear-gradient(45deg,#f09433,#dc2743,#bc1888)', href: '#' },
                { label: 'Blog', icon: '📝', bg: '#03C75A', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all hover:scale-110"
                  style={{ background: s.bg }}
                  onClick={e => e.preventDefault()}
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
