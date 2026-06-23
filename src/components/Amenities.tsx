import { useState, useRef } from 'react';
import { Flame, Car, Wifi, ShieldAlert, Layers, Wine, TowelRack, Bath, Eye, BedDouble } from 'lucide-react';

export const Amenities = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: 'Wi-Fi', icon: <Wifi className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Паркінг', icon: <Car className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'BBQ', icon: <Flame className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Чан', icon: <Layers className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Сауна', icon: <ShieldAlert className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Постіль', icon: <BedDouble className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Панорама', icon: <Eye className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Посуд', icon: <Wine className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Ванна', icon: <Bath className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    { label: 'Рушники', icon: <TowelRack className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> }
  ];

  const chunks = [items.slice(0, 6), items.slice(6)];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  return (
    <section id="about" className="py-20 px-6 bg-white text-chalet-text-dark overflow-hidden">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        <div className="block lg:hidden">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-chalet-text-dark/50 block mb-2">Про нас</span>
          <h2 className="text-[28px] font-serif text-chalet-dark mb-4">Відпочинок, що відновлює</h2>
          <div className="text-xs space-y-3 opacity-90 font-medium leading-relaxed">
            <p>Ми створили простір, де можна відчути спокій природи, комфорт сучасного будинку та тепло справжнього відпочинку.</p>
            <p>Тут є все для ідеального вікенду — гори, чан, сауна, затишок і тиша.</p>
          </div>
        </div>

        <div className="w-full">
          <img 
            src="" 
            alt="Інтер'єр шале" 
            className="w-full aspect-[4/3] object-cover bg-chalet-input rounded-[32px] shadow-sm" 
          />
        </div>

        <div className="flex flex-col justify-center w-full">
          
          <div className="hidden lg:block mb-10">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-chalet-text-dark/50 block mb-2">Про нас</span>
            <h2 className="text-[28px] font-serif text-chalet-dark mb-4">Відпочинок, що відновлює</h2>
            <div className="text-xs space-y-3 opacity-90 font-medium leading-relaxed max-w-lg">
              <p>Ми створили простір, де можна відчути спокій природи, комфорт сучасного будинку та тепло справжнього відпочинку.</p>
              <p>Тут є все для ідеального вікенду — гори, чан, сауна, затишок і тиша.</p>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-5 gap-y-8 text-center">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {item.icon}
                <span className="text-[11px] font-medium text-chalet-text-dark/80 whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto snap-x snap-mandatory pb-4 flex lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {chunks.map((chunk, idx) => (
              <div key={idx} className="min-w-full flex-shrink-0 snap-center grid grid-cols-3 gap-y-8 px-2">
                {chunk.map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    {item.icon}
                    <span className="text-[11px] font-medium text-chalet-text-dark/80 whitespace-nowrap">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="w-14 h-3 bg-white border border-slate-300 rounded-full mx-auto mt-2 lg:hidden flex items-center px-[2px]">
             <div 
               className="w-6 h-1.5 bg-chalet-dark rounded-full transition-transform duration-75 ease-out"
               style={{ transform: `translateX(${scrollProgress * 28}px)` }}
             ></div>
          </div>

        </div>
      </div>
    </section>
  );
};