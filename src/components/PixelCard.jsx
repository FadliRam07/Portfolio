export default function PixelCard({ children, className = '', color = 'grass' }) {
  const colorMap = {
    grass: 'bg-pixel-grass text-pixel-cream',
    sky: 'bg-pixel-sky-dark text-pixel-cream',
    cream: 'bg-pixel-cream text-pixel-night',
    night: 'bg-pixel-night text-pixel-cream',
  };

  return (
    <div
      className={`relative border-4 border-black shadow-pixel p-6 md:p-8 ${colorMap[color]} ${className}`}
    >
      {children}
    </div>
  );
}