export const Gallery = () => {
  return (
    <section id="gallery" className="py-20 px-6 bg-chalet-dark">
      <h2 className="text-[46px] font-serif text-center mb-12 text-[#E4DFD5]">
        Галерея
      </h2>
      
      <div className="max-w-[1160px] mx-auto">
        
        <div className="hidden md:flex flex-col gap-4">
          
          <div className="grid grid-cols-8 gap-4" style={{ height: '280px' }}>
            <div className="col-span-3 h-full overflow-hidden">
              <img 
                src="" 
                alt="Галерея 1" 
                className="w-full h-full object-cover rounded-[32px]" 
              />
            </div>
            <div className="col-span-3 h-full overflow-hidden">
              <img 
                src="" 
                alt="Галерея 2" 
                className="w-full h-full object-cover rounded-[32px]" 
              />
            </div>
            <div className="col-span-2 h-full overflow-hidden">
              <img 
                src="" 
                alt="Галерея 3" 
                className="w-full h-full object-cover rounded-[32px]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4" style={{ height: '280px' }}>
            
            <div className="col-span-2 h-full overflow-hidden">
              <img 
                src="" 
                alt="Галерея 4" 
                className="w-full h-full object-cover rounded-[32px]" 
              />
            </div>
            
            <div className="col-span-3 h-full flex flex-col gap-4">
              
              <div className="grid grid-cols-3 gap-4" style={{ height: '132px' }}>
                <div className="col-span-2 h-full overflow-hidden">
                  <img 
                    src="" 
                    alt="Галерея 5" 
                    className="w-full h-full object-cover rounded-[32px]" 
                  />
                </div>
                <div className="col-span-1 h-full overflow-hidden">
                  <img 
                    src="" 
                    alt="Галерея 6" 
                    className="w-full h-full object-cover rounded-[32px]" 
                  />
                </div>
              </div>
              
              <div className="w-full overflow-hidden" style={{ height: '132px' }}>
                <img 
                  src=""
                  alt="Галерея 7" 
                  className="w-full h-full object-cover rounded-[32px]" 
                />
              </div>

            </div>

            <div className="col-span-3 h-full overflow-hidden">
              <img 
                src="" 
                alt="Галерея 8" 
                className="w-full h-full object-cover rounded-[32px]" 
              />
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          <img src="" alt="Галерея 1" className="w-full h-[240px] object-cover rounded-[32px]" />
          <img src="" alt="Галерея 2" className="w-full h-[240px] object-cover rounded-[32px]" />
          <img src="" alt="Галерея 3" className="w-full h-[240px] object-cover rounded-[32px]" />
          <img src="" alt="Галерея 4" className="w-full h-[240px] object-cover rounded-[32px]" />
          <img src="" alt="Галерея 5" className="w-full h-[240px] object-cover rounded-[32px]" />
          <img src="" alt="Галерея 8" className="w-full h-[240px] object-cover rounded-[32px]" />
        </div>

      </div>
    </section>
  );
};