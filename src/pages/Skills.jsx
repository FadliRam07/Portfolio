import { useEffect, useRef, useState } from 'react';
import PixelCard from '../components/PixelCard';
import {
  IconSoccerBall,
  IconShuttlecock,
  IconChart,
  IconStar,
  IconTrophy,
  IconPlayer,
  IconCrown,
} from '../components/PixelIcons';

/* ============================================
   CONFIG — 3 BACKGROUND SECTION
   ============================================ */
const BG_TOP = '/images/hero-bg.jpg';
const BG_MIDDLE = '/images/hero-bg2.jpg';
const BG_BOTTOM = '/images/hero-bg.jpg';

/* ============================================
   DATA SKILL
   ============================================ */
const TECH_SKILLS = [
  { name: 'Java (Android)', level: 88, category: 'Mobile' },
  { name: 'Kotlin', level: 85, category: 'Mobile' },
  { name: 'Flutter & Dart', level: 80, category: 'Mobile' },
  { name: 'React.js', level: 90, category: 'Web' },
  { name: 'Tailwind CSS', level: 92, category: 'Web' },
  { name: 'JavaScript / TypeScript', level: 87, category: 'Web' },
  { name: 'HTML & CSS', level: 90, category: 'Web' },
  { name: 'Supabase', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 82, category: 'Backend' },
  { name: 'REST API', level: 80, category: 'Backend' },
  { name: 'Git & GitHub', level: 85, category: 'Tools' },
  { name: 'VS Code & Android Studio', level: 90, category: 'Tools' },
];

