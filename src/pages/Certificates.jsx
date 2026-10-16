import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PixelCard from '../components/PixelCard';
import LoadingPixel from '../components/LoadingPixel';
import { IconTrophy, IconDownload, IconStar } from '../components/PixelIcons';

/* ============================================
   CONFIG — 3 BACKGROUND SECTION
   ============================================ */
const BG_TOP = '/images/hero-bg2.jpg';
const BG_MIDDLE = '/images/hero-bg.jpg';
const BG_BOTTOM = '/images/hero-bg2.jpg';

const ROW_BGS = [
  '/images/hero-bg2.jpg',
  '/images/hero-bg.jpg',
  '/images/hero-bg2.jpg',
];

/* ============================================
   PALET WARNA CARD
   ============================================ */
const CARD_THEMES = [
  {
    card: 'bg-pixel-sky-dark',
    accent: 'text-pixel-accent',
    text: 'text-pixel-cream',
    subText: 'text-pixel-cream/70',
    badgeBg: 'bg-pixel-accent',
    badgeText: 'text-pixel-night',
    btnPrimary: 'bg-pixel-accent text-pixel-night',
    btnSecondary: 'bg-pixel-night text-pixel-cream',
    metaBg: 'bg-pixel-night/60',
    divider: 'border-white/20',
  },
  {
    card: 'bg-pixel-grass-dark',
    accent: 'text-pixel-accent',
    text: 'text-pixel-cream',
    subText: 'text-pixel-cream/70',
    badgeBg: 'bg-pixel-accent',
    badgeText: 'text-pixel-night',
    btnPrimary: 'bg-pixel-accent text-pixel-night',
    btnSecondary: 'bg-pixel-grass text-pixel-cream',
    metaBg: 'bg-pixel-night/60',
    divider: 'border-white/20',
  },
  {
    card: 'bg-pixel-cream',
    accent: 'text-pixel-grass-dark',
    text: 'text-pixel-night',
    subText: 'text-pixel-night/70',
    badgeBg: 'bg-pixel-red',
    badgeText: 'text-pixel-cream',
    btnPrimary: 'bg-pixel-grass-dark text-pixel-cream',
    btnSecondary: 'bg-pixel-night text-pixel-cream',
    metaBg: 'bg-pixel-night/10',
    divider: 'border-black/20',
  },
];

/* ============================================
   BG WRAPPER
   ============================================ */
function SectionWithBg({ bgImage, overlay = 'bg-pixel-night/50', children, className = '' }) {
  const [bgError, setBgError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        {!bgError ? (
          <img
            src={bgImage}
            alt=""
            onError={() => setBgError(true)}
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-pixel-sky-dark via-pixel-night to-pixel-grass-dark" />
        )}
        <div className={`absolute inset-0 ${overlay}`} />
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.4) 2px 3px)',
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ============================================
   KOMPONEN CARD SERTIFIKAT
   Foto & tombol LIHAT → buka di tab baru
   ============================================ */
