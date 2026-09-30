import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PixelCard from '../components/PixelCard';
import LoadingPixel from '../components/LoadingPixel';
import {
  IconSoccerBall,
  IconDownload,
  IconStar,
  IconTrophy,
  IconChart,
} from '../components/PixelIcons';

/* ============================================
   CONFIG — 3 BACKGROUND SECTION
   ============================================ */
const BG_TOP = '/images/hero-bg.jpg';
const BG_MIDDLE = '/images/hero-bg2.jpg';
const BG_BOTTOM = '/images/hero-bg.jpg';

/* ============================================
   BG UNTUK TIAP BARIS SECTION (horizontal)
   ============================================ */
const ROW_BGS = [
  '/images/hero-bg2.jpg',
  '/images/hero-bg.jpg',
  '/images/hero-bg2.jpg',
];

/* ============================================
   PALET WARNA CARD — SOLID & KONTRAS
   ============================================ */
const CARD_THEMES = [
  {
    card: 'bg-pixel-sky-dark',
    accent: 'text-pixel-accent',
    text: 'text-pixel-cream',
    badgeBg: 'bg-pixel-accent',
    badgeText: 'text-pixel-night',
    metaBg: 'bg-pixel-night/60',
    divider: 'border-white/20',
  },
  {
    card: 'bg-pixel-grass-dark',
    accent: 'text-pixel-accent',
    text: 'text-pixel-cream',
    badgeBg: 'bg-pixel-accent',
    badgeText: 'text-pixel-night',
    metaBg: 'bg-pixel-night/60',
    divider: 'border-white/20',
  },
  {
    card: 'bg-pixel-cream',
    accent: 'text-pixel-grass-dark',
    text: 'text-pixel-night',
    badgeBg: 'bg-pixel-red',
    badgeText: 'text-pixel-cream',
    metaBg: 'bg-pixel-night/10',
    divider: 'border-black/20',
  },
];

/* ============================================
   BG WRAPPER (untuk section)
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
   KOMPONEN CARD PROJECT
   Klik foto → langsung buka link
   ============================================ */
