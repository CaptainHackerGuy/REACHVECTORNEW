import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

interface GallerySlide {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
}

export const ProductGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides: GallerySlide[] = [
    {
      id: 'dual-hero',
      title: 'PurrfectBackup Series: Standard & PRO',
      caption: 'Two refined editions engineered for intense field production. Standard for external drives; PRO for internal M.2 NVMe.',
      category: 'Flagship Overview',
      image: '/Productpage.webp',
    },
    {
      id: 'std-clear',
      title: 'PurrfectBackup Standard (Matte Graphite)',
      caption: 'Dual 5Gbps USB 3.2 Gen 1 ports with tactile 5-way joystick and high-contrast 1.3″ OLED display.',
      category: 'Standard Edition',
      image: '/assets/PB-STD-IL-CLEAR.webp',
    },
    {
      id: 'pro-clear',
      title: 'PurrfectBackup PRO (Titanium NVMe Sled)',
      caption: 'Integrated tool-less M.2 NVMe SSD enclosure supporting up to 4TB internal high-speed storage.',
      category: 'PRO Edition',
      image: '/assets/PB-PRO-IL-CLEAR.webp',
    },
    {
      id: 'webui-phone',
      title: 'Local Ad-Hoc 5.0 GHz WebUI Companion',
      caption: 'Connect with any browser on iOS, Android, macOS, or Windows for optional file validation and RAW photo previewing.',
      category: 'Software Ecosystem',
      image: '/assets/PB-WEBUI-PHONE-IL-CLEAR.webp',
    },
    {
      id: 'pocket-field',
      title: 'Pocket Sized & Power Bank Driven',
      caption: 'Runs off standard 20W+ USB-C power banks for 2 to 3 hours of continuous offloading.',
      category: 'Field Mobility',
      image: '/assets/4-moments-04.webp',
    },
  ];

  // Auto advance carousel every 6s unless paused
  useEffect(() => {
    if (isPaused || lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, lightboxOpen, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Hardware Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Product Gallery
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              Inspect the industrial build, ergonomic controls, and accessories from every angle.
            </p>
          </div>

          {/* Carousel Next/Prev Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-400 px-3">
              {currentIndex + 1} / {slides.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Carousel Stage */}
        <div
          className="relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
            
            {/* Slide Visual Area */}
            <div className="lg:col-span-8 relative aspect-[16/10] bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800/80 flex items-center justify-center p-6 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-h-full max-w-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                  onClick={() => setLightboxOpen(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Zoom Trigger Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-sm transition-all opacity-80 group-hover:opacity-100"
                aria-label="Enlarge image"
                title="View full resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Category Tag */}
              <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-300 bg-slate-900/90 px-3 py-1 rounded-md border border-cyan-500/20 backdrop-blur-sm">
                {currentSlide.category}
              </div>
            </div>

            {/* Slide Metadata & Information */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                  Featured Slide 0{currentIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {currentSlide.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {currentSlide.caption}
                </p>
              </div>

              {/* Filmstrip Thumbnails */}
              <div className="pt-6 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                  Select view
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border p-1 bg-slate-900 transition-all ${
                        currentIndex === idx
                          ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Switch to slide ${idx + 1}`}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <h4 className="text-lg font-bold text-white">{currentSlide.title}</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">{currentSlide.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
