import { useEffect, useState } from 'react';
import { IconPlayer } from './PixelIcons';

/* ============================================
   KONFIGURASI SLIDER
   ============================================ */
const SLIDES = [
  { src: '/images/profile-1.png', label: 'FOTO 1' },
  { src: '/images/profile-2.png', label: 'FOTO 2' },
  { src: '/images/profile-3.png', label: 'FOTO 3' },
];

const INTERVAL_MS = 3500; // ganti foto tiap 3.5 detik

/* ============================================
   KOMPONEN PROFILE SLIDER
   ============================================ */
export default function ProfileSlider() {
  const [current, setCurrent] = useState(0);
  const [errored, setErrored] = useState({}); // track foto yang gagal load

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => setCurrent(idx);
  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  // Foto yang sudah berhasil load (tidak error) — untuk dot indicator
  const validSlides = SLIDES.filter((_, i) => !errored[i]);

  return (
    <div className="flex justify-center mb-5 sm:mb-6">
      <div className="relative">
        {/* FRAME FOTO */}
        <div
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-4 border-black bg-pixel-night shadow-pixel-lg overflow-hidden relative group cursor-pointer"
          onClick={next}
          title="Klik untuk foto selanjutnya"
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {!errored[idx] ? (
                <img
                  src={slide.src}
                  alt={`Fadli Ramadhan - Foto ${idx + 1}`}
                  onError={() => setErrored((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ) : (
                // Placeholder kalau foto belum ada
                <div className="w-full h-full flex flex-col items-center justify-center bg-pixel-sky-dark text-pixel-cream gap-2 p-2">
                  <IconPlayer size={48} />
                  <p className="font-pixel text-[8px] sm:text-[9px] text-center leading-relaxed">
                    TARUH FOTO
                    <br />
                    {idx + 1}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Overlay hint (hover) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
            <p className="font-pixel text-[8px] text-pixel-accent bg-pixel-night/80 border-2 border-black px-2 py-1">
              KLIK &gt;
            </p>
          </div>

          {/* Progress bar bawah */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-30 flex">
            {SLIDES.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 relative overflow-hidden"
              >
                <div
                  className={`h-full ${
                    idx === current ? 'bg-pixel-accent' : 'bg-transparent'
                  }`}
                  style={
                    idx === current
                      ? { animation: `progressFill ${INTERVAL_MS}ms linear` }
                      : {}
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* BADGE ONLINE */}
        <div className="absolute -bottom-3 -right-3 bg-pixel-accent border-4 border-black px-2 py-1 font-pixel text-[8px] sm:text-[9px] text-pixel-night z-40">
          ONLINE
        </div>

        {/* BADGE LEVEL */}
        <div className="absolute -top-3 -left-3 bg-pixel-red border-4 border-black px-2 py-1 font-pixel text-[8px] sm:text-[9px] text-pixel-cream z-40">
          LV.42
        </div>

        {/* NAVIGATION ARROWS */}
        <button
          onClick={prev}
          aria-label="Foto sebelumnya"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-pixel-accent border-4 border-black text-pixel-night font-pixel text-xs flex items-center justify-center shadow-pixel-sm hover:-translate-y-[calc(50%+2px)] active:translate-y-1/2 transition-all z-40 hidden group-hover:flex"
        >
          &lt;
        </button>
        <button
          onClick={next}
          aria-label="Foto selanjutnya"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-pixel-accent border-4 border-black text-pixel-night font-pixel text-xs flex items-center justify-center shadow-pixel-sm hover:-translate-y-[calc(50%+2px)] active:translate-y-1/2 transition-all z-40 hidden group-hover:flex"
        >
          &gt;
        </button>

        {/* DOT INDICATORS */}
        <div className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Lihat foto ${idx + 1}`}
              className={`w-3 h-3 border-2 border-black transition-all ${
                idx === current
                  ? 'bg-pixel-accent scale-125'
                  : errored[idx]
                    ? 'bg-pixel-red/50'
                    : 'bg-pixel-cream hover:bg-pixel-accent'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}