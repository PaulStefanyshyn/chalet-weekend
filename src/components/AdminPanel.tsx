import { useState, useEffect } from 'react';
import { Image, Calendar, List, Trash2, UploadCloud, Lock } from 'lucide-react';

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'gallery' | 'reserve'>('bookings');
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  
  const [reserveStart, setReserveStart] = useState('');
  const [reserveEnd, setReserveEnd] = useState('');
  const [reservePib, setReservePib] = useState('');
  const [reservePhone, setReservePhone] = useState('');
  const [reserveGuests, setReserveGuests] = useState('');
  const [reserveComment, setReserveComment] = useState('');

  const getLocalDateStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const todayStr = getLocalDateStr(new Date());
  
  let minEnd = todayStr;
  if (reserveStart) {
     minEnd = reserveStart;
  }

  const fetchBookings = () => {
    fetch('http://localhost:5000/api/admin/bookings', {
      headers: { 'Authorization': password }
    })
      .then(res => res.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]));
  };

  const fetchPhotos = () => {
    fetch('http://localhost:5000/api/photos')
      .then(res => res.json())
      .then(data => setPhotos(Array.isArray(data) ? data : []))
      .catch(() => setPhotos([]));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchPhotos();
      
      const intervalId = setInterval(() => {
        fetchBookings();
      }, 10000);
      
      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        alert('Wrong password');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  const handleDeletePhoto = async (id: number) => {
    await fetch(`http://localhost:5000/api/photos/${id}`, { 
      method: 'DELETE',
      headers: { 'Authorization': password }
    });
    fetchPhotos();
  };

  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    try {
      await fetch('http://localhost:5000/api/photos', { 
        method: 'POST', 
        headers: { 'Authorization': password },
        body: formData 
      });
      fetchPhotos();
    } catch (err) {
      alert('Upload error');
    }
  };

  const handleUpdateAboutPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    try {
      await fetch('http://localhost:5000/api/photos/about', { 
        method: 'POST', 
        headers: { 'Authorization': password },
        body: formData 
      });
      fetchPhotos();
      alert('Головне фото успішно оновлено!');
    } catch (err) {
      alert('Upload error');
    }
  };

  const handleConfirm = async (id: number) => {
    await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': password },
      body: JSON.stringify({ status: 'confirmed' })
    });
    fetchBookings();
  };

  const handleDeleteBooking = async (id: number) => {
    if (confirm('Ви впевнені, що хочете видалити це бронювання?')) {
      await fetch(`http://localhost:5000/api/bookings/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': password }
      });
      fetchBookings();
    }
  };

  const handleAdminReserve = async () => {
    if (!reserveStart || !reserveEnd) return;
    if (reserveStart > reserveEnd) {
       alert('Дата виїзду не може бути раніше дати заїзду.');
       return;
    }
    
    let finalComment = reserveComment;
    if (reserveGuests) {
      finalComment = `Гостей: ${reserveGuests}. ${reserveComment}`;
    }

    await fetch('http://localhost:5000/api/bookings/admin-reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': password },
      body: JSON.stringify({
        check_in: reserveStart,
        check_out: reserveEnd,
        pib: reservePib || 'Адміністратор',
        phone: reservePhone || 'ADMIN',
        comment: finalComment
      })
    });
    setReserveStart('');
    setReserveEnd('');
    setReservePib('');
    setReservePhone('');
    setReserveGuests('');
    setReserveComment('');
    fetchBookings();
    alert('Reserved');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full flex flex-col items-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4 text-slate-700">
            <Lock size={32} />
          </div>
          <h2 className="text-xl font-serif font-bold text-slate-800 mb-6">Chalet Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-800 mb-4 text-center"
          />
          <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-chalet-dark text-white p-6 flex flex-col gap-4">
        <h2 className="text-xl font-serif font-bold mb-8 tracking-wider">Chalet Admin</h2>
        <button onClick={() => setActiveTab('bookings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'bookings' ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}><List size={18} /> Бронювання</button>
        <button onClick={() => setActiveTab('reserve')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'reserve' ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}><Calendar size={18} /> Ручне Бронювання</button>
        <button onClick={() => setActiveTab('gallery')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'gallery' ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}><Image size={18} /> Галерея</button>
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
                    <th className="pb-3 px-4 font-medium">Заїзд</th>
                    <th className="pb-3 px-4 font-medium">Виїзд</th>
                    <th className="pb-3 px-4 font-medium">ПІБ</th>
                    <th className="pb-3 px-4 font-medium">Телефон</th>
                    <th className="pb-3 px-4 font-medium">Побажання</th>
                    <th className="pb-3 px-4 font-medium">Статус</th>
                    <th className="pb-3 px-4 font-medium">Дії</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookings?.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-chalet-dark">{new Date(booking.check_in).toLocaleDateString('uk-UA')}</td>
                      <td className="py-4 px-4 font-medium text-chalet-dark">{new Date(booking.check_out).toLocaleDateString('uk-UA')}</td>
                      <td className="py-4 px-4">{booking.pib}</td>
                      <td className="py-4 px-4">{booking.phone}</td>
                      <td className="py-4 px-4 text-slate-500">{booking.comment}</td>
                      <td className="py-4 px-4 font-bold text-chalet-dark">
                        {booking.status === 'confirmed' ? 'Підтверджено' : <span className="text-amber-500">Очікує</span>}
                      </td>
                      <td className="py-4 px-4 flex gap-2">
                        {booking.status === 'pending' && (
                          <button onClick={() => handleConfirm(booking.id)} className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors" title="Підтвердити">✅</button>
                        )}
                        <button onClick={() => handleDeleteBooking(booking.id)} className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors" title="Видалити">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-12">
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-base font-serif font-bold text-slate-800 mb-2">1. Секція «Про нас»</h3>
                <p className="text-xs text-slate-500 mb-4">Зміна головного великого зображення, що відображається біля списку зручностей.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="w-full aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                    {photos.find(p => p.id === 999) ? (
                      <img src={photos.find(p => p.id === 999).url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">Немає фото</div>
                    )}
                  </div>
                  <label className="md:col-span-2 flex flex-col items-center justify-center h-32 border-2 border-dashed border-amber-300 bg-amber-50/10 rounded-xl cursor-pointer hover:bg-amber-50 hover:border-amber-500 transition-all">
                    <div className="flex flex-col items-center justify-center text-amber-800 text-center px-4">
                      <UploadCloud className="w-6 h-6 mb-2" />
                      <p className="text-sm font-medium">Завантажити нове фото для «Про нас»</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpdateAboutPhoto} />
                  </label>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-base font-serif font-bold text-slate-800 mb-2">2. Блок котеджу «Chalet Weekend»</h3>
                <p className="text-xs text-slate-500 mb-6">Керування 4 фіксованими фотографіями в інтерактивній міні-галереї біля опису цін та умов.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[101, 102, 103, 104].map((id, index) => (
                    <label key={id} className="flex flex-col items-center justify-center aspect-square border border-dashed border-slate-400 bg-white rounded-xl cursor-pointer hover:border-slate-800 transition-all relative overflow-hidden group">
                      {photos.find(p => p.id === id) ? (
                        <>
                          <img src={photos.find(p => p.id === id).url} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium gap-1">
                            <UploadCloud size={16} />
                            <span>Змінити фото {index + 1}</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-slate-500">Фото {index + 1}</span>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('photo', file);
                          await fetch(`http://localhost:5000/api/photos/update/${id}`, { 
                            method: 'POST', 
                            headers: { 'Authorization': password },
                            body: formData 
                          });
                          fetchPhotos();
                        }} 
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-base font-serif font-bold text-slate-800 mb-2">3. Загальна карусель-галерея сайту</h3>
                <p className="text-xs text-slate-500 mb-4">Сюди можна завантажувати необмежену кількість фотографій, які будуть показуватися в основній галереї внизу сайту.</p>
                
                <label className="flex flex-col items-center justify-center w-full max-w-md h-28 border-2 border-dashed border-slate-300 bg-white rounded-xl cursor-pointer hover:bg-slate-50 hover:border-slate-600 transition-all mb-6">
                  <div className="flex flex-col items-center justify-center text-slate-500 text-center px-4">
                    <UploadCloud className="w-6 h-6 mb-1" />
                    <p className="text-sm font-medium">Додати нове фото в стрічку</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleAddPhoto} />
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos?.filter(p => p.id !== 999 && p.id !== 101 && p.id !== 102 && p.id !== 103 && p.id !== 104).map((photo) => (
                    <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-100 bg-slate-100">
                      <img src={photo.url} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => handleDeletePhoto(photo.id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'reserve' && (
            <div className="max-w-md">
              <p className="text-sm text-slate-500 mb-6">Тут адміністратор зможе вручну заблокувати дати, якщо клієнт забронював напряму через Instagram або телефон.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Дата заїзду</label>
                  <input type="date" min={todayStr} value={reserveStart} onChange={e => {
                    setReserveStart(e.target.value);
                    if (reserveEnd && e.target.value > reserveEnd) setReserveEnd('');
                  }} className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Дата виїзду</label>
                  <input type="date" min={minEnd} value={reserveEnd} onChange={e => setReserveEnd(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">ПІБ (необов'язково)</label>
                  <input type="text" value={reservePib} onChange={e => setReservePib(e.target.value)} placeholder="Ім'я клієнта" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Телефон (необов'язково)</label>
                  <input type="text" value={reservePhone} onChange={e => setReservePhone(e.target.value)} placeholder="+380..." className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Кількість гостей (необов'язково)</label>
                  <input type="number" value={reserveGuests} onChange={e => setReserveGuests(e.target.value)} placeholder="Наприклад: 4" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Коментар</label>
                  <input type="text" value={reserveComment} onChange={e => setReserveComment(e.target.value)} placeholder="Наприклад: Бронь через Instagram" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-chalet-dark" />
                </div>
                <button onClick={handleAdminReserve} className="w-full bg-chalet-dark text-white font-medium py-3 rounded-lg hover:bg-chalet-dark/90 transition-colors mt-2">Забронювати дати</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};