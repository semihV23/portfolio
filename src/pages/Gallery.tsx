import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import orderList from '../../public/order.json';

// Vite'in import.meta.glob özelliği ile public/img klasöründeki tüm görselleri otomatik çekiyoruz.
const modules = import.meta.glob('/public/img/*.{jpg,jpeg,png,webp,svg}', { eager: true });

// Dosya yollarını ve sadece dosya isimlerini (filename) ayırıyoruz
const availableImages = Object.keys(modules).map((path) => {
  const filename = path.split('/').pop() || '';
  return { 
    url: path.replace('/public', ''), 
    filename: filename 
  };
});

// Görselleri order.json'daki sıraya göre diziyoruz
const sortedImages = [...availableImages].sort((a, b) => {
  const getIndex = (filename: string) => {
    // Hem uzantılı tam isme hem de uzantısız isme göre arama yapalım
    let idx = orderList.indexOf(filename);
    if (idx !== -1) return idx;
    
    const baseName = filename.substring(0, filename.lastIndexOf('.')) || filename;
    return orderList.indexOf(baseName);
  };

  const indexA = getIndex(a.filename);
  const indexB = getIndex(b.filename);

  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  
  return a.filename.localeCompare(b.filename);
});

const images = sortedImages.map(img => img.url);

export default function Gallery() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ekran genişliğine göre sütun sayısını belirle
  let colCount = 1;
  if (windowWidth >= 1024) colCount = 3;
  else if (windowWidth >= 768) colCount = 2;

  // Görselleri soldan sağa dağıt (Dealing cards mantığı)
  const columns: string[][] = Array.from({ length: colCount }, () => []);
  images.forEach((img, index) => {
    columns[index % colCount].push(img);
  });

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1920px] mx-auto px-4 md:px-8 relative pt-4 pb-2"
      >
        <div className="flex gap-[48px] relative z-10 bg-white">
          {columns.map((columnImages, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2 w-full">
              {columnImages.map((img) => {
                const originalIndex = images.indexOf(img);
                return (
                  <motion.div 
                    key={img} 
                    className="relative group flex flex-col"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <div className="relative overflow-hidden bg-gray-100">
                      <img 
                        src={img} 
                        alt={`Gallery Image ${originalIndex}`} 
                        loading="lazy"
                        className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                      {/* Sıra Numarası */}
                      <span className="absolute bottom-3 right-3 text-[10px] text-white/60 font-light tracking-widest drop-shadow-md select-none pointer-events-none">
                        {originalIndex + 1} / {images.length}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>

    </>
  );
}
