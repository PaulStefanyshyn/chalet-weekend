import { useState, useEffect } from 'react';

export const BookingSection = () => {
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReserving, setIsReserving] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const bookedDates = [new Date(2026, 6, 2).getTime(), new Date(2026, 6, 3).getTime()];

  const isBooked = (d: Date) => bookedDates.includes(d.getTime());

  const getDaysInMonth = (wYear: number, wMonth: number) => new Date(wYear, wMonth + 1, 0).getDate();
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay();
  const shift = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && isReserving) {
      setIsReserving(false);
      setStartDate(null);
      setEndDate(null);
      alert('Час на бронювання вичерпано. Дати знову вільні.');
    }
  }, [timeLeft, isReserving]);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleDateClick = (d: Date) => {
    if (isReserving || isBooked(d)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (d.getTime() < startDate.getTime()) {
        setStartDate(d);
      } else if (d.getTime() === startDate.getTime()) {
        setStartDate(null);
      } else {
        let hasBooked = false;
        const curr = new Date(startDate);
        while (curr <= d) {
          if (isBooked(curr)) {
            hasBooked = true;
            break;
          }
          curr.setDate(curr.getDate() + 1);
        }

        if (hasBooked) {
          alert('Вибраний період містить заброньовані дати.');
          setStartDate(d);
        } else {
          setEndDate(d);
        }
      }
    }
  };

  const startReservation = () => {
    if (!startDate || !endDate) {
      alert('Будь ласка, оберіть дати заїзду та виїзду!');
      return;
    }
    setIsReserving(true);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderCell = (d: Date, isNextMonth: boolean) => {
    const dTime = d.getTime();
    const sTime = startDate?.getTime();
    const eTime = endDate?.getTime();

    const isStart = sTime === dTime;
    const isEnd = eTime === dTime;
    const isBetween = sTime && eTime && dTime > sTime && dTime < eTime;
    const isSelected = isStart || isEnd || isBetween;

    const isBookedDay = isBooked(d);
    const isBookedStart = isBookedDay && !isBooked(new Date(dTime - 86400000));
    const isBookedEnd = isBookedDay && !isBooked(new Date(dTime + 86400000));

    let className = "w-full h-8 flex items-center justify-center text-[11px] transition-all ";

    if (isBookedDay) {
      className += "bg-[#3F3E45] text-white font-semibold cursor-not-allowed ";
      if (isBookedStart) className += "rounded-l-full ";
      if (isBookedEnd) className += "rounded-r-full ";
    } else if (isSelected) {
      className += "bg-chalet-dark text-white font-semibold ";
      if (isStart && !endDate) className += "rounded-full ";
      else if (isStart) className += "rounded-l-full ";
      else if (isEnd) className += "rounded-r-full ";
    } else {
      className += isReserving ? "cursor-not-allowed opacity-80 rounded-full " : "cursor-pointer hover:bg-black/5 rounded-full ";
      if (isNextMonth) className += "text-chalet-next-month ";
    }

    return (
      <div key={dTime} onClick={() => handleDateClick(d)} className={className}>
        {d.getDate()}
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < shift; i++) {
      days.push(<div key={`empty-${i}`} className="w-full h-8" />);
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push(renderCell(new Date(year, month, i), false));
    }
    const nextDays = 42 - (daysInCurrentMonth + shift);
    for (let i = 1; i <= nextDays; i++) {
      days.push(renderCell(new Date(year, month + 1, i), true));
    }
    return days;
  };

  const checkInStr = startDate ? `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getFullYear()}` : '';
  const checkOutStr = endDate ? `${endDate.getDate().toString().padStart(2, '0')}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getFullYear()}` : '';

  return (
    <section id="booking" className="py-20 px-6 bg-chalet-beige">
      <div className="max-w-[1160px] mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center mb-20">
          <div className="w-full lg:w-[45%] flex flex-col gap-4">
            <img 
              src="" 
              alt="Chalet Головна" 
              className="w-full aspect-[4/3] object-cover bg-[#C8C3BC] rounded-[24px]" 
            />
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
              <img src="" className="w-full aspect-square object-cover rounded-xl bg-chalet-input" alt="Деталь 1" />
              <img src="" className="w-full aspect-square object-cover rounded-xl bg-chalet-input" alt="Деталь 2" />
              <img src="" className="w-full aspect-square object-cover rounded-xl bg-chalet-input" alt="Деталь 3" />
              <img src="" className="hidden md:block w-full aspect-square object-cover rounded-xl bg-chalet-input" alt="Деталь 4" />
            </div>
          </div>

          <div className="w-full lg:w-[380px] pt-4">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 block mb-1">Будиночок</span>
            <h2 className="text-3xl font-serif text-chalet-dark mb-6">Chalet Weekend</h2>
            <ul className="space-y-2.5 text-xs font-medium text-chalet-text-dark opacity-90 mb-8">
              <li>✓ До 6 гостей</li>
              <li>✓ 2 спальні кімнати</li>
              <li>✓ Кухня з усім необхідним</li>
              <li>✓ Санвузол</li>
              <li>✓ Вітальня з панорамним видом</li>
            </ul>
            <div className="text-xs text-chalet-text-dark/80 mb-6">
              Від <span className="text-2xl font-bold text-chalet-dark mx-1">4500</span> грн / ніч
            </div>
            <button className="w-full bg-chalet-dark text-white text-xs font-bold py-3.5 rounded-[10px] tracking-wide hover:opacity-90">
              Дізнатися деталі
            </button>
          </div>
        </div>

        <div className="max-w-[440px] mx-auto text-center">
          <h3 className="text-xl font-serif text-chalet-dark mb-6">Оберіть дати для бронювання</h3>
          
          <div className="bg-chalet-input rounded-[24px] p-5 pb-6 border border-black/5 shadow-sm text-chalet-text-dark">
            <div className="bg-chalet-dark text-white rounded-xl flex justify-between items-center px-4 py-2.5 text-xs font-semibold mb-4 select-none">
              <span className={`cursor-pointer px-2 py-1 hover:opacity-80 ${isReserving ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => handleMonthChange('prev')}>←</span>
              <span className="font-sans">{monthNames[month]} {year}</span>
              <span className={`cursor-pointer px-2 py-1 hover:opacity-80 ${isReserving ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => handleMonthChange('next')}>→</span>
            </div>

            <div className="grid grid-cols-7 text-[11px] font-bold opacity-50 mb-3">
              {weekDays.map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-xs font-medium font-sans items-center relative">
              {renderDays()}
            </div>
          </div>

          <div className="flex justify-center gap-6 text-[10px] font-medium mt-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-chalet-booked rounded-sm"></div>
              <span>Зайнято</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-chalet-dark rounded-sm"></div>
              <span>Обрано</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <input type="text" placeholder="Дата заїзду" value={checkInStr} readOnly className="w-full bg-white/70 border border-black/10 rounded-lg px-3 py-3 text-center text-[11px] font-medium placeholder-chalet-text-dark/50 outline-none" />
            <input type="text" placeholder="Дата виїзду" value={checkOutStr} readOnly className="w-full bg-white/70 border border-black/10 rounded-lg px-3 py-3 text-center text-[11px] font-medium placeholder-chalet-text-dark/50 outline-none" />
          </div>

          {isReserving ? (
             <div className="w-full bg-amber-600 text-white text-xs font-bold py-3.5 rounded-[10px] mt-4 tracking-wide shadow-md flex justify-center items-center gap-2">
                ⏳ Дати заблоковано. Завершіть бронь: {formatTime(timeLeft)}
             </div>
          ) : (
             <button onClick={startReservation} className="w-full bg-chalet-dark text-white text-xs font-bold py-3.5 rounded-[10px] mt-4 tracking-wide hover:opacity-90 transition-opacity">
               Перевірити доступність
             </button>
          )}
        </div>

      </div>
    </section>
  );
};