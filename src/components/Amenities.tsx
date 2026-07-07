import { useState, useEffect, useRef } from 'react';
import { Flame, Car, Wifi, ShieldAlert, Layers, Wine, TowelRack, Bath, Eye, BedDouble } from 'lucide-react';

export const Amenities = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [aboutPhotoUrl, setAboutPhotoUrl] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/photos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mainPhoto = data.find((p: any) => p.id === 999);
          if (mainPhoto) setAboutPhotoUrl(mainPhoto.url);
        }
      })
      .catch(() => {});
  }, []);

  const items = {
    bbq: { label: 'BBQ', icon: <Flame className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    parking: { label: 'Паркінг', icon: <Car className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    wifi: { label: 'Wi-Fi', icon: <Wifi className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    sauna: { label: 'Сауна', icon: <ShieldAlert className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    chan: { label: 'Чан', icon: <Layers className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    dishes: { label: 'Посуд', icon: <Wine className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    towels: { label: 'Рушники', icon: <TowelRack className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    bath: { label: 'Ванна', icon: <Bath className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    panorama: { label: 'Панорама', icon: <Eye className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> },
    bed: { label: 'Постіль', icon: <BedDouble className="w-8 h-8 text-chalet-text-dark/90 mb-2 stroke-[1.2]" /> }
  };

  const desktopOrder = [
    items.bbq, items.parking, items.wifi, items.sauna, items.chan,
    items.dishes, items.towels, items.bath, items.panorama, items.bed
  ];

  const mobileChunks = [
    [items.wifi, items.parking, items.bbq, items.chan, items.sauna, items.bed],
    [items.panorama, items.dishes, null, items.bath, items.towels, null]
  ];

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
    <section id="about" className="pt-12 pb-20 px-6 bg-white text-chalet-text-dark overflow-hidden">
      <div className="max-w-290 mx-auto w-full">
        
        <div className="hidden lg:block lg:ml-[50%] lg:pl-8 mb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-chalet-text-dark/50 block">Про нас</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-0 h-full">
          
          <div className="block lg:hidden">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-chalet-text-dark/50 block mb-2">Про нас</span>
            <h2 className="text-[28px] font-serif text-chalet-dark mb-4">Відпочинок, що відновлює</h2>
            <div className="text-[15px] space-y-4 font-normal leading-relaxed text-chalet-text-dark">
              <p>Ми створили простір, де можна відчути спокій природи, комфорт сучасного будинку та тепло справжнього відпочинку.</p>
              <p>Тут є все для ідеального вікенду — гори, чан, сауна, затишок і тиша.</p>
            </div>
          </div>

          <div className="w-full h-full bg-[#D9D9D9] rounded-4xl shadow-sm overflow-hidden flex items-center justify-center">
            {aboutPhotoUrl ? (
              <img 
                src={aboutPhotoUrl} 
                alt="Інтер'єр шале" 
                className="w-full aspect-4/3 lg:aspect-auto lg:h-full object-cover" 
                onError={() => setAboutPhotoUrl('')}
              />
            ) : (
              <span className="text-black/20 text-sm font-medium">Фото "Про нас"</span>
            )}
          </div>

          <div className="flex flex-col justify-between w-full h-full lg:py-0">
            
            <div className="hidden lg:block">
              <h2 className="text-[32px] font-serif text-chalet-dark mb-5 leading-tight">Відпочинок, що відновлює</h2>
              <div className="text-[15px] space-y-4 font-normal leading-relaxed max-w-lg text-chalet-text-dark">
                <p>Ми створили простір, де можна відчути спокій природи, комфорт сучасного будинку та тепло справжнього відпочинку.</p>
                <p>Тут є все для ідеального вікенду — гори, чан, сауна, затишок і тиша.</p>
              </div>
            </div>

            <div className="hidden lg:grid lg:grid-cols-5 gap-y-8 text-center mt-auto lg:pt-10">
              {desktopOrder.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {item.icon}
                  <span className="text-[11px] font-medium text-chalet-text-dark/80 whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </div>

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full overflow-x-auto snap-x snap-mandatory pb-4 flex lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
            >
              {mobileChunks.map((chunk, idx) => (
              <div key={idx} className="min-w-full shrink-0 snap-center grid grid-cols-3 gap-y-8 px-2">
                {chunk.map((item, i) => item ? (
                  <div key={i} className="flex flex-col items-center text-center">
                    {item.icon}
                    <span className="text-[11px] font-medium text-chalet-text-dark/80 whitespace-nowrap">{item.label}</span>
                  </div>
                ) : (
                  <div key={i} />
                ))}
              </div>
            ))}
          </div>

          <div 
             className="w-15 h-4 bg-[#E6E6E6] border border-chalet-dark rounded-full mx-auto mt-2 lg:hidden flex items-center px-1 cursor-pointer"
             onClick={() => {
               if (scrollRef.current) {
                 const isEnd = scrollProgress > 0.5;
                 scrollRef.current.scrollTo({
                   left: isEnd ? 0 : scrollRef.current.clientWidth,
                   behavior: 'smooth'
                 });
               }
             }}
          >
             <div 
               className="w-6 h-2 bg-chalet-dark rounded-full"
               style={{ transform: `translateX(${scrollProgress * 26}px)` }}
             ></div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
};