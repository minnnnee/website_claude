'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: '🏢',
    title: '아파트 도배',
    desc: '전체 리모델링부터 부분 교체까지. 아파트 구조에 최적화된 시공으로 깔끔한 결과물을 약속합니다.',
    tags: ['전체 시공', '부분 교체', '입주 청소'],
    popular: true,
  },
  {
    icon: '🏠',
    title: '주택 도배',
    desc: '단독주택의 개성을 살린 맞춤형 도배. 공간 특성에 따른 최적의 벽지를 추천해드립니다.',
    tags: ['단독주택', '다가구', '빌라'],
    popular: false,
  },
  {
    icon: '🎯',
    title: '포인트 벽지',
    desc: '한 면만으로도 공간의 분위기를 완전히 바꿔드립니다. 감각적인 포인트 시공 전문입니다.',
    tags: ['1면 시공', '인테리어 강조', '패턴/컬러'],
    popular: false,
  },
  {
    icon: '🔲',
    title: '인테리어 필름',
    desc: '가구, 문, 바닥 등 다양한 곳에 시공 가능한 필름 작업으로 새것처럼 변신시켜 드립니다.',
    tags: ['가구 필름', '문틀', '바닥'],
    popular: false,
  },
  {
    icon: '⬜',
    title: '천장 시공',
    desc: '천장 벽지도 섬세하게. 말끔하고 평탄한 천장 마감으로 공간의 완성도를 높입니다.',
    tags: ['평면 천장', '몰딩 시공', '도색'],
    popular: false,
  },
  {
    icon: '🔧',
    title: '부분 보수',
    desc: '찢어지거나 들뜬 부분도 꼼꼼하게 보수합니다. 작은 하자도 정성껏 처리해드립니다.',
    tags: ['하자 보수', '긴급 출동', '소량 시공'],
    popular: false,
  },
];

export default function Services() {
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
      id="services"
      ref={ref}
      className="py-24 px-6"
      style={{ background: '#F5EFE6' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(196,168,130,0.2)', color: '#6B5344' }}
          >
            서비스 안내
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            어떤 공간이든 <span style={{ color: '#C4A882' }}>완벽하게</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B5344' }}>
            다양한 시공 서비스를 통해 원하시는 공간으로 변화시켜 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl transition-all duration-700 hover:scale-105 cursor-pointer"
              style={{
                background: 'white',
                border: svc.popular ? '2px solid #C4A882' : '1px solid #E8DDD0',
                boxShadow: svc.popular
                  ? '0 8px 30px rgba(196,168,130,0.2)'
                  : '0 4px 20px rgba(61,43,31,0.04)',
                transitionDelay: `${i * 80}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {svc.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: '#C4A882' }}
                >
                  인기 서비스
                </div>
              )}

              <div className="text-4xl mb-4">{svc.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#3D2B1F' }}>{svc.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B5344' }}>{svc.desc}</p>

              <div className="flex flex-wrap gap-2">
                {svc.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(196,168,130,0.15)', color: '#6B5344' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: '#C4A882' }}>
                <span>문의하기</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm mb-4" style={{ color: '#6B5344' }}>
            원하시는 서비스가 없으신가요? 무엇이든 문의해 주세요!
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105"
            style={{ background: '#C4A882', boxShadow: '0 8px 25px rgba(196,168,130,0.3)' }}
          >
            무료 상담 신청하기
          </button>
        </div>
      </div>
    </section>
  );
}
