
import bgImage from '../assets/background.png';

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-chalet-dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage}
          alt="Карпати ліс" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-left md:text-center text-chalet-input pt-32 pb-16 flex flex-col items-start md:items-center justify-center min-h-screen w-full">
        <h1 className="font-serif text-[40px] sm:text-5xl md:text-6xl lg:text-[70px] font-normal mb-6 leading-[1.1] drop-shadow-md max-w-5xl mx-0 md:mx-auto break-words">
          Ваш ідеальний вікенд<br className="hidden md:block" /> у Карпатах
        </h1>
        <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-[35px] font-normal max-w-3xl mx-0 md:mx-auto drop-shadow-md mb-12 leading-snug break-words opacity-90">
          Затишний будиночок для сім'ї та компанії з приватним чаном і сауною
        </p>
        <div className="flex flex-col items-start md:items-center gap-8 w-full md:w-auto">
          <a 
            href="#booking" 
            className="w-full md:w-auto text-center bg-chalet-dark text-chalet-input font-sans text-base sm:text-lg md:text-xl lg:text-[24px] font-normal px-8 py-4 md:px-[40px] md:py-[24px] rounded-[10px] drop-shadow-md transition-opacity hover:opacity-90 whitespace-nowrap"
          >
            Забронювати відпочинок
          </a>
          <a href="#about" className="animate-bounce text-chalet-input drop-shadow-md hover:opacity-80 transition-opacity self-center mt-4">
            <svg viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-[37px] md:w-10 md:h-[46px] lg:w-12 lg:h-[56px]">
              <path d="M12 4v20" />
              <path d="m19 17-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};