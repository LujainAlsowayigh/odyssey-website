import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { AlertCircle, Heart, Star, Sparkles, BookOpen } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-brand-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-3">{t('about.title')}</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight"
          >
            <span className="text-brand-coral">{t('about.stat')}</span> {t('about.stat_text')}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[32px] shadow-xl border border-brand-navy/5 relative"
          >
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-coral text-white rounded-full flex items-center justify-center shadow-lg">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy mb-4">{t('about.struggle_title')}</h3>
            <p className="text-lg text-brand-navy/70 leading-relaxed mb-6">
              {t('about.struggle_text')}
            </p>
            <div className="flex gap-2">
              <div className="h-2 flex-1 bg-gray-100 rounded-full"></div>
              <div className="h-2 flex-1 bg-gray-100 rounded-full"></div>
              <div className="h-2 flex-1 bg-gray-100 rounded-full"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-navy p-8 rounded-[32px] shadow-xl relative text-white"
          >
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('about.solution_title')}</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              {t('about.solution_text')}
            </p>
            <div className="flex gap-2">
              <div className="h-2 flex-1 bg-brand-green rounded-full"></div>
              <div className="h-2 flex-1 bg-brand-blue rounded-full"></div>
              <div className="h-2 flex-1 bg-brand-gold rounded-full"></div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto bg-brand-blue/10 rounded-2xl p-6 border border-brand-blue/20 flex gap-4 items-start"
        >
          <div className="mt-1 text-brand-blue">
            <Heart size={24} />
          </div>
          <p className="text-brand-navy font-medium text-lg italic">
            "{t('about.disclaimer')}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}