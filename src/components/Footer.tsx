import { Camera, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-chalet-dark text-chalet-input/80 pt-16 pb-6 px-6 text-xs border-t border-white/5">
      <div className="max-w-290 mx-auto grid grid-cols-4 md:grid-cols-12 gap-y-10 md:gap-y-0 items-start mb-16">
        
        <div className="col-start-2 col-span-3 md:col-start-3 md:col-span-3">
          <h4 className="font-serif text-[28px] md:text-[22px] text-white mb-2 md:mb-3 leading-none">Chalet Weekend</h4>
          <p className="opacity-70 leading-relaxed font-medium text-[13px] md:text-[13px] mt-3">Затишний будиночок<br />у серці Карпат</p>
        </div>
        
        <div className="col-start-1 col-span-2 md:col-start-6 md:col-span-2">
          <h5 className="font-bold text-[15px] md:text-[14px] text-white mb-4 md:mb-5">Навігація</h5>
          <ul className="space-y-3 md:space-y-2.5 font-medium opacity-80 text-[13px]">
            <li><a href="#about" className="hover:text-white transition-colors">Про нас</a></li>
            <li><a href="#booking" className="hover:text-white transition-colors">Будиночок</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">Галерея</a></li>
            <li><a href="#contacts" className="hover:text-white transition-colors">Контакти</a></li>
          </ul>
        </div>
        
        <div className="col-start-3 col-span-2 md:col-start-8 md:col-span-2">
          <h5 className="font-bold text-[15px] md:text-[14px] text-white mb-4 md:mb-5">Контакти</h5>
          <div className="space-y-3 md:space-y-2 font-medium opacity-80 text-[13px]">
            <p>+380 67 688 24 77</p>
            <p>@chalet_weekend2023</p>
            <p>Івано-Франківська обл.,<br className="md:hidden" /> с. Яблуниця<br className="md:hidden" />, Діл, 1736</p>
          </div>
        </div>
        
        <div className="col-start-1 col-span-4 md:col-start-10 md:col-span-2 flex flex-row md:flex-col items-center md:items-start w-full mt-2 md:mt-0">
          <h5 className="font-bold text-[15px] md:text-[14px] text-white mb-0 md:mb-5 w-1/2 md:w-auto">Ми в соцмережах</h5>
          <div className="flex gap-4 w-1/2 md:w-auto">
            <a href="https://www.instagram.com/chalet_weekend2023?igsh=N25ydDZjYW5sMnl3" className="hover:opacity-80 transition-opacity text-white">
              <Camera className="w-8 h-8 md:w-6 md:h-6 stroke-[1.5]" />
            </a>
            <a href="https://t.me/Sandra_HRM" className="hover:opacity-80 transition-opacity text-white">
              <Send className="w-8 h-8 md:w-6 md:h-6 stroke-[1.5]" />
            </a>
          </div>
        </div>
        
      </div>
      <div className="text-center text-[10px] opacity-50 border-t border-white/10 pt-6 font-sans space-y-1.5">
        <p>©Chalet Weekend всі права захищені</p>
        <a href="https://www.smmageofficial.com/" className="tracking-wide">with love, SmmAge 💗</a>
      </div>
    </footer>
  );
};