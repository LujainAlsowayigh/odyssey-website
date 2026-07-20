import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Kingdom() {
  const { t } = useTranslation();

  return (
    <section id="kingdom" className="py-32 bg-brand-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8">{t('kingdom.title')}</h2>
            
            <div className="space-y-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-1">
                    <span className="font-bold text-sm">{num}</span>
                  </div>
                  <p className="text-lg text-brand-navy/80 leading-relaxed">
                    {t(`kingdom.desc${num}`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <div className="px-6 py-3 bg-brand-navy rounded-full text-white font-semibold flex items-center gap-2">
                <span>{t('kingdom.earn_stars')}</span>
                <span className="text-brand-gold">⭐</span>
              </div>
              <div className="px-6 py-3 bg-brand-green/20 text-brand-green rounded-full font-semibold flex items-center gap-2">
                <span>{t('kingdom.expand_world')}</span>
                <span>🌍</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-100"
          >
            {/* Visual metaphor for the Kingdom */}
            <div className="absolute inset-0 flex">
              {/* Grayscale / Locked part */}
              <div className="w-1/3 h-full bg-gray-200 grayscale relative overflow-hidden flex flex-col justify-end p-8 border-r-2 border-dashed border-gray-400">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>
                <div className="w-full h-32 bg-gray-400 rounded-t-full opacity-50 mx-auto"></div>
                <div className="absolute top-8 left-8 bg-gray-800 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider">{t('kingdom.locked')}</div>
              </div>
              
              {/* Colorful / Unlocked part */}
              <div className="w-2/3 h-full bg-gradient-to-br from-brand-blue via-brand-purple to-brand-green relative overflow-hidden flex flex-col justify-end p-8">
                {/* Sun */}
                <div className="absolute top-12 right-12 w-24 h-24 bg-brand-gold rounded-full blur-[10px] opacity-80"></div>
                <div className="absolute top-12 right-12 w-20 h-20 bg-brand-white rounded-full shadow-[0_0_50px_rgba(246,196,69,1)]"></div>
                
                {/* Floating islands */}
                <div className="absolute top-1/3 right-1/4 w-32 h-12 bg-white/20 backdrop-blur-sm rounded-full animate-float-gentle"></div>
                <div className="absolute top-1/2 right-1/2 w-48 h-16 bg-white/20 backdrop-blur-sm rounded-full animate-float-gentle" style={{animationDelay: '1s'}}></div>
                
                {/* Landscape */}
                <div className="w-full h-48 bg-gradient-to-t from-brand-green to-[#9DE4BE] rounded-t-full opacity-90 mx-auto relative z-10"></div>
                
                {/* Animal placeholder */}
                <div className="absolute bottom-12 right-24 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl z-20 hover:scale-110 transition-transform cursor-pointer">
                  🦊
                </div>
                <div className="absolute bottom-20 left-12 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-xl z-20 hover:scale-110 transition-transform cursor-pointer">
                  🦉
                </div>

                <div className="absolute top-8 right-8 bg-white text-brand-navy text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider shadow-lg flex items-center gap-1">
                  <span className="text-brand-gold">⭐</span> {t('kingdom.unlocked')}
                </div>
              </div>
            </div>
            
            {/* Dividing Line Magic effect */}
            <div className="absolute top-0 bottom-0 left-1/3 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-sm pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}