import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Amenities } from './components/Amenities';
import { BookingSection } from './components/BookingSection';
import { Gallery } from './components/Gallery';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

function MainSite() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-slate-800 scroll-smooth">
      <Header />
      <Hero />
      <Amenities />
      <BookingSection />
      <Gallery />
      <ContactForm />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;