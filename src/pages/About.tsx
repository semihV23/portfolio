import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1920px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start"
    >
      {/* Sağ Kısım - Sol Kısım olarak 2 sütun */}
      <div className="w-full md:w-5/12">
        <div className="aspect-square bg-gray-100 overflow-hidden border border-gray-100">
          <img 
            src="/profile.png" 
            alt="Semih Ayyılmaz" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </div>

      <div className="w-full md:w-7/12 flex flex-col gap-6 md:mt-10">
        <h1 
          className="text-4xl md:text-6xl tracking-[0.05em] text-gray-900" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Merhaba, <span className="italic text-gray-500 font-light">Ben Semih.</span>
        </h1>
        <div className="h-px bg-gray-300 w-1/4"></div>
        <div className="flex flex-col gap-5 text-gray-800 leading-[1.8] md:leading-[2] text-base md:text-lg max-w-2xl text-justify" style={{ fontFamily: "'Lora', serif" }}>
          <p>
            Zamanı durdurmayı, ışıkla hikayeler anlatmayı ve dünyayı lensimin arkasından 
            biraz daha farklı görmeyi seviyorum. Bu portfolyo, farklı mekanlarda durdurduğum 
            zamanlardan oluşuyor.
          </p>
        </div>
        
        <div className="flex gap-8 mt-6">
          <a href="mailto:ayyilmazsemih@gmail.com" aria-label="Mail" className="text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-60 transition-opacity">
            MAIL
          </a>
          <a href="https://instagram.com/semih_v23" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-60 transition-opacity">
            INSTAGRAM
          </a>
        </div>

        <div className="mt-12 md:mt-16">
          <p className="text-gray-400 text-xs md:text-sm italic font-serif tracking-wider">
            inspired by koray birand
          </p>
        </div>
      </div>
    </motion.div>
  );
}
