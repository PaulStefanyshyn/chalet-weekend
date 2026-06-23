import { useState } from 'react';
import { Image, Calendar, List, Trash2, UploadCloud } from 'lucide-react';

{/*Test*/}
export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'gallery' | 'reserve'>('bookings');

  const [bookings] = useState([
    { id: 1, dates: '18.06.2026 - 20.06.2026', name: 'Олександр Петренко', phone: '+380 50 123 45 67', notes: 'Потрібне дитяче ліжечко' },
    { id: 2, dates: '02.07.2026 - 03.07.2026', name: 'Ірина Мельник', phone: '+380 99 000 11 22', notes: 'Заїзд пізно ввечері' },
    { id: 3, dates: '10.07.2026 - 15.07.2026', name: 'Василь Коваль', phone: '+380 67 987 65 43', notes: 'Без побажань' }
  ]);

  const [photos, setPhotos] = useState<string[]>([
    '',
    '',
    ''
  ]);

  const handleDeletePhoto = (indexToRemove: number) => {
    setPhotos(photos.filter((_, index) => index !== indexToRemove));
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPhotoUrl = URL.createObjectURL(e.target.files[0]);
      setPhotos([...photos, newPhotoUrl]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-chalet-dark text-white p-6 flex flex-col gap-4">
        <h2 className="text-xl font-serif font-bold mb-8 tracking-wider">Chalet Admin</h2>
        
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'bookings' ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}
        >
          <List size={18} /> Бронювання
        </button>
        
        <button 
          onClick={() => setActiveTab('reserve')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'reserve' ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}
        >
          <Calendar size={18} /> Ручне бронювання
        </button>

        <button 
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'gallery' ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}
        >
          <Image size={18} /> Галерея
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-serif text-chalet-dark mb-8">
          {activeTab === 'bookings' && 'Актуальні бронювання'}
          {activeTab === 'gallery' && 'Керування фотографіями'}
          {activeTab === 'reserve' && 'Бронювання дат адміністратором'}
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
          
          {activeTab === 'bookings' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-3 px-4 font-medium">Дати</th>
                    <th className="pb-3 px-4 font-medium">ПІБ</th>
                    <th className="pb-3 px-4 font-medium">Телефон</th>
                    <th className="pb-3 px-4 font-medium">Побажання</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-chalet-dark">{booking.dates}</td>
                      <td className="py-4 px-4">{booking.name}</td>
                      <td className="py-4 px-4">{booking.phone}</td>
                      <td className="py-4 px-4 text-slate-500">{booking.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <div className="mb-8">
                <label className="flex flex-col items-center justify-center w-full max-w-md h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-chalet-dark transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">Натисніть, щоб завантажити фото</p>
                    <p className="text-xs mt-1">PNG, JPG (рекомендовано)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleAddPhoto} />
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-100">
                    <img src={photo} alt={`Gallery item ${index}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleDeletePhoto(index)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
                        title="Видалити фото"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking */}
          {activeTab === 'reserve' && (
            <div className="max-w-md">
              <p className="text-sm text-slate-500 mb-6">Тут адміністратор зможе вручну заблокувати дати, якщо клієнт забронював напряму через Instagram або телефон.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Дата заїзду</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Дата виїзду</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Коментар (необов'язково)</label>
                  <input type="text" placeholder="Наприклад: Бронь через Instagram" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <button className="w-full bg-chalet-dark text-white font-medium py-3 rounded-lg hover:bg-chalet-dark/90 transition-colors mt-2">
                  Забронювати дати
                </button>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};