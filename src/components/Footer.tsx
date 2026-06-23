import { Camera, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-chalet-dark text-chalet-input/80 pt-16 pb-6 px-6 text-xs border-t border-white/5">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 items-start mb-16">
        <div className="md:col-span-4">
          <h4 className="font-serif text-lg text-white mb-3">Chalet Weekend</h4>
          <p className="opacity-70 leading-relaxed font-medium">Затишний будиночок<br />у серці Карпат</p>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-bold uppercase tracking-wider text-white mb-4">Навігація</h5>
          <ul className="space-y-2.5 font-medium opacity-80">
            <li><a href="#about" className="hover:text-white transition-colors">Про нас</a></li>
            <li><a href="#booking" className="hover:text-white transition-colors">Будиночок</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">Галерея</a></li>
            <li><a href="#contacts" className="hover:text-white transition-colors">Контакти</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-bold uppercase tracking-wider text-white mb-4">Контакти</h5>
          <div className="space-y-2 font-medium opacity-80">
            <p>+380 99 999 99 99</p>
            <p>@chalet_weekend2023</p>
            <p>Івано-Франківська обл., Діл, 1736</p>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col items-center md:items-end">
          <h5 className="font-bold uppercase tracking-wider text-white mb-4 text-center md:text-right w-full">Ми в соцмережах</h5>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity text-white">
              <Camera className="w-6 h-6 stroke-[1.5]" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity text-white">
              <Send className="w-6 h-6 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-[10px] opacity-50 border-t border-white/10 pt-6 font-sans space-y-1.5">
        <p>©Chalet Weekend всі права захищені</p>
        <p className="tracking-wide">with love, SmmAge 💗</p>
      </div>
    </footer>
  );
};