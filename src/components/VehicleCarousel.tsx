import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface CarouselSlide {
  small: string;
  large: string;
  alt: string;
}

interface VehicleCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  intervalMs?: number;
}

const VehicleCarousel: React.FC<VehicleCarouselProps> = ({ slides, className, intervalMs = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const total = useMemo(() => (slides?.length ?? 0), [slides]);

  const goTo = (idx: number) => {
    if (total === 0) return;
    const next = (idx + total) % total;
    setCurrentIndex(next);
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  useEffect(() => {
    if (isHovered || total <= 1) return;
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isHovered, intervalMs, total]);

  if (!slides || slides.length === 0) return null;

  const current = slides[currentIndex];

  return (
    <div
      className={`relative ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-80 lg:h-full bg-white flex items-center justify-center overflow-hidden">
        <img
          src={current.large}
          srcSet={`${current.small} 640w, ${current.large} 1280w`}
          sizes="(max-width:1024px) 100vw, 640px"
          alt={current.alt}
          className="max-h-full w-auto object-contain"
        />
      </div>

      {/* Controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute inset-y-0 left-0 px-3 flex items-center justify-center focus:outline-none hover:opacity-100 opacity-0 hover:bg-black/0 group"
          >
            <span className="bg-white/80 hover:bg-white text-daisou-text rounded-full w-8 h-8 flex items-center justify-center shadow">‹</span>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute inset-y-0 right-0 px-3 flex items-center justify-center focus:outline-none hover:opacity-100 opacity-0 hover:bg-black/0 group"
          >
            <span className="bg-white/80 hover:bg-white text-daisou-text rounded-full w-8 h-8 flex items-center justify-center shadow">›</span>
          </button>
        </>
      )}

      {/* Indicators */}
      {total > 1 && (
        <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-daisou-accent' : 'bg-gray-300'}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleCarousel;


