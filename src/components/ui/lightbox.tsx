import React, { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  index: number | null;
  getAlt?: (index: number) => string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 50; // minimum px to count as a swipe
const SWIPE_HINT_KEY = 'odyssey_lightbox_swipe_hint_seen';

export function Lightbox({ images, index, getAlt, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null && index >= 0 && index < images.length;
  const src = isOpen ? images[index!] : null;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goPrev, goNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Only treat as horizontal swipe if horizontal movement dominates
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      goNext();
    } else {
      goPrev();
    }
  }, [goPrev, goNext]);

  // Show swipe hint on first open on a touch device
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    // Only show on touch-capable devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;
    // Only show if not already seen (persisted across sessions)
    if (localStorage.getItem(SWIPE_HINT_KEY)) return;
    setShowSwipeHint(true);
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
      localStorage.setItem(SWIPE_HINT_KEY, '1');
    }, 2000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const hasManyImages = images.length > 1;

  return (
    <AnimatePresence>
      {isOpen && src && (
        <motion.div
          key="lightbox-backdrop"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Prev button */}
          {hasManyImages && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next button */}
          {hasManyImages && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white z-10"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={src}
              className="relative max-w-sm w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phone frame */}
              <div className="relative bg-brand-navy rounded-[44px] p-3 shadow-2xl border-4 border-gray-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-brand-navy rounded-b-2xl z-10" />
                <div className="rounded-[34px] overflow-hidden">
                  <img
                    src={src}
                    alt={getAlt ? getAlt(index!) : `Screenshot ${index! + 1}`}
                    className="w-full h-auto block"
                    style={{ maxHeight: '80vh', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          {hasManyImages && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Swipe hint — touch devices only, first open only */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                key="swipe-hint"
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-6 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              >
                {/* Left arrow pulse */}
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ x: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                >
                  <ChevronLeft size={36} className="text-white/80 drop-shadow-lg" />
                </motion.div>

                {/* Centre label */}
                <span className="text-white/70 text-sm font-medium tracking-wide select-none">
                  Swipe to browse
                </span>

                {/* Right arrow pulse */}
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                >
                  <ChevronRight size={36} className="text-white/80 drop-shadow-lg" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
