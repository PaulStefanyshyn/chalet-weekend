import { CheckSquare } from 'lucide-react';

interface CottageBlockProps {
  activePhoto: string;
  sectionPhotos: Record<number, string>;
  setActivePhoto: (url: string) => void;
}

export const CottageBlock = ({ activePhoto, sectionPhotos, setActivePhoto }: CottageBlockProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="text-center w-full mb-8 lg:mb-12">
        <span className="text-[12px] uppercase tracking-[0.2em] font-bold opacity-50 block mb-3">Будиночок</span>
        <h2 className="text-[36px] lg:text-[52px] font-serif text-chalet-dark">Chalet Weekend</h2>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
        
        <div className="lg:col-start-2 lg:col-span-5 flex flex-col gap-4">
          <img 
            src={activePhoto || sectionPhotos[101]} 
            alt="Chalet Головна" 
            className="w-full aspect-4/3 object-cover bg-[#C8C3BC] rounded-3xl" 
          />
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {[101, 102, 103, 104].map((id, index) => (
              <img 
                key={id}
                src={sectionPhotos[id]} 
                className={`w-full aspect-square object-cover rounded-xl bg-chalet-input cursor-pointer hover:opacity-90 transition-opacity border-2 ${activePhoto === sectionPhotos[id] ? 'border-chalet-dark' : 'border-transparent'} ${index === 3 ? 'hidden lg:block' : ''}`} 
                alt="Деталь" 
                onClick={() => setActivePhoto(sectionPhotos[id])}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-start-8 lg:col-span-4 pt-0 lg:pt-4 flex flex-col items-start text-left h-full">
          <ul className="space-y-4 text-[16px] font-medium text-chalet-text-dark opacity-90 mb-10 w-full">
            <li className="flex items-center gap-3"><CheckSquare className="w-5 h-5 opacity-70" strokeWidth={1.5} /> До 6 гостей</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-5 h-5 opacity-70" strokeWidth={1.5} /> 2 спальні кімнати</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-5 h-5 opacity-70" strokeWidth={1.5} /> Кухня з усім необхідним</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-5 h-5 opacity-70" strokeWidth={1.5} /> Санвузол</li>
            <li className="flex items-center gap-3"><CheckSquare className="w-5 h-5 opacity-70" strokeWidth={1.5} /> Вітальня з панорамним видом</li>
          </ul>
          
          <div className="w-full flex flex-col items-start mt-auto">
            <div className="text-[16px] text-chalet-text-dark/80 mb-6 flex items-baseline">
              Від <span className="text-[40px] font-serif text-chalet-dark mx-2">4500</span> грн / ніч
            </div>
            
            <div className="flex flex-col items-start w-full lg:w-72.25">
              <button onClick={() => document.getElementById('calendar-container')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-14 lg:h-18 bg-chalet-dark text-chalet-input text-[14px] lg:text-[16px] font-bold rounded-xl lg:rounded-2xl tracking-wide hover:opacity-90 transition-opacity">
                Забронювати
              </button>
              <a href="#about" className="flex items-center gap-2 mt-5 text-[14px] font-semibold text-chalet-text-dark/80 hover:text-chalet-dark transition-colors border-b border-transparent hover:border-chalet-dark w-max pb-0.5">
                Детальніше про будиночок
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
