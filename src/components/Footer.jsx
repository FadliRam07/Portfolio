import { IconShuttlecock } from './PixelIcons';

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 border-t-4 border-pixel-accent bg-pixel-night">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-6 text-center font-mono text-pixel-sky">
        <p className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
          <span>
            &copy; {new Date().getFullYear()} — <strong className="text-pixel-accent">Fadli Ramadhan</strong> (Alfa.Dev)
          </span>
          <IconShuttlecock size={16} className="text-pixel-cream" />
        </p>
        <p className="text-xs sm:text-sm mt-2 opacity-70 font-pixel">
          PRESS START TO CONTINUE <span className="animate-blink">|</span>
        </p>
      </div>
    </footer>
  );
}