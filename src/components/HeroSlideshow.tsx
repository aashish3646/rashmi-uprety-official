import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  position?: string;
};

type HeroSlideshowProps = {
  slides: Slide[];
  intervalMs?: number;
  ratio?: string;
  className?: string;
};

export function HeroSlideshow({
  slides,
  intervalMs = 3500,
  ratio = "4 / 5",
  className = "",
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, intervalMs]);

  if (slides.length === 0) return null;

  return (
    <div className={`relative overflow-hidden bg-paper-dim ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.src + index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.position ?? "center" }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
      </div>

      {/* Slideshow Controls & Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-2 text-paper">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-paper"
                    : "w-2 bg-paper/40 hover:bg-paper/70"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="meta rounded bg-noir/60 px-2.5 py-1 text-[10px] text-paper/80 backdrop-blur-sm hover:text-paper"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
}
