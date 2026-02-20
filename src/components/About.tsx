'use client';

import { useEffect, useRef, useState } from 'react';

const advantages = [
  {
    icon: '🎨',
    title: '타고난 색감 감각',
    desc: '공간의 분위기와 조명까지 고려한 섬세한 색상 제안으로 인테리어 완성도를 높여드립니다.',
  },
  {
    icon: '🔍',
    title: '꼼꼼한 마감 처리',
    desc: '작은 모서리 하나, 이음새 하나도 놓치지 않는 집중력으로 완벽한 마감을 보장합니다.',
  },
  {
    icon: '💬',
    title: '편안한 소통',
    desc: '집 주인의 취향과 마음을 충분히 경청하고, 원하는 분위기를 정확히 이해하여 시공합니다.',
  },
  {
    icon: '✨',
    title: '깔끔한 시공 환경',
    desc: '시공 전·중·후 언제나 깨끗하게 정리하여 불편함 없는 쾌적한 환경을 유지합니다.',
  },
  {
    icon: '🏡',
    title: '생활자 시선의 제안',
    desc: '실제 집에서 생활하는 사람의 관점으로 동선과 인테리어를 함께 고려한 제안을 드립니다.',
  },
  {
    icon: '🛡️',
    title: '믿을 수 있는 A/S',
    desc: '시공 후에도 책임지는 든든한 사후관리로 언제든지 문의하시면 빠르게 해결해드립니다.',
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
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(196,168,130,0.2)', color: '#6B5344' }}
          >
            왜 감성도배인가요?
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            여성 도배사만의 <span style={{ color: '#C4A882' }}>특별한 강점</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B5344' }}>
            단순히 벽지를 바르는 것이 아닙니다. 공간에 감성을 불어넣는
            세심하고 따뜻한 손길로 여러분의 일상을 바꿔드립니다.
          </p>
        </div>

        {/* Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl transition-all duration-700 group hover:scale-105`}
              style={{
                background: 'white',
                border: '1px solid #E8DDD0',
                boxShadow: '0 4px 20px rgba(61,43,31,0.04)',
                transitionDelay: `${i * 80}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#3D2B1F' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B5344' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div
          className={`mt-16 p-8 rounded-3xl text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            background: 'linear-gradient(135deg, #E8DDD0 0%, #F5EFE6 100%)',
          }}
        >
          <p className="text-lg font-medium mb-2" style={{ color: '#3D2B1F' }}>
            &ldquo;벽지 하나가 공간 전체를 바꿉니다&rdquo;
          </p>
          <p className="text-sm" style={{ color: '#6B5344' }}>
            감성도배는 단순한 시공을 넘어, 당신만의 공간 스토리를 함께 만들어갑니다.
          </p>
        </div>
      </div>
    </section>
  );
}