function CertificateCard({ cert, index }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const certNumber = String(index + 1).padStart(2, '0');

  // Buka gambar di tab baru
  const openInNewTab = () => {
    if (cert.image_url) {
      window.open(cert.image_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative border-4 border-black shadow-pixel overflow-hidden flex flex-col ${theme.card}`}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 4px, transparent 4px 12px)',
        }}
      />

      {/* BADGE NOMOR */}
      <div
        className={`absolute top-3 left-3 z-20 border-4 border-black px-2 py-1 font-pixel text-[9px] sm:text-[10px] ${theme.badgeBg} ${theme.badgeText}`}
      >
        #{certNumber}
      </div>

      {/* BADGE TROPHY */}
      <div className="absolute top-3 right-3 z-20">
        <div className="w-8 h-8 border-2 border-black bg-pixel-night flex items-center justify-center">
          <IconTrophy size={16} />
        </div>
      </div>

      {/* FOTO SERTIFIKAT — klik buka tab baru */}
      <div
        className="relative w-full bg-white border-b-4 border-black cursor-pointer group overflow-hidden z-10"
        onClick={openInNewTab}
      >
        {cert.image_url ? (
          <>
            <img
              src={cert.image_url}
              alt={cert.title}
              loading="lazy"
              className="w-full h-52 sm:h-60 object-contain bg-white transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-pixel-accent border-4 border-black px-3 py-2 font-pixel text-[9px] text-pixel-night flex items-center gap-2">
                <IconDownload size={12} />
                <span>BUKA DI TAB BARU</span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-52 sm:h-60 flex flex-col items-center justify-center bg-pixel-sky-dark text-pixel-cream gap-2">
            <IconTrophy size={48} />
            <p className="font-pixel text-[9px]">NO IMAGE</p>
          </div>
        )}
      </div>

      {/* INFO CONTENT */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <h3
          className={`font-pixel text-[10px] sm:text-xs leading-relaxed break-words min-h-[2.5rem] ${theme.accent} drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)]`}
        >
          {cert.title}
        </h3>

        {/* META BOX */}
        <div className={`border-2 border-black/40 p-3 space-y-2 ${theme.metaBg}`}>
          <div className="flex items-start gap-2">
            <IconTrophy size={14} className={`flex-shrink-0 mt-0.5 ${theme.accent}`} />
            <div className="flex-1 min-w-0">
              <p className={`font-pixel text-[8px] opacity-70 ${theme.text}`}>
                PENERBIT
              </p>
              <p
                className={`font-mono text-sm sm:text-base leading-tight break-words ${theme.text}`}
              >
                {cert.issuer || '-'}
              </p>
            </div>
          </div>

          <div className={`border-t ${theme.divider}`} />

          <div className="flex items-start gap-2">
            <IconStar size={14} className={`flex-shrink-0 mt-0.5 ${theme.accent}`} />
            <div className="flex-1 min-w-0">
              <p className={`font-pixel text-[8px] opacity-70 ${theme.text}`}>
                TANGGAL
              </p>
              <p className={`font-mono text-sm sm:text-base ${theme.text}`}>
                {cert.date
                  ? new Date(cert.date).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {cert.image_url && (
            <button
              onClick={openInNewTab}
              className={`flex-1 min-w-[90px] font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-3 py-3 border-4 border-black shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 ${theme.btnPrimary}`}
            >
              <IconTrophy size={12} />
              <span>LIHAT</span>
            </button>
          )}
          {cert.credential_url && (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 min-w-[90px] font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-3 py-3 border-4 border-black shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 ${theme.btnSecondary}`}
            >
              <IconDownload size={12} />
              <span>VERIFY</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   BG STRIP HORIZONTAL
   ============================================ */
function HorizontalStripBg({ items }) {
  return (
    <div className="absolute inset-0 flex flex-col pointer-events-none">
      {items.map((item, i) => (
        <div key={i} className="relative flex-1 overflow-hidden">
          <StripBgItem bgImage={item.bg} overlay={item.overlay} />
        </div>
      ))}
    </div>
  );
}

function StripBgItem({ bgImage, overlay = 'bg-pixel-night/65' }) {
  const [err, setErr] = useState(false);

  return (
    <>
      {!err ? (
        <img
          src={bgImage}
          alt=""
          onError={() => setErr(true)}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-pixel-sky-dark via-pixel-night to-pixel-grass-dark" />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.4) 2px 3px)',
        }}
      />
    </>
  );
}

/* ============================================
   HALAMAN CERTIFICATES
   ============================================ */
export default function Certificates() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });
      if (error) console.error(error);
      else setItems(data || []);
      setLoading(false);
    })();
  }, []);

  const totalCerts = items.length;
  const totalIssuers = new Set(items.map((c) => c.issuer).filter(Boolean)).size;
  const thisYear = new Date().getFullYear();
  const thisYearCount = items.filter(
    (c) => c.date && new Date(c.date).getFullYear() === thisYear
  ).length;

  const totalRows = Math.max(Math.ceil(items.length / 3), 1);
  const rowBgItems = Array.from({ length: totalRows }, (_, i) => ({
    bg: ROW_BGS[i % ROW_BGS.length],
    overlay: 'bg-pixel-night/65',
  }));

  return (
    <div className="animate-slideUp">
      {/* ==========================================
          SECTION 1 — HEADER + STATS
          ========================================== */}
      <SectionWithBg bgImage={BG_TOP} overlay="bg-pixel-night/50">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          <header className="text-center">
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3">
              <IconTrophy size={20} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <h1 className="font-pixel text-xs sm:text-base md:text-2xl text-pixel-accent drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[3px_3px_0_#000]">
                TROPHY ROOM
              </h1>
              <IconTrophy size={20} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <p className="font-mono text-pixel-cream text-sm sm:text-lg md:text-xl mt-2 px-2 drop-shadow-[1px_1px_0_#000]">
              Achievement unlocked sepanjang karier
            </p>
          </header>

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 max-w-3xl mx-auto">
              <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
                <IconTrophy size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                  {totalCerts}
                </p>
                <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                  Total Sertifikat
                </p>
              </PixelCard>

              <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
                <IconStar size={20} className="mx-auto mb-1.5 sm:mb-2 sm:w-[22px] sm:h-[22px]" />
                <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                  {totalIssuers}
                </p>
                <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                  Penerbit
                </p>
              </PixelCard>

              <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
                <IconStar size={20} className="mx-auto mb-1.5 sm:mb-2 sm:w-[22px] sm:h-[22px]" />
                <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                  {thisYearCount}
                </p>
                <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                  Tahun {thisYear}
                </p>
              </PixelCard>
            </div>
          )}

          {loading && <LoadingPixel text="OPENING TREASURE CHEST" />}
        </div>
      </SectionWithBg>

      {/* ==========================================
          SECTION 2 — GALLERY
          ========================================== */}
      <div className="relative overflow-hidden">
        <HorizontalStripBg items={rowBgItems} />

        <div className="relative max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          {!loading && items.length > 0 && (
            <h2 className="font-pixel text-[9px] sm:text-xs text-pixel-accent text-center flex items-center justify-center gap-2 drop-shadow-[2px_2px_0_#000]">
              <IconStar size={12} className="sm:w-[14px] sm:h-[14px]" /> GALERI PENCAPAIAN
            </h2>
          )}

          {!loading && items.length === 0 ? (
            <PixelCard color="sky" className="text-center">
              <p className="font-pixel text-xs text-pixel-accent">EMPTY</p>
              <p className="font-mono text-base sm:text-lg md:text-xl mt-2">
                Belum ada trophy yang dipajang.
              </p>
            </PixelCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              {items.map((cert, idx) => (
                <CertificateCard key={cert.id} cert={cert} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          SECTION 3 — CLOSING
          ========================================== */}
      <SectionWithBg bgImage={BG_BOTTOM} overlay="bg-pixel-night/55">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12">
          <PixelCard color="grass" className="text-center">
            <div className="flex justify-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
              <IconTrophy size={24} className="animate-floatBall sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <IconStar
                size={22}
                className="animate-floatBall sm:w-6 sm:h-6 md:w-7 md:h-7"
                style={{ animationDelay: '0.3s' }}
              />
              <IconTrophy
                size={24}
                className="animate-floatBall sm:w-7 sm:h-7 md:w-8 md:h-8"
                style={{ animationDelay: '0.6s' }}
              />
            </div>
            <p className="font-pixel text-[9px] sm:text-[10px] md:text-xs text-pixel-accent mb-2">
              KEEP COLLECTING!
            </p>
            <p className="font-mono text-pixel-cream text-sm sm:text-base md:text-lg">
              Setiap sertifikat adalah bukti perjalanan. Terus belajar dan
              tambah pencapaian baru!
            </p>
          </PixelCard>
        </div>
      </SectionWithBg>
    </div>
  );
}