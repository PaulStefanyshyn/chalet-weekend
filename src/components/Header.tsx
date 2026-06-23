import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-[1280px] mx-auto px-6 py-8 flex justify-between items-center relative">
        <div />

        <nav className="hidden md:flex items-center gap-8 text-[18px] font-normal text-[#E3DEDE] font-sans drop-shadow-md mx-auto">
          <a href="#about" className="hover:opacity-80 transition-opacity">Про нас</a>
          <a href="#booking" className="hover:opacity-80 transition-opacity">Будиночок</a>
          <a href="#gallery" className="hover:text-white/70 transition-colors">Галерея</a>
          <a href="#contacts" className="hover:text-white/70 transition-colors">Контакти</a>
        </nav>

        <div className="hidden md:block md:absolute md:right-6">
          <a 
            href="#booking" 
            className="bg-[#15304D] text-[#E3DEDE] px-5 py-[12px] rounded-[10px] text-[14px] font-normal font-sans drop-shadow-md transition-opacity hover:opacity-90 inline-block text-center"
          >
            Забронювати
          </a>
        </div>

        <button 
          className="md:hidden z-50 text-[#E3DEDE] drop-shadow-md ml-auto" 
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>

        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className={`fixed top-0 right-0 h-screen w-[280px] bg-[#15304D] z-50 transform transition-transform duration-300 ease-in-out flex flex-col p-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
            <span className="text-[#E3DEDE] font-sans font-normal text-[18px] drop-shadow-md">Навігація</span>
            <button onClick={() => setIsOpen(false)} className="text-[#E3DEDE]">
              <X size={28} />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 font-sans text-[18px] font-normal text-[#E3DEDE] drop-shadow-md">
            <a href="#about" onClick={() => setIsOpen(false)}>Про нас</a>
            <a href="#booking" onClick={() => setIsOpen(false)}>Будиночок</a>
            <a href="#gallery" onClick={() => setIsOpen(false)}>Галерея</a>
            <a href="#contacts" onClick={() => setIsOpen(false)}>Контакти</a>
          </div>
        </div>
      </div>
    </header>
  );
};