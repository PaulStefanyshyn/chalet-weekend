interface CalendarBlockProps {
  startDate: Date | null;
  endDate: Date | null;
  timeLeft: number;
  isReserving: boolean;
  currentDate: Date;
  monthNames: string[];
  weekDays: string[];
  handleMonthChange: (direction: 'prev' | 'next') => void;
  startReservation: () => void;
  formatTime: (seconds: number) => string;
  renderDays: () => React.ReactNode[];
}

export const CalendarBlock = (props: CalendarBlockProps) => {
  const checkInStr = props.startDate ? `${props.startDate.getDate().toString().padStart(2, '0')}.${(props.startDate.getMonth() + 1).toString().padStart(2, '0')}.${props.startDate.getFullYear()}` : '';
  const checkOutStr = props.endDate ? `${props.endDate.getDate().toString().padStart(2, '0')}.${(props.endDate.getMonth() + 1).toString().padStart(2, '0')}.${props.endDate.getFullYear()}` : '';

  return (
    <div id="calendar-container" className="w-full text-center flex flex-col items-center">
      <h3 className="text-[28px] lg:text-[40px] font-serif text-chalet-dark mb-8 lg:mb-12">Оберіть дати для бронювання</h3>
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:col-start-4 w-full max-w-110 mx-auto">
          <div className="bg-chalet-input rounded-3xl border border-[#15304D]/38 shadow-sm text-chalet-text-dark overflow-hidden flex flex-col">
            <div className="bg-chalet-dark text-chalet-input flex justify-between items-center px-6 py-5 text-base lg:text-xl font-medium select-none">
              <span className={`cursor-pointer px-4 hover:opacity-80 transition-opacity ${props.isReserving ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => props.handleMonthChange('prev')}>←</span>
              <span className="font-sans">{props.monthNames[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</span>
              <span className={`cursor-pointer px-4 hover:opacity-80 transition-opacity ${props.isReserving ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => props.handleMonthChange('next')}>→</span>
            </div>

            <div className="p-4 pb-6 lg:p-6 lg:pb-8">
              <div className="grid grid-cols-7 text-[14px] font-medium text-chalet-text-dark mb-4">
                {props.weekDays.map(d => <div key={d}>{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-y-2 text-[15px] font-medium font-sans items-center relative">
                {props.renderDays()}
              </div>
            </div>
          </div>

      <div className="flex justify-center gap-8 text-[13px] font-medium mt-6 mb-4 text-chalet-text-dark">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-chalet-booked rounded-md"></div>
          <span>Зайнято</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-chalet-dark rounded-md"></div>
          <span>Обрано</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <input type="text" placeholder="Дата заїзду" value={checkInStr} readOnly className="w-full bg-white/70 border border-black/10 rounded-lg px-3 py-3 text-center text-[11px] font-medium placeholder-chalet-text-dark/50 outline-none" />
        <input type="text" placeholder="Дата виїзду" value={checkOutStr} readOnly className="w-full bg-white/70 border border-black/10 rounded-lg px-3 py-3 text-center text-[11px] font-medium placeholder-chalet-text-dark/50 outline-none" />
      </div>

      {props.isReserving ? (
         <div className="w-full bg-amber-600 text-white text-xs font-bold py-3.5 rounded-[10px] mt-4 tracking-wide shadow-md flex justify-center items-center gap-2">
           Дати заблоковано: {props.formatTime(props.timeLeft)}
         </div>
      ) : (
         <button onClick={props.startReservation} className="w-full bg-chalet-dark text-chalet-input text-xs font-bold py-3.5 rounded-[10px] mt-4 tracking-wide hover:opacity-90 transition-opacity">
           Перевірити доступність
         </button>
      )}
        </div>
      </div>
    </div>
  );
};
