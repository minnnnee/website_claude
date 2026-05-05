import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactForm />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
