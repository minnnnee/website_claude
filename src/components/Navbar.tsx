'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: '시공사진', id: 'gallery' },
    { label: '고객후기', id: 'reviews' },
    { label: '문의하기', id: 'contact' },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 1px 20px rgba(61,43,31,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="text-left">
          <div className="text-xl font-black" style={{ color: '#3D2B1F' }}>감성도배</div>
          <div className="text-xs italic" style={{ color: '#C4A882', letterSpacing: '0.05em' }}>
            Designing Spaces, Crafting Emotions
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#6B5344' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:shadow-lg active:scale-95"
            style={{ background: '#C4A882', boxShadow: '0 4px 15px rgba(196,168,130,0.3)' }}
          >
            무료 상담 예약
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: '#3D2B1F',
              transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: '#3D2B1F',
              opacity: isMenuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: '#3D2B1F',
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isMenuOpen ? '300px' : '0',
          background: 'rgba(250,247,242,0.98)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left py-3 text-sm font-medium border-b transition-colors"
              style={{ color: '#6B5344', borderColor: '#E8DDD0' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="mt-3 py-3 rounded-full text-sm font-medium text-white"
            style={{ background: '#C4A882' }}
          >
            무료 상담 예약
          </button>
        </div>
      </div>
    </nav>
  );
}
