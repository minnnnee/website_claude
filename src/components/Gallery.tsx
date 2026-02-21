'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const tabs = ['전체', '아파트', '빌라', '오피스텔', '단독주택', '상업공간'];
const PAGE_SIZE = 9;

type GalleryItem = {
  id: number;
  category: string;
  label: string;
  sub: string;
  image_url: string | null;
  sort_order: number;
};

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');
  const [hovered, setHovered] = useState<number | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setItems(data);
      });
  }, []);

  const filtered = (() => {
    if (activeTab !== '전체') {
      return items.filter(item => item.category === activeTab && item.image_url);
    }
    // 전체 탭: 카테고리별로 번갈아 배치
    const groups: Record<string, GalleryItem[]> = {};
    items.filter(i => i.image_url).forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    const order = ['아파트', '빌라', '단독주택', '상업공간'];
    const cats = order.map(c => groups[c] ?? []);
    const result: GalleryItem[] = [];
    const maxLen = Math.max(0, ...cats.map(g => g.length));
    for (let i = 0; i < maxLen; i++) {
      for (const group of cats) {
        if (group[i]) result.push(group[i]);
      }
    }
    return result;
  })();

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowCount(PAGE_SIZE);
  };

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
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F', wordBreak: 'keep-all' }}>
            직접 확인하는<br className="block md:hidden" /><span style={{ color: '#C4A882' }}>시공 퀄리티</span>
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
              onClick={() => handleTabChange(tab)}
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
                  {items.filter(i => i.category === tab && i.image_url).length}
                </span>
              )}
              {tab === '전체' && activeTab === tab && (
                <span className="ml-1.5 text-xs opacity-80">{items.filter(i => i.image_url).length}</span>
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
              {visible.map((item, idx) => (
                <div
                  key={`${activeTab}-${item.id}`}
                  style={{ animation: `fadeInUp 0.5s ease-out ${idx * 60}ms both` }}
                >
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
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #E8DDD0 100%)' }}
                    >
                      <span style={{ color: '#C4A882', fontSize: '2rem' }}>🏠</span>
                    </div>
                  )}

                  <div
                    className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.85)', color: '#6B5344' }}
                  >
                    {item.category}
                  </div>

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

        {/* 더 보기 버튼 */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowCount(c => c + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'white',
                color: '#6B5344',
                border: '1.5px solid #E8DDD0',
                boxShadow: '0 4px 20px rgba(61,43,31,0.08)',
              }}
            >
              더 보기
              <span style={{ color: '#C4A882', fontSize: '12px' }}>
                ({filtered.length - showCount}장 남음)
              </span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

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
