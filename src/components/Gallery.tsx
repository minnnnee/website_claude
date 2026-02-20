'use client';

import { useEffect, useRef, useState } from 'react';

const tabs = ['전체', '아파트', '빌라', '오피스텔', '단독주택', '상업공간'];

const galleryItems = [
  { id: 1, category: '아파트', label: '거실 전체 도배', sub: '아이보리 베이지', pattern: 'pattern-stripe', bg: 'linear-gradient(135deg, #FAF7F2 0%, #E8DDD0 100%)', size: 'large' },
  { id: 2, category: '아파트', label: '침실 포인트', sub: '그레이 미니멀', pattern: 'pattern-dot', bg: 'linear-gradient(135deg, #EDE3D8 0%, #D4C4B0 100%)', size: 'small' },
  { id: 3, category: '빌라', label: '주방 포인트벽', sub: '플로럴 패턴', pattern: 'pattern-floral', bg: 'linear-gradient(135deg, #F5EFE6 0%, #E0D4C4 100%)', size: 'small' },
  { id: 4, category: '단독주택', label: '아이방 전체', sub: '다이아몬드', pattern: 'pattern-diamond', bg: 'linear-gradient(135deg, #EDE3D8 0%, #DDD0C0 100%)', size: 'large' },
  { id: 5, category: '오피스텔', label: '서재 포인트', sub: '크로스 라인', pattern: 'pattern-cross', bg: 'linear-gradient(135deg, #F0E8DC 0%, #E8DDD0 100%)', size: 'small' },
  { id: 6, category: '상업공간', label: '카페 인테리어', sub: '내추럴 텍스처', pattern: 'pattern-diagonal', bg: 'linear-gradient(135deg, #E8DDD0 0%, #C4A882 50%, #E8DDD0 100%)', size: 'small' },
  { id: 7, category: '아파트', label: '현관/복도', sub: '스트라이프', pattern: 'pattern-stripe', bg: 'linear-gradient(135deg, #F5EFE6 0%, #EDE3D8 100%)', size: 'small' },
  { id: 8, category: '빌라', label: '거실 전체', sub: '플로럴 베이지', pattern: 'pattern-floral', bg: 'linear-gradient(135deg, #FAF7F2 0%, #E8DDD0 100%)', size: 'large' },
  { id: 9, category: '단독주택', label: '안방 시공', sub: '도트 패턴', pattern: 'pattern-dot', bg: 'linear-gradient(135deg, #EDE3D8 0%, #D4C4B0 100%)', size: 'small' },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');
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

  const filtered = activeTab === '전체'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24 px-6"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(196,168,130,0.2)', color: '#6B5344' }}
          >
            시공 갤러리
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            직접 확인하는 <span style={{ color: '#C4A882' }}>시공 퀄리티</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B5344' }}>
            감성도배가 완성한 아름다운 공간들을 확인해보세요.
          </p>
        </div>

        {/* 필터 탭 */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: activeTab === tab ? '#C4A882' : 'white',
                color: activeTab === tab ? 'white' : '#6B5344',
                border: `1.5px solid ${activeTab === tab ? '#C4A882' : '#E8DDD0'}`,
                boxShadow: activeTab === tab ? '0 4px 15px rgba(196,168,130,0.3)' : 'none',
              }}
            >
              {tab}
              {activeTab === tab && tab !== '전체' && (
                <span className="ml-1.5 text-xs opacity-80">
                  {galleryItems.filter(i => i.category === tab).length}
                </span>
              )}
              {tab === '전체' && activeTab === tab && (
                <span className="ml-1.5 text-xs opacity-80">{galleryItems.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* 갤러리 그리드 */}
        <div
          className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#8B7355' }}>
              <div className="text-4xl mb-3">🏠</div>
              <p className="text-sm">해당 카테고리의 시공 사례를 준비 중입니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((item, idx) => (
                /* 바깥 wrapper: fadeInUp 애니메이션만 담당 */
                <div
                  key={`${activeTab}-${item.id}`}
                  style={{ animation: `fadeInUp 0.5s ease-out ${idx * 60}ms both` }}
                >
                  {/* 안쪽 카드: hover scale 담당 (animation과 분리) */}
                  <div
                    className="relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      aspectRatio: '3/4',
                      boxShadow: hovered === item.id
                        ? '0 20px 50px rgba(61,43,31,0.22)'
                        : '0 4px 20px rgba(61,43,31,0.07)',
                      transform: hovered === item.id ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                      zIndex: hovered === item.id ? 1 : 0,
                      position: 'relative',
                    }}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                  {/* 패턴 배경 */}
                  <div
                    className={`absolute inset-0 ${item.pattern}`}
                    style={{ background: item.bg }}
                  />

                  {/* 카테고리 뱃지 */}
                  <div
                    className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.85)', color: '#6B5344' }}
                  >
                    {item.category}
                  </div>

                  {/* 오버레이 */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300"
                    style={{
                      background: hovered === item.id
                        ? 'linear-gradient(to top, rgba(61,43,31,0.7) 0%, transparent 55%)'
                        : 'linear-gradient(to top, rgba(61,43,31,0.35) 0%, transparent 50%)',
                    }}
                  >
                    <div style={{ color: 'white' }}>
                      <div className="font-bold text-sm">{item.label}</div>
                      <div
                        className="text-xs mt-0.5 transition-all duration-300"
                        style={{ opacity: hovered === item.id ? 0.85 : 0.6 }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 CTA */}
        <div className={`mt-14 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm mb-6" style={{ color: '#6B5344' }}>
            더 많은 시공 사례가 궁금하신가요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://blog.naver.com/seswotn11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{ background: '#03C75A', color: 'white' }}
            >
              📝 네이버 블로그 보기
            </a>
            <a
              href="https://www.instagram.com/leejeongsuk1224"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white' }}
            >
              📸 인스타그램 보기
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
