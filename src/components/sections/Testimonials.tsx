import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [1, 2, 3];

  return (
    <section className="py-24 bg-brand-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-navy">{t('testimonials.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((num, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative"
            >
              <div className="text-brand-gold text-4xl font-serif absolute -top-4 left-8">"</div>
              <p className="text-lg text-brand-navy/80 italic mb-8 relative z-10 mt-2">
                {t(`testimonials.t${num}_quote`)}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold">
                  {t(`testimonials.t${num}_author`).charAt(0)}
                </div>
                <div className="font-bold text-brand-navy">
                  {t(`testimonials.t${num}_author`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}