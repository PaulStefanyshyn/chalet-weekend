import { useState } from 'react';
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReserving, setIsReserving] = useState(false);
  const [holdId, setHoldId] = useState<number | null>(null);
  const [holdUntil, setHoldUntil] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans text-slate-800 scroll-smooth">
      <Header />
      <Hero />
      <Amenities />
      <BookingSection 
        startDate={startDate} 
        setStartDate={setStartDate} 
        endDate={endDate} 
        setEndDate={setEndDate} 
        timeLeft={timeLeft} 
        setTimeLeft={setTimeLeft} 
        isReserving={isReserving} 
        setIsReserving={setIsReserving} 
        setHoldId={setHoldId}
        holdUntil={holdUntil}
        setHoldUntil={setHoldUntil}
      />
      <Gallery />
      <ContactForm 
        startDate={startDate} 
        endDate={endDate} 
        holdId={holdId} 
        setIsReserving={setIsReserving} 
        setTimeLeft={setTimeLeft} 
        setStartDate={setStartDate} 
        setEndDate={setEndDate} 
      />
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