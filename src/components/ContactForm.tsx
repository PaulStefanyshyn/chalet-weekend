import { Phone, Camera, MapPin } from 'lucide-react';

export const ContactForm = () => {
  return (
    <section id="contacts" className="py-20 px-6 bg-[#FDF8F5] text-chalet-text-dark">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">Зв'язатися з нами</p>
          <h2 className="text-3xl font-serif mb-4 text-chalet-dark">Забронюйте свій відпочинок вже сьогодні</h2>
          <p className="text-xs opacity-70 leading-relaxed mb-4">
            Напишіть нам, і ми допоможемо обрати найкращий відпочинок для вас.
          </p>
          <p className="text-xs font-semibold opacity-80 mb-6">
            При бронюванні від 6 ночей отримуєте вигіднішу вартість проживання.<br />
            <span className="text-chalet-dark font-bold">-10% для військових.</span>
          </p>
          <div className="space-y-4 text-xs font-medium">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-chalet-dark stroke-[1.5]" />
              <span>+380 99 999 99 99</span>
            </div>
            <div className="flex items-center gap-3">
              <Camera className="w-4 h-4 text-chalet-dark stroke-[1.5]" />
              <span>@chalet_weekend2023</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-chalet-dark stroke-[1.5]" />
              <span>Івано-Франківська область, Діл, 1736</span>
            </div>
          </div>
        </div>
        <form className="w-full md:w-[45%] flex flex-col gap-3.5" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Ваше ім'я" className="w-full bg-chalet-input/40 placeholder-chalet-text-dark/50 border border-chalet-text-dark/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-chalet-dark/40" />
          <input type="tel" placeholder="Телефон" className="w-full bg-chalet-input/40 placeholder-chalet-text-dark/50 border border-chalet-text-dark/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-chalet-dark/40" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Дата заїзду" className="w-full bg-chalet-input/40 placeholder-chalet-text-dark/50 border border-chalet-text-dark/10 rounded-xl px-4 py-3 text-xs outline-none" />
            <input type="text" placeholder="Дата виїзду" className="w-full bg-chalet-input/40 placeholder-chalet-text-dark/50 border border-chalet-text-dark/10 rounded-xl px-4 py-3 text-xs outline-none" />
          </div>
          <input type="number" placeholder="Кількість гостей" className="w-full bg-chalet-input/40 placeholder-chalet-text-dark/50 border border-chalet-text-dark/10 rounded-xl px-4 py-3 text-xs outline-none" />
          <textarea placeholder="Ваше повідомлення" rows={3} className="w-full bg-chalet-input/40 placeholder-chalet-text-dark/50 border border-chalet-text-dark/10 rounded-xl px-4 py-3 text-xs outline-none resize-none"></textarea>
          <button className="w-full bg-chalet-dark text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-chalet-dark/90 transition-colors mt-2">
            Надіслати
          </button>
        </form>
      </div>
    </section>
  );
};