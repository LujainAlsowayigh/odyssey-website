import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function ChildrenLove() {
  const { t } = useTranslation();

  const cards = [
    { id: 'c1', icon: '🏰', color: 'bg-brand-blue' },
    { id: 'c2', icon: '🚀', color: 'bg-brand-coral' },
    { id: 'c3', icon: '🦊', color: 'bg-brand-green' },
    { id: 'c4', icon: '✨', color: 'bg-brand-purple' },
    { id: 'c5', icon: '⭐', color: 'bg-brand-gold' },
    { id: 'c6', icon: '🤖', color: 'bg-pink-400' }
  ];

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">{t('childrenlove.title')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 ${card.color} shadow-lg shadow-black/20`}>
                {card.icon}
              </div>
              <h3 className="text-white font-bold text-sm md:text-base">
                {t(`childrenlove.${card.id}`)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}