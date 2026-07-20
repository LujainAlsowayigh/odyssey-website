import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Mic2, Map, Gamepad2, LineChart, Trophy, TrendingUp, Gift } from 'lucide-react';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Mic2 className="w-8 h-8 text-brand-purple" />,
      title: 'c1_title',
      desc: 'c1_text',
      color: 'bg-brand-purple/10'
    },
    {
      icon: <Map className="w-8 h-8 text-brand-blue" />,
      title: 'c2_title',
      desc: 'c2_text',
      color: 'bg-brand-blue/10'
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-brand-coral" />,
      title: 'c3_title',
      desc: 'c3_text',
      color: 'bg-brand-coral/10'
    },
    {
      icon: <LineChart className="w-8 h-8 text-brand-green" />,
      title: 'c4_title',
      desc: 'c4_text',
      color: 'bg-brand-green/10'
    },
    {
      icon: <Trophy className="w-8 h-8 text-brand-gold" />,
      title: 'c5_title',
      desc: 'c5_text',
      color: 'bg-brand-gold/10'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-navy" />,
      title: 'c6_title',
      desc: 'c6_text',
      color: 'bg-brand-navy/10'
    },
    {
      icon: <Gift className="w-8 h-8 text-pink-500" />,
      title: 'c7_title',
      desc: 'c7_text',
      color: 'bg-pink-500/10'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-navy">{t('features.title')}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${i === 6 ? 'md:col-span-2 lg:col-span-1 xl:col-span-2 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center md:items-start lg:items-center xl:items-start gap-6' : 'flex flex-col'}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 ${i === 6 ? 'mb-0 shrink-0' : ''}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{t(`features.${feature.title}`)}</h3>
                <p className="text-brand-navy/60 leading-relaxed">
                  {t(`features.${feature.desc}`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}