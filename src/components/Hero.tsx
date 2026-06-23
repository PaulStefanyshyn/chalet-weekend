import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-chalet-dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="./assets/background.JPG" 
          alt="Карпати ліс" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center text-chalet-input pt-24 flex flex-col items-center justify-center h-full w-full">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal mb-6 leading-tight drop-shadow-md max-w-5xl mx-auto break-words">
          Ваш ідеальний вікенд у Карпатах
        </h1>
        <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-[35px] font-normal max-w-3xl mx-auto drop-shadow-md mb-12 leading-snug break-words">
          Затишний будиночок для сім'ї та компанії з приватним чаном і сауною.
        </p>
        <div className="flex flex-col items-center gap-8">
          <a 
            href="#booking" 
            className="bg-chalet-dark text-chalet-input font-sans text-base sm:text-lg md:text-xl lg:text-[24px] font-normal px-8 py-4 md:px-[40px] md:py-[24px] rounded-[10px] drop-shadow-md transition-opacity hover:opacity-90 inline-block whitespace-nowrap"
          >
            Забронювати відпочинок
          </a>
          <a href="#about" className="animate-bounce text-chalet-input drop-shadow-md hover:opacity-80 transition-opacity">
            <ArrowDown className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
          </a>
        </div>
      </div>
    </section>
  );
};