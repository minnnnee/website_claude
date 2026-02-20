'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: '공간을 위한 색감 제안',
    desc: '공간의 채광, 바닥재, 가구와의 조화를 고려하여 최적의 벽지 컬러와 텍스처를 제안합니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    title: '공간의 격을 높이는 디테일',
    desc: '작은 마감 하나도 놓치지 않는 꼼꼼함으로 프리미엄 퀄리티의 결과물을 완성합니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: '진정성 있는 소통',
    desc: '고객님의 라이프스타일과 취향을 깊이 이해하고, 가장 적합한 방향을 함께 고민합니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: '책임 있는 시공 보장',
    desc: '도배 전 기초 작업부터 시공 후 마무리까지 변함없는 책임감으로 함께합니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="about"
      ref={ref}
      className="py-24 px-6"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            왜 <span style={{ color: '#C4A882' }}>감성도배</span>일까요?
          </h2>
          <p className="text-base" style={{ color: '#6B5344' }}>
            단순히 벽지를 바르는 것을 넘어, 머물고 싶은 공간을 만듭니다.
          </p>
        </div>

        {/* 카드 4개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-700"
              style={{
                background: 'white',
                border: '1px solid #F0E8E0',
                boxShadow: '0 2px 16px rgba(61,43,31,0.05)',
                transitionDelay: `${i * 80}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {/* 아이콘 박스 */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                style={{ background: '#F5EFE6', color: '#8B7355' }}
              >
                {item.icon}
              </div>

              <h3 className="font-bold text-base mb-3 leading-snug" style={{ color: '#3D2B1F' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B5344' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
