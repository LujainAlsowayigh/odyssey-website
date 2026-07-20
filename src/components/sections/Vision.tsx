import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Vision() {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-brand-navy relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-brand-gold mb-8">{t('vision.title')}</h2>
          <p className="text-2xl md:text-4xl font-semibold text-white leading-relaxed md:leading-normal font-serif">
            "{t('vision.text')}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}