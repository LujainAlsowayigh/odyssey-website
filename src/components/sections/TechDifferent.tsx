import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function TechDifferent() {
  const { t } = useTranslation();

  const techPills = ['t1', 't2', 't3', 't4', 't5', 't6'];
  const differentPoints = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Tech Badges */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy">{t('tech.title')}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {techPills.map((pill, i) => (
              <motion.div
                key={pill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 text-brand-navy font-semibold hover:border-brand-blue hover:text-brand-blue transition-colors cursor-default"
              >
                {t(`tech.${pill}`)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Different */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-navy p-10 md:p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden"
          >
            {/* Decals */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('different.title')}</h2>
                <p className="text-white/70 mb-8 max-w-sm">
                  {t('different.desc')}
                </p>
                <div className="w-16 h-2 bg-brand-gold rounded-full"></div>
              </div>

              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 w-full">
                <ul className="space-y-4">
                  {differentPoints.map((pt, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white text-xs shrink-0">✓</div>
                      <span className="font-medium">{t(`different.${pt}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}