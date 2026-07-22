import React, { useRef, useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PhoneMockup } from '../ui/phone-mockup';
import { Lightbox } from '../ui/lightbox';
import { DEMO_VIDEO_URL } from '../../config';

function VideoUnavailable() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 9.75v6.75a2.25 2.25 0 002.25 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      </svg>
      <p className="text-sm font-medium">Video unavailable</p>
    </div>
  );
}

/** Returns true when the URL points directly to a video file (mp4, webm, mov, ogg). */
function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);
}

export function ShowcaseDemo() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const screens = [
    { key: 'language',         label: 'Choose Language',  image: '/screenshots/language.jpg' },
    { key: 'onboarding',       label: 'Welcome',          image: '/screenshots/onboarding-name.jpg' },
    { key: 'onboarding_age',   label: 'Choose Age',       image: '/screenshots/onboarding-age.jpg' },
    { key: 'screen_kingdom',   image: '/screenshots/kingdom.jpg' },
    { key: 'games_hub',        label: 'Practice Games',   image: '/screenshots/games-hub.jpg' },
    { key: 'sound_explorer',   label: 'Sound Explorer',   image: '/screenshots/sound-explorer.jpg' },
    { key: 'pronunciation_ok', label: 'Great Job!',       image: '/screenshots/pronunciation-success.jpg' },
    { key: 'market_toast',     label: 'Royal Market',     image: '/screenshots/market-toast.jpg' },
    { key: 'screen_rewards',   image: '/screenshots/rewards.jpg' },
    { key: 'screen_dashboard', image: '/screenshots/dashboard.jpg' },
    { key: 'parent_progress',  label: 'Parent Insights',  image: '/screenshots/parent-progress.jpg' },
  ];
  const screenLabel = (s: { key: string; label?: string }) => s.label ?? t(`showcase.${s.key}`);

  return (
    <div className="overflow-hidden">
      {/* App Showcase Carousel */}
      <section ref={containerRef} className="py-24 bg-brand-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <h2 className="text-4xl font-bold text-brand-navy">{t('showcase.title')}</h2>
        </div>
        
        <div className="w-full flex overflow-x-hidden py-10 relative">
          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-white to-transparent z-10 pointer-events-none"></div>

          <motion.div 
            style={{ x: xPos }}
            className="flex gap-12 px-32"
          >
            {screens.map((screen, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div
                  className="transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setLightboxIndex(i)}
                >
                  <PhoneMockup className="shadow-xl group-hover:shadow-2xl">
                    <img
                      src={screen.image}
                      alt={screenLabel(screen)}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </PhoneMockup>
                </div>
                <h3 className="mt-8 font-bold text-brand-navy opacity-60 group-hover:opacity-100 transition-opacity">
                  {screenLabel(screen)}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Video — URL is configured in src/config.ts */}
      {DEMO_VIDEO_URL ? (
        <section id="demo" className="py-24 bg-gray-900 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">{t('demo.title')}</h2>
              </div>

              <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden relative shadow-2xl border border-gray-700">
                {isDirectVideoUrl(DEMO_VIDEO_URL) ? (
                  videoError ? (
                    <VideoUnavailable />
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-contain"
                      src={DEMO_VIDEO_URL}
                      autoPlay
                      muted
                      loop
                      controls
                      playsInline
                      onError={() => setVideoError(true)}
                    />
                  )
                ) : (
                  iframeError ? (
                    <VideoUnavailable />
                  ) : (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={DEMO_VIDEO_URL}
                      title="Odyssey — Children's Learning Companion Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onError={() => setIframeError(true)}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <Lightbox
        images={screens.map(s => s.image)}
        index={lightboxIndex}
        getAlt={(i) => screenLabel(screens[i])}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}