function ProjectCard({ project, index }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const projectNumber = String(index + 1).padStart(2, '0');
  const [imgError, setImgError] = useState(false);

  const openLink = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative border-4 border-black shadow-pixel overflow-hidden flex flex-col ${theme.card}`}
    >
      {/* Pattern halus */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 4px, transparent 4px 12px)',
        }}
      />

      {/* BADGE NOMOR */}
      <div
        className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 border-4 border-black px-1.5 sm:px-2 py-0.5 sm:py-1 font-pixel text-[8px] sm:text-[10px] ${theme.badgeBg} ${theme.badgeText}`}
      >
        #{projectNumber}
      </div>

      {/* BADGE ICON */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20">
        <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-pixel-night flex items-center justify-center">
          <IconSoccerBall size={14} className="sm:w-4 sm:h-4" />
        </div>
      </div>

      {/* FOTO PREVIEW */}
      <div
        className={`relative w-full bg-white border-b-4 border-black overflow-hidden z-10 group ${
          project.link ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={openLink}
        title={project.link ? 'Klik untuk buka project' : ''}
      >
        {project.image_url && !imgError ? (
          <>
            <img
              src={project.image_url}
              alt={project.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-44 sm:h-52 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ imageRendering: 'pixelated' }}
            />
            {project.link && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 p-2">
                <div className="bg-pixel-accent border-4 border-black px-2 sm:px-3 py-1.5 sm:py-2 font-pixel text-[8px] sm:text-[9px] text-pixel-night flex items-center gap-1.5 sm:gap-2">
                  <IconDownload size={10} className="sm:w-3 sm:h-3" />
                  <span>BUKA PROJECT</span>
                </div>
                <p className="font-mono text-[10px] sm:text-xs text-pixel-cream bg-pixel-night/80 px-1.5 sm:px-2 py-1 border border-black max-w-[90%] truncate">
                  {project.link.replace(/^https?:\/\//, '')}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-44 sm:h-52 md:h-60 flex flex-col items-center justify-center bg-pixel-sky-dark text-pixel-cream gap-2">
            <IconSoccerBall size={36} className="sm:w-12 sm:h-12" />
            <p className="font-pixel text-[8px] sm:text-[9px]">NO PREVIEW</p>
          </div>
        )}
      </div>

      {/* INFO CONTENT */}
      <div className="relative z-10 p-3.5 sm:p-4 md:p-5 flex flex-col flex-1 gap-2.5 sm:gap-3">
        {/* CATEGORY BADGE */}
        {project.category && (
          <div
            className={`inline-flex items-center gap-1 sm:gap-1.5 self-start border-2 border-black px-1.5 sm:px-2 py-0.5 sm:py-1 font-pixel text-[7px] sm:text-[9px] ${theme.badgeBg} ${theme.badgeText}`}
          >
            <IconStar size={9} className="sm:w-[10px] sm:h-[10px]" />
            <span>{project.category.toUpperCase()}</span>
          </div>
        )}

        {/* TITLE */}
        <h3
          className={`font-pixel text-[10px] sm:text-xs leading-relaxed break-words min-h-[2.25rem] sm:min-h-[2.5rem] ${theme.accent} drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)]`}
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className={`font-mono text-sm sm:text-base leading-relaxed ${theme.text} flex-1`}
        >
          {project.description}
        </p>

        {/* TECH STACK */}
        {project.tech_stack?.length > 0 && (
          <div className={`border-2 border-black/40 p-2.5 sm:p-3 ${theme.metaBg}`}>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <IconChart size={12} className={`sm:w-[14px] sm:h-[14px] ${theme.accent}`} />
              <p className={`font-pixel text-[7px] sm:text-[8px] opacity-70 ${theme.text}`}>
                TECH STACK
              </p>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {project.tech_stack.map((t) => (
                <span
                  key={t}
                  className={`font-mono text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 border border-current ${theme.accent}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BUTTON */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`mt-auto font-pixel text-[8px] sm:text-[10px] uppercase tracking-wider px-3 sm:px-4 py-2.5 sm:py-3 border-4 border-black shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${theme.badgeBg} ${theme.badgeText}`}
          >
            <IconDownload size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span>LIHAT PROJECT</span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ============================================
   BG STRIP HORIZONTAL (untuk section 2)
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
   HALAMAN PROJECTS
   ============================================ */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      else setProjects(data || []);
      setLoading(false);
    })();
  }, []);

  const categories = [
    'All',
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];
  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const totalProjects = projects.length;
  const totalCategories = new Set(
    projects.map((p) => p.category).filter(Boolean)
  ).size;
  const totalTechs = new Set(
    projects.flatMap((p) => p.tech_stack || [])
  ).size;

  const totalRows = Math.max(Math.ceil(filtered.length / 3), 1);
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
              <IconSoccerBall size={20} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <h1 className="font-pixel text-xs sm:text-base md:text-2xl text-pixel-accent drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[3px_3px_0_#000]">
                PROJECTS ARENA
              </h1>
              <IconSoccerBall size={20} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <p className="font-mono text-pixel-cream text-sm sm:text-lg md:text-xl mt-2 px-2 drop-shadow-[1px_1px_0_#000]">
              Kumpulan gol kode yang telah dicetak
            </p>
          </header>

          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 max-w-3xl mx-auto">
              <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
                <IconSoccerBall size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                  {totalProjects}
                </p>
                <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                  Total Project
                </p>
              </PixelCard>

              <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
                <IconStar size={20} className="mx-auto mb-1.5 sm:mb-2 sm:w-[22px] sm:h-[22px]" />
                <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                  {totalCategories}
                </p>
                <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                  Kategori
                </p>
              </PixelCard>

              <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
                <IconTrophy size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                  {totalTechs}
                </p>
                <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                  Teknologi
                </p>
              </PixelCard>
            </div>
          )}

          {loading && <LoadingPixel text="LOADING PROJECTS" />}
        </div>
      </SectionWithBg>

      {/* ==========================================
          SECTION 2 — FILTER + GALLERY
          ========================================== */}
      <div className="relative overflow-hidden">
        <HorizontalStripBg items={rowBgItems} />

        <div className="relative max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          {/* FILTER */}
          {!loading && projects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`font-pixel text-[8px] sm:text-[9px] md:text-[10px] px-2.5 sm:px-3 py-1.5 sm:py-2 border-4 border-black transition-all shadow-pixel-sm hover:-translate-y-0.5 ${
                    filter === cat
                      ? 'bg-pixel-accent text-pixel-night shadow-pixel'
                      : 'bg-pixel-grass text-pixel-cream hover:bg-pixel-grass-light'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 ? (
            <PixelCard color="sky" className="text-center">
              <p className="font-pixel text-xs text-pixel-accent">NO DATA</p>
              <p className="font-mono text-base sm:text-lg md:text-xl mt-2">
                Belum ada project di kategori ini.
              </p>
            </PixelCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              {filtered.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
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
              <IconSoccerBall size={24} className="text-white animate-floatBall sm:w-7 sm:h-7 md:w-8 md:h-8" />
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
              MORE PROJECTS COMING!
            </p>
            <p className="font-mono text-pixel-cream text-sm sm:text-base md:text-lg">
              Terus berkarya, cetak gol kode baru, dan bangun portofolio yang
              makin keren!
            </p>
          </PixelCard>
        </div>
      </SectionWithBg>
    </div>
  );
}