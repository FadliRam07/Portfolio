import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconPlayer,
  IconSoccerBall,
  IconShuttlecock,
  IconStar,
  IconCrown,
  IconTrophy,
  IconChart,
  IconDownload,
} from './PixelIcons';

/* ============================================
   KONFIGURASI
   ============================================ */
const HERO_BG = '/images/hero-bg.jpg';

const PROFILE_PHOTOS = [
  '/images/profile-1.jpeg',
  '/images/profile-2.jpeg',
  '/images/profile-3.jpeg',
];
const SLIDE_INTERVAL_MS = 3500;

export default function ArcadeHero() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [bgError, setBgError] = useState(false);
  const [coins, setCoins] = useState(99);

  useEffect(() => {
    if (imgError) return;
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % PROFILE_PHOTOS.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [imgError]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % PROFILE_PHOTOS.length);
    setCoins((c) => c + 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* BACKGROUND STADION */}
      <div className="absolute inset-0">
        {!bgError ? (
          <img
            src={HERO_BG}
            alt=""
            onError={() => setBgError(true)}
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-pixel-sky via-pixel-grass-light to-pixel-grass-dark" />
        )}
        <div className="absolute inset-0 bg-pixel-night/70" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.4) 2px 3px)',
          }}
        />
      </div>

      {/* HUD BAR ATAS */}
      <div className="relative bg-pixel-night/70 backdrop-blur-sm px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 font-pixel text-[8px] sm:text-[10px]">
        <div className="flex items-center gap-2 text-pixel-cream">
          <span className="hidden xs:inline">LIFE:</span>
          <span className="hidden xs:inline text-pixel-red">♥♥♥</span>
          <div className="flex xs:hidden gap-0.5">
            <span className="text-pixel-red">♥</span>
            <span className="text-pixel-red">♥</span>
            <span className="text-pixel-red">♥</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-pixel-accent">
          <span>COINS:</span>
          <span className="text-white">{String(coins).padStart(2, '0')}</span>
        </div>

        <div className="flex items-center gap-2 text-pixel-cream">
          <span className="hidden sm:inline">NAME:</span>
          <span className="text-pixel-accent">FADLI</span>
          <span className="w-6 h-6 border-2 border-black bg-pixel-grass-light flex items-center justify-center flex-shrink-0">
            <IconPlayer size={14} />
          </span>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative px-4 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

          {/* ==========================================
              BARIS 1: FOTO + PERKENALAN
              Foto di-align dengan bagian MESSAGE saja
              ========================================== */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 sm:gap-8 md:gap-10">
            {/* KOLOM KIRI — FOTO (posisikan sejajar dengan kotak MESSAGE) */}
            <div className="flex flex-col md:pt-28 lg:pt-32">
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div
                    className="w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 border-4 border-black bg-pixel-night shadow-pixel-lg overflow-hidden relative cursor-pointer animate-glow"
                    onClick={nextPhoto}
                    title="Klik untuk foto selanjutnya"
                  >
                    {!imgError ? (
                      <>
                        {PROFILE_PHOTOS.map((src, idx) => (
                          <img
                            key={src}
                            src={src}
                            alt={`Foto ${idx + 1}`}
                            onError={() => idx === 0 && setImgError(true)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                              idx === currentPhoto
                                ? 'opacity-100 z-10'
                                : 'opacity-0 z-0'
                            }`}
                            style={{ imageRendering: 'pixelated' }}
                          />
                        ))}

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-20 flex">
                          {PROFILE_PHOTOS.map((_, idx) => (
                            <div
                              key={idx}
                              className="flex-1 relative overflow-hidden"
                            >
                              <div
                                className={`h-full ${
                                  idx === currentPhoto
                                    ? 'bg-pixel-accent'
                                    : 'bg-transparent'
                                }`}
                                style={
                                  idx === currentPhoto
                                    ? {
                                        animation: `progressFill ${SLIDE_INTERVAL_MS}ms linear`,
                                      }
                                    : {}
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-pixel-sky-dark text-pixel-cream gap-2 p-3">
                        <IconPlayer size={56} />
                        <p className="font-pixel text-[8px] text-center leading-relaxed">
                          TARUH FOTO DI
                          <br />
                          /public/images/profile-1.jpeg
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-3 -right-3 bg-pixel-accent border-4 border-black px-2 py-1 font-pixel text-[8px] sm:text-[9px] text-pixel-night z-40 animate-floatBall">
                    ONLINE
                  </div>

                  <div className="absolute -top-3 -left-3 bg-pixel-red border-4 border-black px-2 py-1 font-pixel text-[8px] sm:text-[9px] text-pixel-cream z-40">
                    LV.42
                  </div>

                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                    {PROFILE_PHOTOS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPhoto(idx);
                        }}
                        aria-label={`Foto ${idx + 1}`}
                        className={`w-2.5 h-2.5 border-2 border-black transition-all ${
                          idx === currentPhoto
                            ? 'bg-pixel-accent scale-125'
                            : 'bg-pixel-cream hover:bg-pixel-accent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN — GREETING + MESSAGE + PILLAR */}
            <div className="text-center md:text-left">
              {/* Title kecil */}
              <div className="inline-block bg-pixel-night/80 border-2 border-black px-2.5 py-1 mb-3">
                <span className="font-pixel text-[9px] sm:text-[10px] text-pixel-accent">
                  PORTFOLIO
                </span>
                <span className="font-pixel text-[9px] sm:text-[10px] text-pixel-cream ml-2">
                  [ ALFA.DEV ]
                </span>
              </div>

              {/* GREETING */}
              <h1 className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-cream leading-relaxed mb-1">
                HAI, SAYA{' '}
                <span className="text-pixel-accent">FADLI RAMADHAN</span>
              </h1>

              <p className="font-mono text-pixel-sky text-sm sm:text-base mb-4">
                Mobile &amp; Web Developer &bull; Badminton Enthusiast
              </p>

              {/* KOTAK MESSAGE */}
              <div className="relative bg-pixel-cream text-pixel-night border-4 border-black p-4 sm:p-5 shadow-pixel mb-4">
                <div className="absolute -top-3 -left-3 bg-pixel-grass text-pixel-cream border-4 border-black px-2 py-1 font-pixel text-[8px] sm:text-[9px] flex items-center gap-1">
                  <IconStar size={10} />
                  <span>MESSAGE</span>
                </div>

                <div className="space-y-2.5 text-sm sm:text-base leading-relaxed">
                  <p>
                    <span className="font-pixel text-[10px] sm:text-xs text-pixel-grass-dark mr-1.5">
                      &gt;
                    </span>
                    Perkenalkan, saya{' '}
                    <strong className="text-pixel-grass-dark">
                      Fadli Ramadhan
                    </strong>{' '}
                    — seorang{' '}
                    <strong className="text-pixel-grass-dark">
                      Mobile &amp; Web Developer
                    </strong>{' '}
                    yang suka membangun aplikasi dari nol sampai siap pakai.
                  </p>
                  <p>
                    <span className="font-pixel text-[10px] sm:text-xs text-pixel-grass-dark mr-1.5">
                      &gt;
                    </span>
                    Di sisi{' '}
                    <strong className="text-pixel-grass-dark">Mobile</strong>,
                    saya mengembangkan aplikasi Android menggunakan{' '}
                    <strong className="text-pixel-grass-dark">
                      Java, Kotlin, dan Flutter
                    </strong>
                    . Di sisi{' '}
                    <strong className="text-pixel-grass-dark">Web</strong>, saya
                    membangun aplikasi modern dengan{' '}
                    <strong className="text-pixel-grass-dark">React.js</strong>{' '}
                    dan backend{' '}
                    <strong className="text-pixel-grass-dark">
                      PostgreSQL via Supabase
                    </strong>
                    .
                  </p>
                  <p>
                    <span className="font-pixel text-[10px] sm:text-xs text-pixel-grass-dark mr-1.5">
                      &gt;
                    </span>
                    Selain coding, saya aktif berorganisasi — pernah menjabat{' '}
                    <strong className="text-pixel-grass-dark">
                      Ketua OSIS SMK Medikacom
                    </strong>{' '}
                    dan menekuni{' '}
                    <strong className="text-pixel-grass-dark">
                      bulu tangkis
                    </strong>
                    . Saya percaya kerja tim di lapangan sama pentingnya dengan
                    kolaborasi di dunia developer.
                  </p>
                  <p className="flex items-center gap-2 pt-2 border-t-2 border-black/20 mt-2">
                    <span className="font-pixel text-[10px] sm:text-xs text-pixel-grass-dark">
                      &gt;
                    </span>
                    <span>
                      Mari berkolaborasi dan ciptakan sesuatu yang keren!
                    </span>
                    <span className="animate-blink text-pixel-grass-dark">▮</span>
                  </p>
                </div>
              </div>

              {/* 3 PILLAR */}
              <div>
                <p className="font-pixel text-[9px] sm:text-[10px] text-pixel-accent mb-2">
                  ▶ KEMAMPUAN UTAMA
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-pixel-night/70 backdrop-blur-sm border-2 border-black p-2.5 text-left">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconPlayer size={12} className="text-pixel-accent" />
                      <p className="font-pixel text-[8px] text-pixel-accent">
                        MOBILE DEV
                      </p>
                    </div>
                    <p className="font-mono text-xs text-pixel-cream leading-tight">
                      Java &bull; Kotlin &bull; Flutter
                    </p>
                  </div>

                  <div className="bg-pixel-night/70 backdrop-blur-sm border-2 border-black p-2.5 text-left">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconSoccerBall size={12} className="text-pixel-accent" />
                      <p className="font-pixel text-[8px] text-pixel-accent">
                        WEB DEV
                      </p>
                    </div>
                    <p className="font-mono text-xs text-pixel-cream leading-tight">
                      React.js &bull; Tailwind
                    </p>
                  </div>

                  <div className="bg-pixel-night/70 backdrop-blur-sm border-2 border-black p-2.5 text-left">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconChart size={12} className="text-pixel-accent" />
                      <p className="font-pixel text-[8px] text-pixel-accent">
                        BACKEND
                      </p>
                    </div>
                    <p className="font-mono text-xs text-pixel-cream leading-tight">
                      PostgreSQL &bull; Supabase
                    </p>
                  </div>
                </div>
              </div>

              {/* BADGE */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <div className="inline-flex items-center gap-2 bg-pixel-accent text-pixel-night border-4 border-black px-3 py-1.5 shadow-pixel-sm">
                  <IconCrown size={14} />
                  <span className="font-pixel text-[8px] sm:text-[9px]">
                    EX-KETUA OSIS SMK MEDIKACOM
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-pixel-grass text-pixel-cream border-4 border-black px-3 py-1.5 shadow-pixel-sm">
                  <IconShuttlecock size={14} />
                  <span className="font-pixel text-[8px] sm:text-[9px]">
                    BADMINTON PLAYER
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              BARIS 2: MENU PRESS START + TOMBOL
              ========================================== */}
          <div className="bg-pixel-night/70 backdrop-blur-sm border-4 border-black p-4 sm:p-6">
            <p className="font-pixel text-[9px] sm:text-[10px] text-pixel-accent mb-3 text-center">
              ▶ PRESS START TO PLAY
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <MenuLink to="/" num="1 PLAYER" label="About Me" icon={IconPlayer} />
              <MenuLink to="/projects" num="2 PLAYERS" label="Projects" icon={IconSoccerBall} />
              <MenuLink to="/skills" num="TRAINING" label="Skills" icon={IconChart} />
              <MenuLink to="/certificates" num="HIGH SCORES" label="Certificates" icon={IconTrophy} />
              <MenuLink to="/contact" num="OPTIONS" label="Guest Book" icon={IconShuttlecock} />
            </ul>

            <div className="mt-5 pt-4 border-t-2 border-pixel-cream/20 flex flex-wrap justify-center gap-2">
              <a
                href="/cv/Fadli-Ramadhan-CV.pdf"
                download
                className="font-pixel text-[9px] uppercase tracking-wider px-3 py-2.5 border-4 border-black bg-pixel-accent text-pixel-night shadow-pixel hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <IconDownload size={12} />
                <span>DOWNLOAD CV</span>
              </a>
              <Link
                to="/experience"
                className="font-pixel text-[9px] uppercase tracking-wider px-3 py-2.5 border-4 border-black bg-pixel-grass text-pixel-cream shadow-pixel hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <IconCrown size={12} />
                <span>EXPERIENCE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMASI PEMAIN DI DASAR */}
      <div className="relative h-12 bg-pixel-grass-dark/80 overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-pixel-cream/40" />

        <div className="absolute bottom-0 animate-walkAcross">
          <div className="relative flex items-end gap-0.5">
            <div className="text-pixel-cream">
              <IconPlayer size={26} />
            </div>
            <div className="animate-ballKick text-white">
              <IconShuttlecock size={12} />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-2 animate-ballBounceReverse text-pixel-cream"
          style={{ animationDuration: '9s' }}
        >
          <IconShuttlecock size={14} />
        </div>
      </div>
    </div>
  );
}

/* ============================================
   SUB-COMPONENT: MENU LINK ALA ARCADE
   ============================================ */
function MenuLink({ to, num, label, icon: Icon }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-3 px-3 py-2.5 border-2 border-transparent hover:border-pixel-accent hover:bg-pixel-grass/40 transition-all"
      >
        <span className="font-pixel text-[9px] sm:text-[10px] text-pixel-accent group-hover:text-pixel-cream transition-colors flex-shrink-0 w-24 sm:w-28 text-left">
          {num}
        </span>
        <Icon size={14} className="text-pixel-cream flex-shrink-0" />
        <span className="font-mono text-base sm:text-lg text-pixel-cream group-hover:text-pixel-accent transition-colors truncate">
          {label}
        </span>
        <span className="ml-auto font-pixel text-[10px] text-pixel-accent opacity-0 group-hover:opacity-100 transition-opacity">
          ▶
        </span>
      </Link>
    </li>
  );
}