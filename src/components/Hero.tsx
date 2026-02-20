'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5EFE6 50%, #EDE3D8 100%)' }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full animate-blob"
          style={{
            background: 'rgba(196,168,130,0.15)',
            filter: 'blur(60px)',
            top: '10%', left: '5%',
            transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
            transition: 'transform 0.8s ease-out',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full animate-blob2"
          style={{
            background: 'rgba(232,221,208,0.4)',
            filter: 'blur(50px)',
            top: '50%', right: '5%',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
            transition: 'transform 0.6s ease-out',
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full animate-blob3"
          style={{
            background: 'rgba(212,196,176,0.25)',
            filter: 'blur(40px)',
            bottom: '15%', left: '35%',
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)`,
            transition: 'transform 0.7s ease-out',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">

        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          <div
            className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span
              className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(196,168,130,0.2)', color: '#6B5344' }}
            >
              ✨ 여성 전문 도배사
            </span>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4" style={{ color: '#3D2B1F' }}>
              당신의 공간에<br />
              <span style={{ color: '#C4A882' }}>감성</span>을 더하다
            </h1>

            <p className="text-base italic mb-6 font-light" style={{ color: '#8B7355' }}>
              Designing Spaces, Crafting Emotions
            </p>

            <p className="text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: '#6B5344' }}>
              섬세한 손끝에서 시작되는 공간의 변화.<br />
              여성 도배사의 따뜻한 감각으로 벽지 한 장에도<br />
              이야기를 담아드립니다.
            </p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mb-8">
              {[
                { num: '500+', label: '시공 완료' },
                { num: '98%', label: '고객 만족도' },
                { num: '24h', label: '빠른 답변' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black" style={{ color: '#3D2B1F' }}>{stat.num}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#8B7355' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: '#C4A882',
                  boxShadow: '0 8px 25px rgba(196,168,130,0.4)',
                }}
              >
                무료 상담 신청
              </button>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  border: '2px solid #C4A882',
                  color: '#6B5344',
                  background: 'transparent',
                }}
              >
                시공 사진 보기
              </button>
            </div>
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div
          className="flex-1 relative w-full"
          style={{ height: '480px', perspective: '1200px' }}
        >
          <div
            ref={sceneRef}
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 8}deg)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            {/* Main backdrop card */}
            <div
              className="absolute rounded-3xl overflow-hidden shadow-2xl"
              style={{
                inset: '40px 60px',
                background: 'linear-gradient(135deg, #E8DDD0 0%, #D4C4B0 100%)',
                transform: 'translateZ(0px)',
              }}
            >
              <div className="pattern-diagonal w-full h-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ color: '#6B5344' }}>
                <div className="text-6xl mb-3">🏠</div>
                <div className="text-lg font-bold">감성도배</div>
                <div className="text-sm opacity-70 mt-1">나만의 공간을 완성하다</div>
              </div>
            </div>

            {/* Card 1 - top left */}
            <div
              className="absolute rounded-2xl overflow-hidden shadow-xl animate-float1"
              style={{
                top: '10px', left: '10px',
                width: '130px', height: '160px',
                background: 'linear-gradient(135deg, #F5EFE6 0%, #E8DDD0 100%)',
              }}
            >
              <div className="pattern-stripe w-full h-full" />
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium" style={{ color: '#6B5344' }}>
                스트라이프
              </div>
            </div>

            {/* Card 2 - top right */}
            <div
              className="absolute rounded-2xl overflow-hidden shadow-xl animate-float2"
              style={{
                top: '5px', right: '10px',
                width: '120px', height: '140px',
                background: 'linear-gradient(135deg, #EDE3D8 0%, #DDD0C0 100%)',
              }}
            >
              <div className="pattern-dot w-full h-full" />
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium" style={{ color: '#6B5344' }}>
                도트 패턴
              </div>
            </div>

            {/* Card 3 - bottom right */}
            <div
              className="absolute rounded-2xl overflow-hidden shadow-xl animate-float3"
              style={{
                bottom: '20px', right: '20px',
                width: '140px', height: '120px',
                background: 'linear-gradient(135deg, #F0E8DC 0%, #E0D4C4 100%)',
              }}
            >
              <div className="pattern-floral w-full h-full" />
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium" style={{ color: '#6B5344' }}>
                플로럴
              </div>
            </div>

            {/* Card 4 - bottom left */}
            <div
              className="absolute rounded-2xl overflow-hidden shadow-xl animate-float4"
              style={{
                bottom: '15px', left: '15px',
                width: '110px', height: '120px',
                background: 'linear-gradient(135deg, #FAF7F2 0%, #EDE3D8 100%)',
              }}
            >
              <div className="pattern-diamond w-full h-full" />
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium" style={{ color: '#6B5344' }}>
                다이아몬드
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute animate-badge"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translateZ(140px) translateX(-50%) translateY(-50%)',
                background: 'white',
                padding: '8px 16px',
                borderRadius: '100px',
                boxShadow: '0 8px 30px rgba(61,43,31,0.15)',
                whiteSpace: 'nowrap',
                fontSize: '13px',
                fontWeight: '600',
                color: '#6B5344',
              }}
            >
              ✨ 세심한 마감
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{
          transform: 'translateX(-50%)',
          color: '#8B7355',
          animation: 'scrollBounce 2s ease-in-out infinite',
        }}
      >
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(8px); }
          }
        `}</style>
        <span className="text-xs">스크롤</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
