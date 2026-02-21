'use client';

import { useEffect, useRef, useState } from 'react';

const reviews = [
  {
    name: '김○○ 고객님',
    location: '남양주 화도읍',
    rating: 5,
    text: '이사하면서 전체 도배를 맡겼는데 정말 만족스러워요. 색상 추천도 너무 잘 해주셔서 집이 훨씬 넓어 보이고 분위기가 확 바뀌었어요. 꼼꼼하게 마무리해 주셔서 군더더기 하나 없어요!',
    date: '2024.12',
    highlight: '색상 추천이 탁월해요',
  },
  {
    name: '박○○ 고객님',
    location: '서울 노원구',
    rating: 5,
    text: '여자 분이라 처음엔 걱정했는데 완전 기우였어요. 오히려 더 꼼꼼하고 섬세하게 해주셔서 놀랐습니다. 침실 포인트 벽지 시공이 정말 예쁘게 됐어요. 주변에 다 추천하고 있어요.',
    date: '2025.01',
    highlight: '꼼꼼하고 섬세한 시공',
  },
  {
    name: '이○○ 고객님',
    location: '남양주 가평',
    rating: 5,
    text: '상담부터 시공 완료까지 전 과정이 너무 편했어요. 제 취향을 잘 파악하셔서 제안해주신 벽지가 딱 마음에 들었고, 깔끔하게 마무리해 주셨어요. 이사할 때마다 꼭 다시 부를게요!',
    date: '2025.02',
    highlight: '취향 파악이 정확해요',
  },
  {
    name: '최○○ 고객님',
    location: '남양주 별내',
    rating: 5,
    text: '주방 포인트 벽지를 바꿨는데 집 전체 분위기가 달라졌어요! 어떤 패턴이 잘 어울릴지 사진도 보여주시면서 친절하게 설명해 주셔서 너무 좋았습니다. 결과물도 기대 이상이에요.',
    date: '2025.02',
    highlight: '친절한 설명이 좋았어요',
  },
  {
    name: '정○○ 고객님',
    location: '남양주 다산동',
    rating: 5,
    text: '아이방 전체 도배를 맡겼어요. 아이가 좋아하는 분위기로 직접 제안해 주셔서 감동이었어요. 시공 중에도 물건을 조심스럽게 다뤄주시고 마무리도 정말 깔끔했습니다.',
    date: '2025.03',
    highlight: '배려 있는 시공',
  },
];

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = reviews.length;
  const visibleCount = containerWidth >= 768 ? 3 : 1;
  const cardWidth = containerWidth > 0 ? containerWidth / visibleCount : 0;
  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 리사이즈 시 범위 초과 방지
  useEffect(() => {
    setCurrent(c => Math.min(c, maxIndex));
  }, [maxIndex]);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  const onDragStart = (x: number) => { setIsDragging(true); setDragStartX(x); };
  const onDragEnd = (x: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX - x;
    if (diff > 40) next();
    else if (diff < -40) prev();
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 px-6 overflow-hidden"
      style={{ background: '#F5EFE6' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Carousel */}
        <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Track wrapper */}
          <div
            ref={containerRef}
            className="overflow-hidden select-none"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={e => onDragStart(e.clientX)}
            onMouseUp={e => onDragEnd(e.clientX)}
            onMouseLeave={e => onDragEnd(e.clientX)}
            onTouchStart={e => onDragStart(e.touches[0].clientX)}
            onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(${-current * cardWidth}px)`,
                transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  style={{
                    width: `${cardWidth}px`,
                    flexShrink: 0,
                    padding: '0 8px',
                  }}
                >
                  <div
                    className="h-full p-5 md:p-6 rounded-2xl"
                    style={{
                      background: 'white',
                      border: '1px solid #E8DDD0',
                      boxShadow: hoveredReview === i
                        ? '0 16px 40px rgba(61,43,31,0.14)'
                        : '0 4px 20px rgba(61,43,31,0.06)',
                      transform: hoveredReview === i ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={() => setHoveredReview(i)}
                    onMouseLeave={() => setHoveredReview(null)}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: review.rating }).map((_, si) => (
                        <span key={si} className="text-base" style={{ color: '#C4A882' }}>★</span>
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
                        <div className="text-xs mt-0.5" style={{ color: '#8B7355' }}>{review.location}</div>
                      </div>
                      <div className="text-xs" style={{ color: '#8B7355' }}>{review.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 hidden md:flex text-xl font-bold"
            style={{
              background: 'white',
              border: '1px solid #E8DDD0',
              color: current === 0 ? '#C4A882' : '#6B5344',
              opacity: current === 0 ? 0.4 : 1,
            }}
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 hidden md:flex text-xl font-bold"
            style={{
              background: 'white',
              border: '1px solid #E8DDD0',
              color: current === maxIndex ? '#C4A882' : '#6B5344',
              opacity: current === maxIndex ? 0.4 : 1,
            }}
          >
            ›
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? '24px' : '8px',
                height: '8px',
                background: current === i ? '#C4A882' : '#D4C4B0',
              }}
            />
          ))}
        </div>

        <p className="text-center text-xs mt-3" style={{ color: '#8B7355' }}>
          {current + 1} / {maxIndex + 1}
        </p>
      </div>
    </section>
  );
}
