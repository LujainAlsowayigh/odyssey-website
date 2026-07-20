import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { PhoneMockup } from '../ui/phone-mockup';
import { APP_URL } from '../../config';

export function Hero() {
  const { t } = useTranslation();
  const [particles, setParticles] = useState<{id: number, left: string, top: string, size: string, duration: string, delay: string}[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 2}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] pt-32 pb-20 flex items-center bg-brand-navy overflow-hidden">
      {/* Star particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <div 
            key={p.id}
            className="star-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay
            }}
          />
        ))}
        {/* Soft glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-purple font-medium text-sm mb-6 backdrop-blur-sm">
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              {t('hero.headline')}
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              {t('hero.subcopy')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-brand-gold text-brand-navy font-bold text-lg hover:bg-white transition-colors hover-elevate shadow-lg hover:shadow-brand-gold/30 inline-block"
              >
                {t('hero.cta_primary')}
              </a>
              <a
                href="#demo"
                className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20 inline-block"
              >
                {t('hero.cta_secondary')}
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative animate-float-gentle">
              <PhoneMockup>
                <div className="w-full h-full bg-gradient-to-b from-[#1a1a3e] to-[#2c2250] flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 mix-blend-screen" />
                  
                  {/* Decorative internal elements for mockup */}
                  <div className="pt-16 px-6 flex flex-col h-full z-10">
                    <div className="w-full flex justify-between items-center mb-8">
                      <div className="flex gap-1">
                        <span className="text-brand-gold text-xl">⭐</span>
                        <span className="text-white font-bold text-lg">124</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-purple/40 border-2 border-white/20 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="Avatar" className="w-full h-full" />
                      </div>
                    </div>
                    
                    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-4 shadow-xl">
                      <div className="w-12 h-12 rounded-xl bg-brand-blue/30 flex items-center justify-center mb-4">
                        <span className="text-2xl">🌍</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{t('hero.mockup_kingdom')}</h3>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-4">
                        <div className="bg-brand-green w-3/4 h-full rounded-full" />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-auto pb-8">
                      <div className="w-full bg-brand-purple/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                        <span className="text-2xl block mb-1">🎯</span>
                        <div className="w-full h-1.5 bg-white/20 rounded-full mx-auto mt-2" />
                      </div>
                      <div className="w-full bg-brand-coral/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                        <span className="text-2xl block mb-1">🏆</span>
                        <div className="w-full h-1.5 bg-white/20 rounded-full mx-auto mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </PhoneMockup>
              
              {/* Floating badges around mockup */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 top-1/4 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-3 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green text-xl">✓</div>
                <div>
                  <div className="text-sm font-bold text-brand-navy">{t('hero.perfect')}</div>
                  <div className="text-xs text-gray-500">{t('hero.stars_earned')}</div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-8 bottom-1/3 bg-white rounded-2xl p-3 shadow-xl flex flex-col gap-2 border border-gray-100"
              >
                <div className="text-xs font-bold text-brand-navy mb-1">{t('hero.accuracy')}</div>
                <div className="flex items-end gap-1">
                  <div className="w-2 h-4 bg-brand-blue/30 rounded-full"></div>
                  <div className="w-2 h-6 bg-brand-blue/60 rounded-full"></div>
                  <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave transition bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,137.93,121.2,204.4,109.5,243.6,102.66,283.47,81.42,321.39,56.44Z" className="fill-brand-white"></path>
        </svg>
      </div>
    </section>
  );
}
