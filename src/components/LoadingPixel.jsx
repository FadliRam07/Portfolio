import { IconSoccerBall, IconShuttlecock } from './PixelIcons';

export default function LoadingPixel({ text = 'LOADING' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="flex gap-3 items-center">
        <span className="animate-floatBall text-white">
          <IconSoccerBall size={24} />
        </span>
        <span className="animate-floatBall text-pixel-cream" style={{ animationDelay: '0.3s' }}>
          <IconShuttlecock size={24} />
        </span>
        <span className="animate-floatBall text-white" style={{ animationDelay: '0.6s' }}>
          <IconSoccerBall size={24} />
        </span>
      </div>
      <p className="font-pixel text-xs text-pixel-accent">
        {text}
        <span className="animate-blink">_</span>
      </p>
    </div>
  );
}