'use client';

import { useEffect, useRef, useState } from 'react';

const galleryItems = [
  {
    label: '아이보리 베이지',
    sub: '거실 전체 도배',
    pattern: 'pattern-stripe',
    bg: 'linear-gradient(135deg, #FAF7F2 0%, #E8DDD0 100%)',
    badge: '인기',
  },
  {
    label: '그레이 미니멀',
    sub: '침실 포인트',
    pattern: 'pattern-dot',
    bg: 'linear-gradient(135deg, #EDE3D8 0%, #D4C4B0 100%)',
    badge: null,
  },
  {
    label: '플로럴 패턴',
    sub: '주방 포인트벽',
    pattern: 'pattern-floral',
    bg: 'linear-gradient(135deg, #F5EFE6 0%, #E0D4C4 100%)',
    badge: '추천',
  },
  {
    label: '다이아몬드',
    sub: '아이방 전체',
    pattern: 'pattern-diamond',
    bg: 'linear-gradient(135deg, #EDE3D8 0%, #DDD0C0 100%)',
    badge: null,
  },
  {
    label: '크로스 라인',
    sub: '서재 포인트',
    pattern: 'pattern-cross',
    bg: 'linear-gradient(135deg, #F0E8DC 0%, #E8DDD0 100%)',
    badge: null,
  },
  {
    label: '내추럴 텍스처',
    sub: '현관/복도',
    pattern: 'pattern-diagonal',
    bg: 'linear-gradient(135deg, #E8DDD0 0%, #C4A882 50%, #E8DDD0 100%)',
    badge: '신규',
  },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24 px-6"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(196,168,130,0.2)', color: '#6B5344' }}
          >
            시공 포트폴리오
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            직접 확인하는 <span style={{ color: '#C4A882' }}>시공 퀄리티</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B5344' }}>
            실제 시공된 공간을 통해 감성도배의 수준 높은 마감을 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700"
              style={{
                aspectRatio: i === 0 || i === 3 ? '4/5' : '3/4',
                transitionDelay: `${i * 80}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                boxShadow: hovered === i ? '0 20px 50px rgba(61,43,31,0.15)' : '0 4px 20px rgba(61,43,31,0.06)',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pattern Background */}
              <div
                className={`absolute inset-0 ${item.pattern}`}
                style={{ background: item.bg }}
              />

              {/* Overlay on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300"
                style={{
                  background: hovered === i
                    ? 'linear-gradient(to top, rgba(61,43,31,0.7) 0%, transparent 60%)'
                    : 'linear-gradient(to top, rgba(61,43,31,0.3) 0%, transparent 50%)',
                }}
              >
                {item.badge && (
                  <span
                    className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ background: '#C4A882' }}
                  >
                    {item.badge}
                  </span>
                )}
                <div style={{ color: 'white' }}>
                  <div className="font-bold text-sm">{item.label}</div>
                  <div
                    className="text-xs mt-0.5 transition-all duration-300"
                    style={{ opacity: hovered === i ? 1 : 0.7 }}
                  >
                    {item.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm mb-6" style={{ color: '#6B5344' }}>
            더 많은 시공 사례가 궁금하신가요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{ background: '#03C75A', color: 'white' }}
            >
              📝 네이버 블로그 보기
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white' }}
            >
              📸 인스타그램 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
