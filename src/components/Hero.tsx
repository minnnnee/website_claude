'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

type HeroImage = {
  id: number;
  image_url: string;
  alt: string;
  mood: string;
  description: string;
  sort_order: number;
};

const fallbackRooms: HeroImage[] = [
  { id: 0, image_url: '/greenorange.jpg', alt: '그린 오렌지 감성 공간', mood: '그린 오렌지', description: '생동감 넘치는 자연의 분위기', sort_order: 1 },
  { id: 1, image_url: '/deepgray.jpg', alt: '딥 그레이 모던 공간', mood: '딥 그레이', description: '세련되고 도시적인 분위기', sort_order: 2 },
  { id: 2, image_url: '/brown.jpg', alt: '브라운 웜톤 공간', mood: '웜 브라운', description: '따뜻하고 고급스러운 분위기', sort_order: 3 },
  { id: 3, image_url: '/pink.jpg', alt: '핑크 로맨틱 공간', mood: '소프트 핑크', description: '사랑스럽고 감성적인 분위기', sort_order: 4 },
  { id: 4, image_url: '/begienew.jpg', alt: '뉴 베이지 감성 공간', mood: '뉴 베이지', description: '포근하고 편안한 분위기', sort_order: 5 },
];

const INTERVAL_MS = 5000;

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rooms, setRooms] = useState<HeroImage[]>(fallbackRooms);

  useEffect(() => {
    supabase
      .from('hero_images')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setRooms(data);
      });
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + 100 / (INTERVAL_MS / 50);
      });
    }, 50);

    const slideInterval = setInterval(() => {
      setActiveRoom(r => (r + 1) % rooms.length);
      setProgress(0);
    }, INTERVAL_MS);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [rooms.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── 배경 이미지 레이어 ── */}
      {rooms.map((room, i) => (
        <div
          key={room.id}
          className="absolute inset-0"
          style={{
            opacity: activeRoom === i ? 1 : 0,
            transition: 'opacity 1.4s ease-in-out',
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-5%',
              transform: `
                scale(1.06)
                translateX(${mousePos.x * -10}px)
                translateY(${mousePos.y * -7}px)
                rotateX(${mousePos.y * -0.8}deg)
                rotateY(${mousePos.x * 0.8}deg)
              `,
              transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)',
              perspective: '1200px',
            }}
          >
            <Image
              src={room.image_url}
              alt={room.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>
      ))}

      {/* ── 다크 오버레이 (텍스트 가독성) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(30,20,15,0.45) 0%, rgba(30,20,15,0.25) 40%, rgba(30,20,15,0.55) 100%)',
          zIndex: 2,
        }}
      />

      {/* ── 텍스트 콘텐츠 (역방향 패럴랙스) ── */}
      <div
        className="relative w-full z-10"
        style={{ zIndex: 3 }}
      >
        <div
          className="max-w-5xl mx-auto px-6 py-32 text-center"
          style={{
            transform: `translateX(${mousePos.x * 6}px) translateY(${mousePos.y * 4}px)`,
            transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* 배지 */}
          <div
            className={`inline-block text-sm font-medium px-5 py-2 rounded-full mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              background: 'rgba(196,168,130,0.25)',
              border: '1px solid rgba(196,168,130,0.5)',
              color: '#F5EFE6',
              backdropFilter: 'blur(8px)',
            }}
          >
            ✨ 여성 전문 도배사 · 감성도배
          </div>

          {/* 메인 제목 */}
          <h1
            className={`font-black leading-tight mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              color: 'white',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}
          >
            당신이 원하는 분위기,<br />
            <span style={{ color: '#E8DDD0' }}>벽지 하나로 완성됩니다</span>
          </h1>

          {/* 슬로건 */}
          <p
            className={`text-lg italic mb-4 transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'rgba(232,221,208,0.85)' }}
          >
            Designing Spaces, Crafting Emotions
          </p>

          {/* 설명 */}
          <p
            className={`text-base leading-relaxed mb-10 transition-all duration-700 delay-200 max-w-xl mx-auto ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            벽지 한 장이 바꾸는 공간의 온도.<br />
            당신의 일상에 완벽히 어울리는 새로운 무드를<br />
            감성도배가 만들어 드립니다.
          </p>

          {/* 통계 */}
          <div
            className={`flex justify-center gap-10 mb-10 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {[
              { num: '500+', label: '시공 완료' },
              { num: '★4.9', label: '고객 만족도' },
              { num: '24h', label: '빠른 답변' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: '#E8DDD0' }}>{stat.num}</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: '#C4A882',
                boxShadow: '0 8px 30px rgba(196,168,130,0.45)',
                fontSize: '15px',
              }}
            >
              무료 상담 신청
            </button>
            <button
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                border: '2px solid rgba(232,221,208,0.7)',
                color: '#F5EFE6',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                fontSize: '15px',
              }}
            >
              시공 사진 보기
            </button>
          </div>
        </div>
      </div>

      {/* ── 하단: 진행 바 + 스크롤 ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-8 gap-5"
      >
        {/* 진행 바 */}
        <div className="flex items-center gap-2">
          {rooms.map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-full"
              style={{
                width: activeRoom === i ? '40px' : '6px',
                height: '4px',
                background: 'rgba(255,255,255,0.25)',
                transition: 'width 0.4s ease',
              }}
            >
              {activeRoom === i && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: '#E8DDD0',
                    transformOrigin: 'left',
                    transform: `scaleX(${progress / 100})`,
                    transition: 'transform 0.05s linear',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* 스크롤 인디케이터 */}
        <div
          className="flex flex-col items-center gap-1.5"
          style={{
            color: 'rgba(255,255,255,0.5)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}
        >
          <style>{`
            @keyframes scrollBounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(6px); }
            }
          `}</style>
          <span className="text-xs">스크롤</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
