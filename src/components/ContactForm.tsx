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
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
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
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(196,168,130,0.2)', color: '#6B5344' }}
          >
            문의 / 예약
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ color: '#3D2B1F' }}>
            지금 바로 <span style={{ color: '#C4A882' }}>상담 신청</span>
          </h2>
          <p className="text-base" style={{ color: '#6B5344' }}>
            24시간 이내 연락드립니다. 부담 없이 문의해 주세요 😊
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {submitted ? (
              <div
                className="p-12 rounded-3xl text-center"
                style={{ background: 'white', border: '1px solid #E8DDD0' }}
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
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl"
                style={{ background: 'white', border: '1px solid #E8DDD0', boxShadow: '0 4px 30px rgba(61,43,31,0.06)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  style={{ background: '#C4A882', boxShadow: '0 8px 25px rgba(196,168,130,0.3)' }}
                >
                  {isLoading ? '전송 중...' : '상담 신청하기 →'}
                </button>

                <p className="text-xs text-center mt-3" style={{ color: '#8B7355' }}>
                  24시간 이내 연락드립니다
                </p>
              </form>
            )}
          </div>

          {/* Right: Contact Info */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Urgency */}
            <div
              className="p-5 rounded-2xl flex items-center gap-4"
              style={{ background: 'rgba(196,168,130,0.1)', border: '1px solid rgba(196,168,130,0.3)' }}
            >
              <span className="text-2xl">⏰</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#3D2B1F' }}>이번 달 예약 마감 임박!</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B5344' }}>빠른 예약으로 원하는 날짜를 확보하세요.</div>
              </div>
            </div>

            {/* KakaoTalk */}
            <a
              href="#"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-105 group"
              style={{ background: '#FEE500' }}
            >
              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center text-2xl">💬</div>
              <div>
                <div className="font-bold text-sm" style={{ color: '#3D2B1F' }}>카카오톡 채널 상담</div>
                <div className="text-xs mt-0.5" style={{ color: '#3D2B1F' }}>@감성도배 · 즉시 답변 가능</div>
              </div>
              <span className="ml-auto text-lg">→</span>
            </a>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📍', title: '운영 지역', desc: '서울 · 경기 전 지역' },
                { icon: '🕐', title: '운영 시간', desc: '평일 09:00–18:00' },
                { icon: '📞', title: '전화 상담', desc: '010-0000-0000' },
                { icon: '💌', title: '이메일', desc: 'gamseong@dobae.kr' },
              ].map((info, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl"
                  style={{ background: 'white', border: '1px solid #E8DDD0' }}
                >
                  <div className="text-2xl mb-2">{info.icon}</div>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#3D2B1F' }}>{info.title}</div>
                  <div className="text-xs" style={{ color: '#6B5344' }}>{info.desc}</div>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'white', border: '1px solid #E8DDD0' }}
            >
              <div className="font-semibold text-sm mb-3" style={{ color: '#3D2B1F' }}>🛡️ 감성도배의 약속</div>
              <div className="space-y-2">
                {[
                  '무료 견적 및 색상 상담',
                  '시공 후 하자 발생 시 무상 보수',
                  '청결한 시공 환경 보장',
                  '정직한 가격 안내',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: '#6B5344' }}>
                    <span style={{ color: '#C4A882' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
