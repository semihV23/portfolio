import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-black flex">
      {/* Sol Menü (Dergi Sırtı Görünümü) */}
      <header className="fixed top-0 left-0 h-screen w-14 md:w-20 bg-white z-50 flex flex-col justify-between items-center py-8 mix-blend-difference border-r border-gray-100">
        
        {/* Logo / İsim */}
        <Link 
          to="/" 
          className="text-[10px] md:text-[11px] font-semibold tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          SEMİH AYYILMAZ
        </Link>
        
        {/* Navigasyon Linkleri */}
        <nav 
          className="flex gap-8 text-[9px] md:text-[10px] font-semibold tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {/* Alttan üste okuyacağı için önce Hakkımda, üstünde Galeri olacak */}
          <Link
            to="/hakkimda"
            className={`hover:opacity-60 transition-opacity duration-300 ${location.pathname === '/hakkimda' ? 'opacity-100' : 'opacity-40'}`}
          >
            HAKKIMDA
          </Link>
          <Link
            to="/"
            className={`hover:opacity-60 transition-opacity duration-300 ${location.pathname === '/' ? 'opacity-100' : 'opacity-40'}`}
          >
            GALERİ
          </Link>
        </nav>

        {/* Alt Kısım - Süsleme (Yıl veya Baskı) */}
        <div 
          className="text-[8px] md:text-[9px] text-gray-400 tracking-[0.2em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Vol. 1 — 2026
        </div>
      </header>

      {/* Sağ Yan Süsleme (Sadece Büyük Ekranlarda) */}
      <div className="fixed top-0 right-0 h-screen w-12 hidden lg:flex items-center justify-center z-40 pointer-events-none">
        <span 
          className="text-gray-200 text-6xl font-light tracking-tighter whitespace-nowrap opacity-30 select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          CONTEMPORARY PHOTOGRAPHY ARCHIVE
        </span>
      </div>

      {/* Sayfa İçeriği */}
      <main className="ml-14 md:ml-20 w-[calc(100%-3.5rem)] md:w-[calc(100%-5rem)] min-h-screen flex flex-col relative">
        <div className="flex-1">
          <Outlet />
        </div>
        
        {/* Sayfa Sonundaki Siyah Blok */}
        <div className="w-full bg-black z-20">
          {/* Yüksekliği otomatik olarak fixed SVG ile aynı yapmak için görünmez bir kopya ekliyoruz */}
          <img 
            src="/AYYILMAZ.svg" 
            alt="Footer Spacer" 
            className="w-full h-auto opacity-0 pointer-events-none" 
          />
        </div>
        
        {/* Alt Kısma Sabitlenmiş Görsel */}
        <div className="fixed bottom-0 left-14 md:left-20 w-[calc(100%-3.5rem)] md:w-[calc(100%-5rem)] pointer-events-none z-30">
          <img 
            src="/AYYILMAZ.svg" 
            alt="Ayyılmaz" 
            className="w-full h-auto object-cover object-bottom opacity-40" 
          />
        </div>
      </main>
    </div>
  );
}
