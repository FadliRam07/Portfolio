import { useState } from 'react';
import ArcadeHero from '../components/ArcadeHero';
import PixelCard from '../components/PixelCard';
import {
  IconPlayer,
  IconSoccerBall,
  IconShuttlecock,
  IconStar,
  IconFlag,
  IconDocument,
  IconEye,
  IconDownload,
  IconPdf,
} from '../components/PixelIcons';

const CV_PDF = '/cv/Fadli-Ramadhan-CV.pdf';
const CV_PREVIEW = '/cv/cv-preview.jpeg';
const HERO_BG = '/images/hero-bg.jpg';

export default function About() {
  const [cvError, setCvError] = useState(false);
  const [bgError, setBgError] = useState(false);

  return (
    <div>
      {/* HERO */}
      <ArcadeHero />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-8 animate-slideUp">

        {/* ============================================
            SECTION CV — DENGAN BACKGROUND TEMA STADION
            ============================================ */}
        <div className="relative border-4 border-black shadow-pixel overflow-hidden">
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
              <div className="w-full h-full bg-gradient-to-br from-pixel-sky-dark via-pixel-night to-pixel-grass-dark" />
            )}
            <div className="absolute inset-0 bg-pixel-night/75" />
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.5) 2px 3px)',
              }}
            />
          </div>

          <div className="relative p-3.5 sm:p-5 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <IconDocument size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px] text-pixel-accent flex-shrink-0" />
              <h2 className="font-pixel text-[10px] sm:text-[11px] md:text-sm text-pixel-accent">
                CURRICULUM VITAE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-start">
              <div className="flex flex-col order-2 md:order-1">
                <p className="font-mono text-pixel-cream text-base sm:text-lg leading-relaxed mb-3.5 sm:mb-4">
                  Unduh CV lengkap saya dalam format PDF — berisi ringkasan
                  pengalaman, keahlian, pendidikan, dan portofolio proyek yang
                  pernah saya kerjakan.
                </p>

                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                  <li className="flex items-start gap-2 font-mono text-pixel-cream text-sm sm:text-base">
                    <IconStar size={12} className="flex-shrink-0 mt-0.5" />
                    <span>Pengalaman organisasi &amp; kepemimpinan</span>
                  </li>
                  <li className="flex items-start gap-2 font-mono text-pixel-cream text-sm sm:text-base">
                    <IconStar size={12} className="flex-shrink-0 mt-0.5" />
                    <span>Skills &amp; teknologi yang dikuasai</span>
                  </li>
                  <li className="flex items-start gap-2 font-mono text-pixel-cream text-sm sm:text-base">
                    <IconStar size={12} className="flex-shrink-0 mt-0.5" />
                    <span>Pendidikan &amp; pencapaian</span>
                  </li>
                  <li className="flex items-start gap-2 font-mono text-pixel-cream text-sm sm:text-base">
                    <IconStar size={12} className="flex-shrink-0 mt-0.5" />
                    <span>Portofolio proyek terlampir</span>
                  </li>
                </ul>

                <div className="bg-pixel-night/60 border-2 border-black p-2.5 sm:p-3 mb-4 sm:mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <IconPdf size={14} className="sm:w-4 sm:h-4" />
                    <p className="font-pixel text-[9px] sm:text-[10px] text-pixel-accent">
                      FILE INFO
                    </p>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-pixel-cream/80">
                    Format: PDF &bull; Ukuran: ~500 KB &bull; Bahasa: Indonesia
                  </p>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-2">
                  <a
                    href={CV_PDF}
                    download="Fadli-Ramadhan-CV.pdf"
                    className="flex-1 font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-3 sm:px-4 py-3 border-4 border-black bg-pixel-accent text-pixel-night shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    <IconDownload size={14} />
                    <span>DOWNLOAD CV</span>
                  </a>
                  <a
                    href={CV_PDF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-3 sm:px-4 py-3 border-4 border-black bg-pixel-grass text-pixel-cream shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    <IconEye size={14} />
                    <span>LIHAT CV</span>
                  </a>
                </div>
              </div>

              <div className="relative order-1 md:order-2">
                <div
                  className="border-4 border-black bg-white shadow-pixel overflow-hidden cursor-pointer group"
                  onClick={() => window.open(CV_PDF, '_blank')}
                >
                  {!cvError ? (
                    <img
                      src={CV_PREVIEW}
                      alt="Preview CV Fadli Ramadhan"
                      onError={() => setCvError(true)}
                      className="w-full h-56 sm:h-72 md:h-96 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-56 sm:h-72 md:h-96 flex flex-col items-center justify-center bg-pixel-night text-pixel-cream gap-3 p-4 text-center">
                      <IconPdf size={48} className="sm:w-14 sm:h-14" />
                      <p className="font-pixel text-[9px] leading-relaxed px-2">
                        TARUH PREVIEW DI
                        <br />
                        /public/cv/cv-preview.jpeg
                      </p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                    <div className="bg-pixel-accent border-4 border-black px-3 py-2 font-pixel text-[9px] text-pixel-night">
                      KLIK UNTUK BUKA
                    </div>
                  </div>
                </div>

                <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 bg-pixel-red border-4 border-black px-1.5 sm:px-2 py-0.5 sm:py-1 font-pixel text-[8px] text-pixel-cream flex items-center gap-1">
                  <IconPdf size={10} />
                  <span>PDF</span>
                </div>

                <div className="absolute -bottom-2.5 -left-2.5 sm:-bottom-3 sm:-left-3 bg-pixel-accent border-4 border-black px-1.5 sm:px-2 py-0.5 sm:py-1 font-pixel text-[8px] text-pixel-night flex items-center gap-1 animate-floatBall">
                  <IconEye size={10} />
                  <span>PREVIEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================
            BIO & HOBI — SOLID COLOR CARD
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">

          {/* LATAR BELAKANG — biru tua solid */}
          <div className="relative bg-pixel-sky-dark border-4 border-black shadow-pixel overflow-hidden">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-pixel-accent/15 blur-2xl animate-pulse-slow pointer-events-none" />

            <div className="relative p-3.5 sm:p-5 md:p-6">
              <h2 className="font-pixel text-[10px] sm:text-xs md:text-sm text-pixel-accent mb-3 sm:mb-4 flex items-center gap-2">
                <IconStar size={14} className="flex-shrink-0" /> LATAR BELAKANG
              </h2>
              <p className="text-pixel-cream text-base sm:text-lg leading-relaxed md:text-xl">
                Halo! Saya{' '}
                <strong className="text-pixel-accent">Fadli Ramadhan</strong>,
                seorang developer yang membangun aplikasi{' '}
                <strong className="text-pixel-accent">mobile</strong> (Java,
                Kotlin, Flutter) dan{' '}
                <strong className="text-pixel-accent">web</strong> (React.js)
                dengan backend PostgreSQL via Supabase. Pernah menjabat sebagai{' '}
                <strong className="text-pixel-accent">
                  Ketua OSIS SMK Medikacom
                </strong>{' '}
                periode 2025—2026, saya belajar banyak tentang kepemimpinan,
                manajemen tim, dan komunikasi — skill yang saya bawa ke dunia
                pengembangan software.
              </p>
            </div>
          </div>

          {/* HOBI & MINAT — biru terang solid */}
          <div className="relative bg-pixel-sky border-4 border-black shadow-pixel overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(0,0,0,0.12) 0 4px, transparent 4px 12px)',
              }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-white/25 blur-2xl animate-pulse-slow pointer-events-none"
              style={{ animationDelay: '1.5s' }}
            />

            <div className="relative p-3.5 sm:p-5 md:p-6">
              <h2 className="font-pixel text-[10px] sm:text-xs md:text-sm text-pixel-night mb-3 sm:mb-4 flex items-center gap-2">
                <IconStar size={14} className="flex-shrink-0" /> HOBI &amp; MINAT
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-pixel-night text-base sm:text-lg md:text-xl font-mono">
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <IconShuttlecock size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                  <span>Bermain badminton setiap akhir pekan</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <IconPlayer size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                  <span>Mobile app development (Android &amp; Flutter)</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <IconSoccerBall size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                  <span>Web development &amp; UI modern</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <IconStar size={14} className="flex-shrink-0" />
                  <span>Retro gaming &amp; pixel art</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <IconStar size={14} className="flex-shrink-0" />
                  <span>Belajar teknologi baru</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================
            JOURNEY — DENGAN BACKGROUND STADION
            ============================================ */}
        <div className="relative border-4 border-black shadow-pixel overflow-hidden">
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
              <div className="w-full h-full bg-pixel-cream" />
            )}
            <div className="absolute inset-0 bg-pixel-cream/85" />
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.5) 2px 3px)',
              }}
            />
          </div>

          <div className="relative p-3.5 sm:p-5 md:p-8">
            <h2 className="font-pixel text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 flex items-center gap-2 text-pixel-night">
              <IconFlag size={14} className="sm:w-4 sm:h-4 flex-shrink-0" /> JOURNEY
            </h2>
            <div className="space-y-2.5 sm:space-y-3 font-mono text-sm sm:text-base md:text-lg text-pixel-night">
              <p className="flex flex-row items-start sm:items-center gap-2 sm:gap-0">
                <span className="font-pixel text-[9px] sm:text-[10px] bg-pixel-grass text-pixel-cream px-1.5 sm:px-2 py-1 sm:mr-2 self-start border-2 border-black flex-shrink-0">
                  2022
                </span>
                <span>Mulai belajar web &amp; mobile development</span>
              </p>
              <p className="flex flex-row items-start sm:items-center gap-2 sm:gap-0">
                <span className="font-pixel text-[9px] sm:text-[10px] bg-pixel-grass text-pixel-cream px-1.5 sm:px-2 py-1 sm:mr-2 self-start border-2 border-black flex-shrink-0">
                  2024
                </span>
                <span>Anggota Divisi Kesenian &amp; Olahraga OSIS</span>
              </p>
              <p className="flex flex-row items-start sm:items-center gap-2 sm:gap-0">
                <span className="font-pixel text-[9px] sm:text-[10px] bg-pixel-accent text-pixel-night px-1.5 sm:px-2 py-1 sm:mr-2 self-start border-2 border-black flex-shrink-0">
                  2025
                </span>
                <span>
                  <strong>Ketua OSIS SMK Medikacom</strong> (2025—2026)
                </span>
              </p>
              <p className="flex flex-row items-start sm:items-center gap-2 sm:gap-0">
                <span className="font-pixel text-[9px] sm:text-[10px] bg-pixel-grass text-pixel-cream px-1.5 sm:px-2 py-1 sm:mr-2 self-start border-2 border-black flex-shrink-0">
                  2026
                </span>
                <span>Fokus pada React.js, Flutter &amp; Supabase</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}