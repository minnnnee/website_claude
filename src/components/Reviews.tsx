'use client';

import { useEffect, useRef, useState } from 'react';

const reviews = [
  {
    name: '김○○ 고객님',
    location: '서울 마포구',
    rating: 5,
    text: '이사하면서 전체 도배를 맡겼는데 정말 만족스러워요. 색상 추천도 너무 잘 해주셔서 집이 훨씬 넓어 보이고 분위기가 확 바뀌었어요. 꼼꼼하게 마무리해 주셔서 군더더기 하나 없어요!',
    date: '2024.12',
    highlight: '색상 추천이 탁월해요',
  },
  {
    name: '박○○ 고객님',
    location: '경기 수원시',
    rating: 5,
    text: '여자 분이라 처음엔 걱정했는데 완전 기우였어요. 오히려 더 꼼꼼하고 섬세하게 해주셔서 놀랐습니다. 침실 포인트 벽지 시공이 정말 예쁘게 됐어요. 주변에 다 추천하고 있어요.',
    date: '2025.01',
    highlight: '꼼꼼하고 섬세한 시공',
  },
  {
    name: '이○○ 고객님',
    location: '서울 강동구',
    rating: 5,
    text: '상담부터 시공 완료까지 전 과정이 너무 편했어요. 제 취향을 잘 파악하셔서 제안해주신 벽지가 딱 마음에 들었고, 깔끔하게 마무리해 주셨어요. 이사할 때마다 꼭 다시 부를게요!',
    date: '2025.02',
    highlight: '취향 파악이 정확해요',
  },
];

export default function Reviews() {
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
      id="reviews"
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
            고객 후기
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            고객님들의 <span style={{ color: '#C4A882' }}>진심 어린 후기</span>
          </h2>
          <p className="text-base" style={{ color: '#6B5344' }}>
            감성도배와 함께한 고객분들의 생생한 이야기입니다.
          </p>
        </div>

        {/* Stats Bar */}
        <div
          className={`grid grid-cols-3 gap-4 mb-12 p-6 rounded-2xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'white', border: '1px solid #E8DDD0' }}
        >
          {[
            { num: '500+', label: '누적 시공' },
            { num: '98%', label: '재방문 의향' },
            { num: '★ 4.9', label: '평균 별점' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black" style={{ color: '#C4A882' }}>{s.num}</div>
              <div className="text-xs mt-1" style={{ color: '#6B5344' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-700 hover:scale-105"
              style={{
                background: 'white',
                border: '1px solid #E8DDD0',
                boxShadow: '0 4px 20px rgba(61,43,31,0.04)',
                transitionDelay: `${i * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, si) => (
                  <span key={si} className="text-lg" style={{ color: '#C4A882' }}>★</span>
                ))}
              </div>

              {/* Highlight */}
              <div
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(196,168,130,0.15)', color: '#6B5344' }}
              >
                &ldquo;{review.highlight}&rdquo;
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B5344' }}>
                {review.text}
              </p>

              <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid #F5EFE6' }}>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#3D2B1F' }}>{review.name}</div>
                  <div className="text-xs" style={{ color: '#8B7355' }}>{review.location}</div>
                </div>
                <div className="text-xs" style={{ color: '#8B7355' }}>{review.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
