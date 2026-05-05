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

export default function ContactPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timer);
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
