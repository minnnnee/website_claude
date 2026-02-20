'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', memo: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      alert('전송에 실패했습니다. 전화 또는 카카오톡으로 문의해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid #E8DDD0',
    background: 'white',
    fontSize: '14px',
    color: '#3D2B1F',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6"
      style={{ background: '#3D2B1F' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* 왼쪽: 텍스트 + 연락처 */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span
              className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(196,168,130,0.15)', color: '#C4A882', border: '1px solid rgba(196,168,130,0.3)' }}
            >
              간편 상담 예약
            </span>

            <h2
              className="text-4xl font-black leading-tight mb-6"
              style={{ color: 'white' }}
            >
              당신의 공간에<br />
              <span style={{ color: '#C4A882' }}>감성을 색칠할 시간</span>
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              24시간 이내 연락드립니다. 부담 없이 문의해 주세요.
            </p>

            <div className="flex gap-3">
              {/* 전화 상담 */}
              <a
                href="tel:010-3322-1992"
                className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover:brightness-110"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 4.18 2 2 0 012.1 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.1 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>빠른 전화 상담</div>
                  <div className="font-bold text-sm" style={{ color: 'white' }}>010-3322-1992</div>
                </div>
              </a>

              {/* 카카오톡 */}
              <a
                href="https://pf.kakao.com/_zHwMn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover:brightness-95"
                style={{ background: '#FEE500' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#3D2B1F" style={{ flexShrink: 0 }}>
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'rgba(61,43,31,0.55)' }}>카카오톡 문의</div>
                  <div className="font-bold text-sm" style={{ color: '#3D2B1F' }}>@감성도배</div>
                </div>
              </a>
            </div>
          </div>

          {/* 오른쪽: 폼 카드 */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {submitted ? (
              <div
                className="p-12 rounded-3xl text-center"
                style={{ background: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#3D2B1F' }}>
                  접수가 완료되었습니다!
                </h3>
                <p className="text-sm" style={{ color: '#6B5344' }}>
                  24시간 이내에 연락드리겠습니다.<br />
                  카카오톡으로도 빠르게 문의하실 수 있어요.
                </p>
                <button
                  className="mt-6 px-8 py-3 rounded-full text-white text-sm font-medium"
                  style={{ background: '#C4A882' }}
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', memo: '' }); }}
                >
                  다시 문의하기
                </button>
              </div>
            ) : (
              <div
                className="p-8 rounded-3xl"
                style={{ background: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: '#3D2B1F' }}>온라인 상담 예약</h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#3D2B1F' }}>
                        이름 <span style={{ color: '#C4A882' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#C4A882';
                          e.target.style.boxShadow = '0 0 0 3px rgba(196,168,130,0.15)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#E8DDD0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#3D2B1F' }}>
                        연락처 <span style={{ color: '#C4A882' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#C4A882';
                          e.target.style.boxShadow = '0 0 0 3px rgba(196,168,130,0.15)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#E8DDD0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#3D2B1F' }}>
                      시공 희망일
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = '#C4A882';
                        e.target.style.boxShadow = '0 0 0 3px rgba(196,168,130,0.15)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#E8DDD0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#3D2B1F' }}>
                      문의 내용
                    </label>
                    <textarea
                      rows={4}
                      placeholder="시공 면적, 원하는 스타일, 기타 문의사항을 자유롭게 적어주세요."
                      value={form.memo}
                      onChange={e => setForm({ ...form, memo: e.target.value })}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => {
                        e.target.style.borderColor = '#C4A882';
                        e.target.style.boxShadow = '0 0 0 3px rgba(196,168,130,0.15)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#E8DDD0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-full font-semibold text-white text-base transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                    style={{ background: '#C4A882', boxShadow: '0 8px 25px rgba(196,168,130,0.35)' }}
                  >
                    {isLoading ? '전송 중...' : '상담 예약하기 →'}
                  </button>

                  <p className="text-xs text-center mt-3" style={{ color: '#8B7355' }}>
                    24시간 이내 연락드립니다
                  </p>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
