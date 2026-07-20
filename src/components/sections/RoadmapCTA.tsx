import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { APP_URL } from '../../config';

export function RoadmapCTA() {
  const { t } = useTranslation();

  return (
    <>
      <section className="py-24 bg-brand-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">{t('roadmap.title')}</h2>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto hide-scrollbar pb-8">
            <div className="flex gap-4 min-w-max">
              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-brand-navy text-white px-6 py-4 rounded-xl flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green text-brand-navy flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="font-semibold">{t(`roadmap.done${num}`)}</span>
                </div>
              ))}
              
              <div className="flex items-center px-4">
                <div className="h-[2px] w-12 bg-gray-300"></div>
                <div className="mx-4 font-bold text-gray-400 uppercase text-sm tracking-wider">{t('roadmap.soon')}</div>
                <div className="h-[2px] w-12 bg-gray-300"></div>
              </div>

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white border-2 border-dashed border-gray-200 text-gray-500 px-6 py-4 rounded-xl flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs"></div>
                  <span className="font-medium">{t(`roadmap.s${num}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-gradient-to-r from-brand-navy via-brand-purple to-brand-blue">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-50"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              {t('cta.sub')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-brand-gold text-brand-navy font-bold text-lg hover:bg-white transition-colors shadow-xl hover:-translate-y-1 inline-block"
              >
                {t('cta.btn2')}
              </a>
              <a
                href="#demo"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-lg hover:bg-white/20 transition-colors hover:-translate-y-1 inline-block"
              >
                {t('cta.btn1')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