const SPECIAL_SKILLS = [
  {
    name: 'Leadership',
    value: 95,
    Icon: IconCrown,
    desc: 'Memimpin OSIS SMK Medikacom periode 2025-2026',
  },
  {
    name: 'Teamwork',
    value: 92,
    Icon: IconSoccerBall,
    desc: 'Kolaborasi tim seperti passing di lapangan',
  },
  {
    name: 'Problem Solving',
    value: 90,
    Icon: IconChart,
    desc: 'Menemukan solusi seperti strategi di bulu tangkis',
  },
  {
    name: 'Communication',
    value: 88,
    Icon: IconStar,
    desc: 'Koordinasi antar divisi & stakeholder',
  },
  {
    name: 'Time Management',
    value: 85,
    Icon: IconShuttlecock,
    desc: 'Mengatur deadline & prioritas proyek',
  },
  {
    name: 'Adaptability',
    value: 87,
    Icon: IconPlayer,
    desc: 'Cepat belajar teknologi & tools baru',
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
   KOMPONEN STAT BAR
   ============================================ */
function StatBar({ value, animated, colorFrom, colorTo }) {
  return (
    <div className="h-3.5 sm:h-4 md:h-5 bg-pixel-night border-[2px] sm:border-[3px] border-black shadow-[inset_2px_2px_0_0_rgba(255,255,255,0.15)] relative overflow-hidden">
      <div
        className="h-full transition-all duration-1000 ease-out"
        style={{
          width: animated ? `${value}%` : '0%',
          backgroundImage: `repeating-linear-gradient(90deg, ${colorFrom} 0 8px, ${colorTo} 8px 16px)`,
          boxShadow: 'inset 0 -4px 0 0 rgba(0,0,0,0.25)',
        }}
      />
    </div>
  );
}

/* ============================================
   HALAMAN SKILLS
   ============================================ */
export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setAnimated(true),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const categories = ['Mobile', 'Web', 'Backend', 'Tools'];
  const skillsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = TECH_SKILLS.filter((s) => s.category === cat);
    return acc;
  }, {});

  const avgTech = Math.round(
    TECH_SKILLS.reduce((sum, s) => sum + s.level, 0) / TECH_SKILLS.length
  );

  return (
    <div className="animate-slideUp" ref={ref}>
      {/* ==========================================
          SECTION 1 — HEADER + OVERALL STATS
          ========================================== */}
      <SectionWithBg bgImage={BG_TOP} overlay="bg-pixel-night/50">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          {/* HEADER */}
          <header className="text-center">
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3">
              <IconChart size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
              <h1 className="font-pixel text-xs sm:text-base md:text-2xl text-pixel-accent drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[3px_3px_0_#000]">
                PLAYER STATS
              </h1>
              <IconChart size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <p className="font-mono text-pixel-cream text-sm sm:text-lg md:text-xl mt-2 px-2 drop-shadow-[1px_1px_0_#000]">
              Statistik keahlian teknis &amp; karakter
            </p>
          </header>

          {/* OVERALL STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
            <PixelCard color="grass" className="text-center !p-3 sm:!p-4 md:!p-5">
              <IconChart size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                {avgTech}%
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Rata-rata Teknis
              </p>
            </PixelCard>

            <PixelCard color="grass" className="text-center !p-3 sm:!p-4 md:!p-5">
              <IconPlayer size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7 text-pixel-cream" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                {TECH_SKILLS.length}
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Tech Dikuasai
              </p>
            </PixelCard>

            <PixelCard color="grass" className="text-center !p-3 sm:!p-4 md:!p-5">
              <IconStar size={20} className="mx-auto mb-1.5 sm:mb-2 sm:w-[22px] sm:h-[22px]" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                {SPECIAL_SKILLS.length}
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Soft Skills
              </p>
            </PixelCard>

            <PixelCard color="grass" className="text-center !p-3 sm:!p-4 md:!p-5">
              <IconTrophy size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                PRO
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Rank Saat Ini
              </p>
            </PixelCard>
          </div>
        </div>
      </SectionWithBg>

      {/* ==========================================
          SECTION 2 — TECHNICAL SKILLS
          ========================================== */}
      <SectionWithBg bgImage={BG_MIDDLE} overlay="bg-pixel-night/55">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          <h2 className="font-pixel text-[9px] sm:text-xs text-pixel-accent text-center flex items-center justify-center gap-2 drop-shadow-[2px_2px_0_#000]">
            <IconSoccerBall size={14} className="sm:w-4 sm:h-4" /> TECHNICAL SKILLS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {categories.map((cat, idx) => {
              const skills = skillsByCategory[cat];
              if (!skills.length) return null;

              const themes = [
                {
                  card: 'bg-pixel-sky-dark',
                  accent: 'text-pixel-accent',
                  barFrom: '#7ec8e3',
                  barTo: '#3d5a80',
                  Icon: IconPlayer,
                },
                {
                  card: 'bg-pixel-grass',
                  accent: 'text-pixel-accent',
                  barFrom: '#66bb6a',
                  barTo: '#2e7d32',
                  Icon: IconSoccerBall,
                },
                {
                  card: 'bg-pixel-cream',
                  accent: 'text-pixel-grass-dark',
                  barFrom: '#3d5a80',
                  barTo: '#1a1a2e',
                  Icon: IconChart,
                },
                {
                  card: 'bg-pixel-grass-dark',
                  accent: 'text-pixel-accent',
                  barFrom: '#ffcb47',
                  barTo: '#c9a227',
                  Icon: IconStar,
                },
              ];
              const theme = themes[idx % themes.length];
              const CatIcon = theme.Icon;
              const isDark = theme.card !== 'bg-pixel-cream';
              const textColor = isDark ? 'text-pixel-cream' : 'text-pixel-night';

              return (
                <div
                  key={cat}
                  className={`relative border-4 border-black shadow-pixel overflow-hidden ${theme.card}`}
                >
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 4px, transparent 4px 12px)',
                    }}
                  />

                  <div className="relative p-3.5 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                    {/* Header kategori */}
                    <div className="flex items-center gap-2 pb-2.5 sm:pb-3 border-b-2 border-black/20">
                      <CatIcon size={16} className={`sm:w-[18px] sm:h-[18px] ${theme.accent}`} />
                      <p className={`font-pixel text-[10px] sm:text-[11px] md:text-xs ${theme.accent}`}>
                        {cat.toUpperCase()}
                      </p>
                      <span
                        className={`ml-auto font-pixel text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 border-2 border-black ${theme.accent} bg-black/20`}
                      >
                        {skills.length} SKILL
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3 sm:space-y-4">
                      {skills.map((s) => (
                        <div key={s.name}>
                          <div
                            className={`flex justify-between mb-1 sm:mb-1.5 font-mono text-xs sm:text-sm md:text-base ${textColor}`}
                          >
                            <span className="truncate pr-2">{s.name}</span>
                            <span
                              className={`font-pixel text-[8px] sm:text-[9px] md:text-[10px] flex-shrink-0 ${theme.accent}`}
                            >
                              {s.level}/100
                            </span>
                          </div>
                          <StatBar
                            value={s.level}
                            animated={animated}
                            colorFrom={theme.barFrom}
                            colorTo={theme.barTo}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWithBg>

      {/* ==========================================
          SECTION 3 — SPECIAL ABILITIES + RANK
          ========================================== */}
      <SectionWithBg bgImage={BG_BOTTOM} overlay="bg-pixel-night/55">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          <h2 className="font-pixel text-[9px] sm:text-xs text-pixel-accent text-center flex items-center justify-center gap-2 drop-shadow-[2px_2px_0_#000]">
            <IconStar size={14} className="sm:w-4 sm:h-4" /> SPECIAL ABILITIES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
            {SPECIAL_SKILLS.map((s) => (
              <div
                key={s.name}
                className="relative bg-pixel-sky-dark border-4 border-black shadow-pixel overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 4px, transparent 4px 12px)',
                  }}
                />

                <div className="relative p-3.5 sm:p-4 md:p-5">
                  <div className="flex justify-between items-center mb-2.5 sm:mb-3 gap-2">
                    <span className="font-pixel text-[9px] sm:text-[10px] md:text-xs text-pixel-cream flex items-center gap-1.5 sm:gap-2 truncate">
                      <s.Icon size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{s.name}</span>
                    </span>
                    <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-pixel-accent flex-shrink-0 border-2 border-black bg-black/30 px-1.5 py-0.5">
                      LV.{Math.floor(s.value / 10)}
                    </span>
                  </div>

                  <StatBar
                    value={s.value}
                    animated={animated}
                    colorFrom="#ffcb47"
                    colorTo="#c9a227"
                  />

                  <p className="font-mono text-pixel-cream/80 text-[11px] sm:text-xs md:text-sm mt-2.5 sm:mt-3 italic leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CURRENT RANK */}
          <PixelCard color="cream" className="text-center max-w-2xl mx-auto">
            <p className="font-pixel text-[9px] sm:text-xs text-pixel-night/70 mb-2.5 sm:mb-3">
              ★ CURRENT RANK ★
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <IconTrophy size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />
              <div className="text-center sm:text-left">
                <p className="font-pixel text-xs sm:text-base md:text-lg text-pixel-night">
                  MOBILE &amp; WEB DEV
                </p>
                <p className="font-mono text-sm sm:text-base md:text-lg text-pixel-grass-dark mt-1">
                  Level 42 &bull; EXP: 84,200 / 100,000
                </p>
              </div>
              <IconShuttlecock size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
          </PixelCard>
        </div>
      </SectionWithBg>
    </div>
  );
}