import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconSoccerBall,
  IconShuttlecock,
  IconTrophy,
  IconChart,
  IconPlayer,
  IconCrown,
} from './PixelIcons';

const menu = [
  { to: '/', label: 'About', Icon: IconPlayer },
  { to: '/experience', label: 'Experience', Icon: IconCrown },
  { to: '/projects', label: 'Projects', Icon: IconSoccerBall },
  { to: '/certificates', label: 'Trophies', Icon: IconTrophy },
  { to: '/skills', label: 'Stats', Icon: IconChart },
  { to: '/contact', label: 'Guest Book', Icon: IconShuttlecock },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-40 w-full px-2 sm:px-3 md:px-6 pt-2 sm:pt-3 pb-1 sm:pb-2 pointer-events-none">
        <nav
          className={`pointer-events-auto max-w-6xl mx-auto border-2 sm:border-4 border-black transition-all duration-300 ${
            scrolled
              ? 'bg-pixel-night/95 backdrop-blur-md shadow-pixel-lg'
              : 'bg-pixel-night/90 backdrop-blur-sm shadow-pixel'
          }`}
        >
          <div className="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
            {/* BRAND */}
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 group min-w-0"
            >
              <span className="animate-floatBall text-white group-hover:text-pixel-accent transition-colors flex-shrink-0">
                <IconSoccerBall size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </span>
              <span className="font-pixel text-[10px] sm:text-xs md:text-sm text-pixel-accent drop-shadow-[2px_2px_0_#000] whitespace-nowrap">
                ALFA.DEV
              </span>
              <span
                className="animate-floatBall text-pixel-cream group-hover:text-pixel-accent transition-colors hidden sm:inline-block flex-shrink-0"
                style={{ animationDelay: '0.4s' }}
              >
                <IconShuttlecock size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </span>
            </NavLink>

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-wrap">
              {menu.map(({ to, label, Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `font-pixel text-[9px] xl:text-[10px] px-2 xl:px-2.5 py-1.5 xl:py-2 border-2 border-black inline-flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-pixel-accent text-pixel-night shadow-pixel-sm -translate-y-0.5'
                          : 'bg-pixel-grass text-pixel-cream hover:bg-pixel-grass-light hover:-translate-y-0.5'
                      }`
                    }
                  >
                    <Icon size={12} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* HAMBURGER (muncul < lg) */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 border-2 border-black bg-pixel-grass text-pixel-cream flex items-center justify-center shadow-pixel-sm active:translate-y-0.5 active:shadow-none transition-all flex-shrink-0"
            >
              <div className="flex flex-col gap-1">
                <span
                  className={`block w-4 h-0.5 bg-pixel-cream transition-transform ${
                    open ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-pixel-cream transition-opacity ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-pixel-cream transition-transform ${
                    open ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY (muncul < lg) */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden animate-slideUp"
            onClick={() => setOpen(false)}
          />

          {/* Panel menu */}
          <div className="fixed top-0 left-0 right-0 z-40 pt-16 sm:pt-20 px-2 sm:px-3 lg:hidden pointer-events-none">
            <div className="pointer-events-auto max-w-6xl mx-auto border-4 border-pixel-accent bg-pixel-night shadow-pixel-lg overflow-hidden">
              {/* Header panel */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b-4 border-pixel-accent bg-pixel-grass-dark">
                <p className="font-pixel text-[10px] sm:text-xs text-pixel-accent">
                  ▶ MENU
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-black bg-pixel-red text-pixel-cream font-pixel text-[10px] sm:text-xs hover:-translate-y-0.5 transition-all"
                >
                  X
                </button>
              </div>

              {/* Menu items */}
              <ul className="p-2 sm:p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto">
                {menu.map(({ to, label, Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `font-pixel text-[10px] sm:text-xs px-3 py-3 border-2 border-black flex items-center gap-3 transition-all ${
                          isActive
                            ? 'bg-pixel-accent text-pixel-night shadow-pixel-sm'
                            : 'bg-pixel-grass text-pixel-cream hover:bg-pixel-grass-light'
                        }`
                      }
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Footer panel */}
              <div className="px-3 py-2 border-t-4 border-pixel-accent bg-pixel-night/80 text-center">
                <p className="font-mono text-pixel-cream/70 text-xs">
                  Tekan{' '}
                  <span className="text-pixel-accent font-pixel text-[9px]">
                    ESC
                  </span>{' '}
                  atau klik luar untuk menutup
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}