import { useState, useRef } from 'react';
import { Phone, Camera, MapPin } from 'lucide-react';

interface ContactProps {
  startDate: Date | null;
  endDate: Date | null;
  holdId: number | null;
  setIsReserving: (b: boolean) => void;
  setTimeLeft: (t: number) => void;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
}

export const ContactForm = ({ startDate, endDate, holdId, setIsReserving, setTimeLeft, setStartDate, setEndDate }: ContactProps) => {
  const [pib, setPib] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const checkInStr = startDate ? `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getFullYear()}` : '';
  const checkOutStr = endDate ? `${endDate.getDate().toString().padStart(2, '0')}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getFullYear()}` : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!holdId) {
      alert('Спочатку оберіть дати в календарі та натисніть "Перевірити доступність"!');
      return;
    }

    if (!pib.trim() || !phone.trim()) {
      alert('Будь ласка, заповніть обов\'язкові поля (ім\'я та телефон).');
      return;
    }

    if (pib.trim().length < 2) {
      alert('Будь ласка, введіть коректне ім\'я.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      alert('Будь ласка, введіть коректний номер телефону.');
      return;
    }

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/bookings/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: holdId, 
          pib, 
          phone, 
          comment: `Гостей: ${guests}. ${comment}` 
        })
      });

      if (res.ok) {
        alert('Бронювання успішно підтверджено!');
        setPib('');
        setPhone('');
        setGuests('');
        setComment('');
        setIsReserving(false);
        setTimeLeft(0);
        setStartDate(null);
        setEndDate(null);
        window.location.reload();
      } else {
        alert('Помилка підтвердження або час вийшов');
        isSubmittingRef.current = false;
        setIsSubmitting(false);
      }
    } catch (err) {
      alert('Помилка з\'єднання з сервером');
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="pt-12 pb-20 px-6 bg-[#FDF8F5] text-chalet-text-dark">
      <div className="max-w-290 mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">
        
        <div className="hidden lg:block lg:col-start-2 lg:col-span-11 mb-4">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Зв'язатися з нами</p>
        </div>

        <div className="lg:col-start-2 lg:col-span-5 flex flex-col justify-start">
          <p className="lg:hidden text-[10px] uppercase tracking-widest font-bold opacity-60 mb-2">Зв'язатися з нами</p>
          <h2 className="text-[32px] lg:text-[44px] leading-tight font-serif mb-6 text-chalet-dark">Забронюйте свій відпочинок<br className="hidden lg:block" /> вже сьогодні</h2>
          
          <div className="text-[14px] leading-relaxed mb-6 font-medium text-chalet-text-dark">
            Напишіть нам, і ми допоможемо обрати найкращий відпочинок для вас.
          </div>
          
          <div className="text-[14px] leading-relaxed mb-10 flex flex-col gap-4 font-medium text-chalet-text-dark">
            <span>При бронюванні від 6 ночей отримуєте вигіднішу вартість проживання</span>
            <span>-10% для військових</span>
          </div>

          <div className="space-y-5 text-[14px] font-medium text-chalet-text-dark mt-auto lg:pb-0">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-chalet-dark stroke-[1.5]" />
              <span>+380 99 999 99 99</span>
            </div>
            <div className="flex items-center gap-4">
              <Camera className="w-5 h-5 text-chalet-dark stroke-[1.5]" />
              <span>@chalet_weekend2023</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-chalet-dark stroke-[1.5]" />
              <span>Івано-Франківська область,<br className="lg:hidden" /> Діл, 1736</span>
            </div>
          </div>
        </div>

        <form className="lg:col-start-8 lg:col-span-4 flex flex-col gap-3.5 w-full mt-4 lg:mt-0 h-full" onSubmit={handleSubmit}>
          <input type="text" value={pib} onChange={e => setPib(e.target.value)} placeholder="Ваше ім'я" required className="w-full bg-chalet-input placeholder-chalet-text-dark text-chalet-text-dark font-medium placeholder:font-normal border border-transparent rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-chalet-dark/40 transition-colors" />
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" required className="w-full bg-chalet-input placeholder-chalet-text-dark text-chalet-text-dark font-medium placeholder:font-normal border border-transparent rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-chalet-dark/40 transition-colors" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
            <input type="text" value={checkInStr} readOnly placeholder="Дата заїзду" className="w-full bg-chalet-input placeholder-chalet-text-dark text-chalet-text-dark font-medium placeholder:font-normal border border-transparent rounded-xl px-4 py-3.5 text-[14px] outline-none" />
            <input type="text" value={checkOutStr} readOnly placeholder="Дата виїзду" className="w-full bg-chalet-input placeholder-chalet-text-dark text-chalet-text-dark font-medium placeholder:font-normal border border-transparent rounded-xl px-4 py-3.5 text-[14px] outline-none" />
          </div>
          
          <input type="number" value={guests} onChange={e => setGuests(e.target.value)} placeholder="Кількість гостей" className="hidden lg:block w-full bg-chalet-input placeholder-chalet-text-dark text-chalet-text-dark font-medium placeholder:font-normal border border-transparent rounded-xl px-4 py-3.5 text-[14px] outline-none focus:border-chalet-dark/40 transition-colors" />
          
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Ваше повідомлення" rows={3} className="w-full bg-chalet-input placeholder-chalet-text-dark text-chalet-text-dark font-medium placeholder:font-normal border border-transparent rounded-xl px-4 py-3.5 text-[14px] outline-none resize-none focus:border-chalet-dark/40 transition-colors flex-1"></textarea>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full bg-chalet-dark text-chalet-input text-[14px] font-normal tracking-wide py-4 rounded-xl transition-opacity mt-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          >
            {isSubmitting ? 'Відправка...' : 'Надіслати'}
          </button>
        </form>
        
      </div>
    </section>
  );
};