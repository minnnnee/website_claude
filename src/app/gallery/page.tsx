'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function GalleryPage() {
  useEffect(() => {
    const scroll = () => document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
    const t1 = setTimeout(scroll, 800);
    const t2 = setTimeout(scroll, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Reviews />
      <ContactForm />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
