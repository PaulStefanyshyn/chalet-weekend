import { useState, useEffect } from 'react';

export const Gallery = () => {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/photos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const galleryPhotos = data.filter((p: any) => p.id !== 999 && p.id !== 101 && p.id !== 102 && p.id !== 103 && p.id !== 104);
          setPhotos(galleryPhotos);
        }
      })
      .catch(() => {});
  }, []);

  const getPhoto = (index: number) => photos[index]?.url || '';

  return (
    <section id="gallery" className="pt-12 pb-20 px-6 bg-chalet-dark">
      <h2 className="text-[46px] font-serif text-center mb-12 text-[#E4DFD5]">
        Галерея
      </h2>
      
      <div className="max-w-[1160px] mx-auto">
        
        <div className="hidden md:flex flex-col gap-4">
          <div className="grid grid-cols-8 gap-4" style={{ height: '280px' }}>
            <div className="col-span-3 h-full overflow-hidden bg-slate-800 rounded-[32px]">
              {getPhoto(0) && <img src={getPhoto(0)} alt="Галерея 1" className="w-full h-full object-cover rounded-[32px]" />}
            </div>
            <div className="col-span-3 h-full overflow-hidden bg-slate-800 rounded-[32px]">
              {getPhoto(1) && <img src={getPhoto(1)} alt="Галерея 2" className="w-full h-full object-cover rounded-[32px]" />}
            </div>
            <div className="col-span-2 h-full overflow-hidden bg-slate-800 rounded-[32px]">
              {getPhoto(2) && <img src={getPhoto(2)} alt="Галерея 3" className="w-full h-full object-cover rounded-[32px]" />}
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4" style={{ height: '280px' }}>
            <div className="col-span-2 h-full overflow-hidden bg-slate-800 rounded-[32px]">
              {getPhoto(3) && <img src={getPhoto(3)} alt="Галерея 4" className="w-full h-full object-cover rounded-[32px]" />}
            </div>
            
            <div className="col-span-3 h-full flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4" style={{ height: '132px' }}>
                <div className="col-span-2 h-full overflow-hidden bg-slate-800 rounded-[32px]">
                  {getPhoto(4) && <img src={getPhoto(4)} alt="Галерея 5" className="w-full h-full object-cover rounded-[32px]" />}
                </div>
                <div className="col-span-1 h-full overflow-hidden bg-slate-800 rounded-[32px]">
                  {getPhoto(5) && <img src={getPhoto(5)} alt="Галерея 6" className="w-full h-full object-cover rounded-[32px]" />}
                </div>
              </div>
              
              <div className="w-full overflow-hidden bg-slate-800 rounded-[32px]" style={{ height: '132px' }}>
                {getPhoto(6) && <img src={getPhoto(6)} alt="Галерея 7" className="w-full h-full object-cover rounded-[32px]" />}
              </div>
            </div>

            <div className="col-span-3 h-full overflow-hidden bg-slate-800 rounded-[32px]">
              {getPhoto(7) && <img src={getPhoto(7)} alt="Галерея 8" className="w-full h-full object-cover rounded-[32px]" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {photos.slice(0, 4).map((p, i) => (
            <img key={i} src={p.url} alt="Галерея" className="w-full h-[240px] object-cover rounded-[32px] bg-slate-800" />
          ))}
        </div>

      </div>
    </section>
  );
};