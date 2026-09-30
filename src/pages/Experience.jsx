import { useState } from 'react';
import PixelCard from '../components/PixelCard';
import {
  IconCrown,
  IconMedal,
  IconFlag,
  IconCalendar,
  IconCheck,
  IconSpark,
  IconStar,
  IconSoccerBall,
  IconShuttlecock,
  IconTrophy,
  IconPlayer,
} from '../components/PixelIcons';

/* ============================================
   CONFIG — 3 BACKGROUND
   ============================================ */
const BG_TOP = '/images/hero-bg2.jpg';
const BG_MIDDLE = '/images/hero-bg.jpg';
const BG_BOTTOM = '/images/hero-bg2.jpg';

/* ============================================
   DATA EXPERIENCE
   ============================================ */
const EXPERIENCES = [
  {
    id: 1,
    title: 'Ketua OSIS',
    organization: 'SMK MedikaCom',
    period: '2025 — 2026',
    Icon: IconCrown,
    color: 'accent',
    highlight: true,
    description:
      'Memimpin organisasi siswa intra sekolah dengan ratusan anggota aktif. Bertanggung jawab atas perencanaan, koordinasi, dan eksekusi seluruh program kerja tahunan.',
    achievements: [
      'Memimpin 10 divisi dengan total 40+ pengurus',
      'Menyelenggarakan 15+ event sekolah (LDKS, Classmeeting, Pentas Seni)',
      'Meningkatkan partisipasi siswa dalam kegiatan sekolah sebesar 40%',
      'Menjadi jembatan komunikasi antara siswa dan pihak manajemen sekolah',
      'Merancang program "Medikacom Cares" — bakti sosial tahunan',
    ],
  },
  {
    id: 2,
    title: 'Ketua Pelaksana Event Ramadhan',
    organization: 'SMK Medikacom',
    period: '2025',
    Icon: IconMedal,
    color: 'accent',
    description:
      'Menjadi pemimpin dalam mengatur keseluruhan acara pada event Ramadhan Ekologi.',
    achievements: [
      'Mengoordinasikan 8 program kerja divisi sosial & keagamaan',
      'Mengelola administrasi dan dokumentasi organisasi',
    ],
  },
  {
    id: 3,
    title: 'Anggota Divisi 8',
    organization: 'OSIS SMK Medikacom',
    period: '2024 — 2025',
    Icon: IconSoccerBall,
    color: 'sky',
    description:
      'Aktif dalam pengelolaan acara Kesenian & Olahraga dalam Sekolah.',
    achievements: [
      'Panitia turnamen futsal antar kelas (24 tim)',
      'Koordinator lomba Futsal antar kelas',
    ],
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
   KARTU EXPERIENCE (Timeline item)
   ============================================ */
function ExperienceCard({ exp }) {
  const isHighlight = exp.highlight;
  const { Icon } = exp;

  return (
    <div className="relative pl-8 sm:pl-12 md:pl-14">
      {/* Timeline dot */}
      <div className="absolute left-0 top-5 sm:top-6 flex flex-col items-center z-10">
        <div
          className={`w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 border-3 sm:border-4 border-black flex items-center justify-center shadow-pixel-sm ${
            isHighlight
              ? 'bg-pixel-accent text-pixel-night'
              : 'bg-pixel-grass text-pixel-cream'
          }`}
        >
          <Icon size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
      </div>

      {/* Timeline line */}
      <div className="absolute left-3 sm:left-[1.1rem] md:left-[1.4rem] top-14 sm:top-16 bottom-0 w-0.5 sm:w-1 bg-pixel-accent/50" />

      <div className="relative">
        <PixelCard
          color={isHighlight ? 'grass' : exp.color === 'accent' ? 'grass' : 'sky'}
          className={`relative ${
            isHighlight
              ? 'ring-4 ring-pixel-accent ring-offset-2 sm:ring-offset-4 ring-offset-pixel-night'
              : ''
          }`}
        >
          {/* Ribbon highlight */}
          {isHighlight && (
            <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 bg-pixel-accent border-4 border-black px-1.5 sm:px-2 py-0.5 sm:py-1 font-pixel text-[8px] sm:text-[9px] text-pixel-night flex items-center gap-1">
              <IconSpark size={10} />
              <span>MAIN QUEST</span>
            </div>
          )}

          {/* Title + Organization */}
          <div className="mb-2.5 sm:mb-3">
            <h3 className="font-pixel text-[10px] sm:text-xs md:text-base text-pixel-accent leading-relaxed drop-shadow-[2px_2px_0_#000] break-words">
              {exp.title}
            </h3>
            <p className="font-mono text-sm sm:text-base md:text-lg text-pixel-cream mt-1 flex items-start gap-2 flex-wrap">
              <IconFlag size={14} className="flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
              <span className="break-words">{exp.organization}</span>
            </p>
          </div>

          {/* Period badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-pixel-night border-2 border-black px-2 sm:px-3 py-1 mb-3 sm:mb-4">
            <IconCalendar size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-pixel-accent">
              {exp.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-pixel-cream text-sm sm:text-base md:text-lg leading-relaxed mb-3.5 sm:mb-4">
            {exp.description}
          </p>

          {/* Achievements */}
          {exp.achievements?.length > 0 && (
            <div className="border-t-2 border-black/30 pt-3 sm:pt-4">
              <p className="font-pixel text-[9px] sm:text-[10px] text-pixel-accent mb-2.5 sm:mb-3 flex items-center gap-2">
                <IconTrophy size={14} /> ACHIEVEMENTS
              </p>
              <ul className="space-y-1.5 sm:space-y-2">
                {exp.achievements.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-pixel-cream text-xs sm:text-sm md:text-base leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-0.5 sm:mt-1">
                      <IconCheck size={12} className="sm:w-[14px] sm:h-[14px]" />
                    </span>
                    <span className="break-words">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PixelCard>
      </div>
    </div>
  );
}

/* ============================================
   HALAMAN EXPERIENCE — 3 SECTION BG
   ============================================ */
export default function Experience() {
  return (
    <div className="animate-slideUp">
      {/* ==========================================
          SECTION 1 — HIGHLIGHT + STATS
          ========================================== */}
      <SectionWithBg bgImage={BG_TOP} overlay="bg-pixel-night/50">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          {/* HEADER */}
          <header className="text-center">
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3">
              <IconSoccerBall size={20} className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7" />
              <h1 className="font-pixel text-xs sm:text-base md:text-2xl text-pixel-accent drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[3px_3px_0_#000]">
                QUEST LOG
              </h1>
              <IconSoccerBall size={20} className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <p className="font-mono text-pixel-cream text-sm sm:text-lg md:text-xl mt-2 px-2 drop-shadow-[1px_1px_0_#000]">
              Perjalanan pengalaman &amp; pencapaian
            </p>
          </header>

          {/* HIGHLIGHT CARD */}
          <PixelCard color="cream" className="text-center">
            <div className="flex justify-center mb-2.5 sm:mb-3">
              <IconCrown size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
            <p className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-pixel-night/70 mb-2.5 sm:mb-3">
              ★ FLAGSHIP EXPERIENCE ★
            </p>
            <h2 className="font-pixel text-xs sm:text-base md:text-xl text-pixel-night leading-relaxed break-words px-2">
              KETUA OSIS
            </h2>
            <p className="font-mono text-base sm:text-xl md:text-2xl text-pixel-grass-dark mt-1.5 sm:mt-2">
              SMK MEDIKACOM
            </p>
            <p className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-pixel-night/60 mt-1.5 sm:mt-2">
              PERIODE 2025 — 2026
            </p>
          </PixelCard>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
              <IconCrown size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                1
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Tahun Kepemimpinan
              </p>
            </PixelCard>

            <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
              <IconPlayer
                size={22}
                className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7 text-pixel-cream"
              />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                40+
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Anggota Dipimpin
              </p>
            </PixelCard>

            <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
              <IconTrophy size={22} className="mx-auto mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                15+
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Event Terselenggara
              </p>
            </PixelCard>

            <PixelCard color="grass" className="text-center !p-3 sm:!p-4">
              <IconStar size={20} className="mx-auto mb-1.5 sm:mb-2 sm:w-[22px] sm:h-[22px]" />
              <p className="font-pixel text-base sm:text-xl md:text-2xl text-pixel-accent">
                4
              </p>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-pixel-cream leading-tight">
                Pengalaman Total
              </p>
            </PixelCard>
          </div>
        </div>
      </SectionWithBg>

      {/* ==========================================
          SECTION 2 — TIMELINE
          ========================================== */}
      <SectionWithBg bgImage={BG_MIDDLE} overlay="bg-pixel-night/55">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-7 md:space-y-8">
          <h3 className="font-pixel text-[10px] sm:text-xs text-pixel-accent text-center mb-1 sm:mb-2 flex items-center justify-center gap-2 drop-shadow-[1px_1px_0_#000]">
            <IconFlag size={14} className="sm:w-4 sm:h-4" /> TIMELINE PENGALAMAN
          </h3>

          <div className="space-y-5 sm:space-y-7 md:space-y-8">
            {EXPERIENCES.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </SectionWithBg>

      {/* ==========================================
          SECTION 3 — CLOSING
          ========================================== */}
      <SectionWithBg bgImage={BG_BOTTOM} overlay="bg-pixel-night/55">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 md:px-8 py-6 sm:py-10 md:py-12">
          <PixelCard color="grass" className="text-center">
            <div className="flex justify-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
              <IconSoccerBall
                size={24}
                className="text-white animate-floatBall sm:w-7 sm:h-7"
              />
              <IconShuttlecock
                size={24}
                className="animate-floatBall sm:w-7 sm:h-7"
                style={{ animationDelay: '0.3s' }}
              />
              <IconCrown
                size={24}
                className="animate-floatBall sm:w-7 sm:h-7"
                style={{ animationDelay: '0.6s' }}
              />
            </div>
            <p className="font-pixel text-[9px] sm:text-[10px] md:text-xs text-pixel-accent mb-2">
              TO BE CONTINUED...
            </p>
            <p className="font-mono text-pixel-cream text-sm sm:text-base md:text-lg">
              Perjalanan masih panjang. Setiap pengalaman adalah level baru yang
              siap ditaklukkan.
            </p>
          </PixelCard>
        </div>
      </SectionWithBg>
    </div>
  );
}