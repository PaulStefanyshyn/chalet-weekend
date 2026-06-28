import { useState, useEffect } from 'react';
import { CottageBlock } from './CottageBlock';
import { CalendarBlock } from './CalendarBlock';

interface BookingProps {
  startDate: Date | null;
  setStartDate: (d: Date | null) => void;
  endDate: Date | null;
  setEndDate: (d: Date | null) => void;
  timeLeft: number;
  setTimeLeft: (t: number) => void;
  isReserving: boolean;
  setIsReserving: (b: boolean) => void;
  setHoldId: (id: number | null) => void;
  holdUntil: number | null;
  setHoldUntil: (h: number | null) => void;
}

export const BookingSection = ({ startDate, setStartDate, endDate, setEndDate, timeLeft, setTimeLeft, isReserving, setIsReserving, setHoldId, holdUntil, setHoldUntil }: BookingProps) => {
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
  const [bookedDates, setBookedDates] = useState<number[]>([]);
  
  const [sectionPhotos, setSectionPhotos] = useState<Record<number, string>>({});
  const [activePhoto, setActivePhoto] = useState<string>('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/photos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const map: Record<number, string> = {};
          [101, 102, 103, 104].forEach(id => {
            const match = data.find((p: any) => p.id === id);
            if (match) map[id] = match.url;
          });
          if (Object.keys(map).length > 0) {
            setSectionPhotos(prev => ({ ...prev, ...map }));
            if (map[101]) setActivePhoto(map[101]);
          }
        }
      })
      .catch(() => {});

    const fetchBusyDates = () => {
      fetch('http://localhost:5000/api/bookings/busy-dates')
        .then(res => res.json())
        .then(data => {
          const dates: number[] = [];
          
          const parseDate = (dateStr: string) => {
             if (dateStr.includes('T')) {
                const d = new Date(dateStr);
                return new Date(d.getFullYear(), d.getMonth(), d.getDate());
             } else {
                const [y, m, d] = dateStr.split('-').map(Number);
                return new Date(y, m - 1, d);
             }
          };

          data.forEach((b: any) => {
            let curr = parseDate(b.check_in);
            const end = parseDate(b.check_out);
            while (curr <= end) {
              dates.push(curr.getTime());
              curr.setDate(curr.getDate() + 1);
            }
          });
          setBookedDates(dates);
        })
        .catch(() => {});
    };

    fetchBusyDates();
    const intervalId = setInterval(fetchBusyDates, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!activePhoto && sectionPhotos[101]) {
      setActivePhoto(sectionPhotos[101]);
    }
  }, [sectionPhotos, activePhoto]);

  const isBooked = (d: Date) => bookedDates.includes(d.getTime());

  const getDaysInMonth = (wYear: number, wMonth: number) => new Date(wYear, wMonth + 1, 0).getDate();
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay();
  const shift = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  useEffect(() => {
    if (isReserving && holdUntil) {
      const intervalId = setInterval(() => {
        const remaining = Math.max(0, Math.floor((holdUntil - Date.now()) / 1000));
        setTimeLeft(remaining);
        if (remaining === 0) {
          setIsReserving(false);
          setStartDate(null);
          setEndDate(null);
          setHoldId(null);
          setHoldUntil(null);
          alert('Час на бронювання вичерпано. Дати знову вільні.');
          clearInterval(intervalId);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isReserving, holdUntil, setTimeLeft, setIsReserving, setStartDate, setEndDate, setHoldId, setHoldUntil]);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleDateClick = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isReserving || isBooked(d) || d.getTime() < today.getTime()) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (d.getTime() < startDate.getTime()) {
        setStartDate(d);
      } else if (d.getTime() === startDate.getTime()) {
        setEndDate(d);
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
          const diffTime = d.getTime() - startDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 28) {
            alert('На сайті не можна забронювати більше ніж на 4 тижні. Будь ласка, зв\'яжіться з нами, щоб адміністратор міг забронювати для вас цей період.');
            return;
          }
          setEndDate(d);
        }
      }
    }
  };

  const startReservation = async () => {
    if (!startDate || !endDate) {
      alert('Будь ласка, оберіть дати заїзду та виїзду!');
      return;
    }
    
    try {
      const formatLocal = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const res = await fetch('http://localhost:5000/api/bookings/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          check_in: formatLocal(startDate),
          check_out: formatLocal(endDate)
        })
      });
      const data = await res.json();
      
      if (data.id) {
        setHoldId(data.id);
        setIsReserving(true);
        setHoldUntil(data.hold_until);
        setTimeLeft(Math.max(0, Math.floor((data.hold_until - Date.now()) / 1000)));
      }
    } catch (err) {
      alert('Помилка резервування дат');
    }
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
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = dTime < today.getTime();

    const isStart = sTime === dTime;
    const isEnd = eTime === dTime;
    const isBetween = sTime && eTime && dTime > sTime && dTime < eTime;
    const isSelected = isStart || isEnd || isBetween;

    const isBookedDay = isBooked(d);
    const isBookedStart = isBookedDay && !isBooked(new Date(dTime - 86400000));
    const isBookedEnd = isBookedDay && !isBooked(new Date(dTime + 86400000));

    let className = "w-full h-8 flex items-center justify-center text-[11px] transition-all ";

    if (isPast) {
      className += "text-black/30 cursor-not-allowed rounded-full ";
    } else if (isBookedDay) {
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

  return (
    <section id="booking" className="bg-white lg:bg-chalet-beige lg:pt-12 lg:pb-20 lg:px-6">
      
      <div className="w-full bg-[#15304D]/15 lg:bg-transparent py-12 px-6 lg:p-0 lg:mb-20">
        <div className="max-w-[1160px] mx-auto">
          <CottageBlock 
            activePhoto={activePhoto} 
            sectionPhotos={sectionPhotos} 
            setActivePhoto={setActivePhoto} 
          />
        </div>
      </div>
      
      <div className="w-full bg-white lg:bg-transparent py-12 px-6 lg:p-0">
        <div className="max-w-[1160px] mx-auto">
          <CalendarBlock 
            startDate={startDate}
            endDate={endDate}
            timeLeft={timeLeft}
            isReserving={isReserving}
            currentDate={currentDate}
            monthNames={monthNames}
            weekDays={weekDays}
            handleMonthChange={handleMonthChange}
            startReservation={startReservation}
            formatTime={formatTime}
            renderDays={renderDays}
          />
        </div>
      </div>
      
    </section>
  );
};