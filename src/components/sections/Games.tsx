import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { PhoneMockup } from '../ui/phone-mockup';
import { Volume2, Mic, Activity } from 'lucide-react';

export function Games() {
  const { t } = useTranslation();

  const games = [
    {
      id: 'g1',
      icon: <Volume2 className="text-white w-8 h-8" />,
      bgColor: "bg-brand-blue",
      image: '/screenshots/challenge.jpg',
    },
    {
      id: 'g2',
      icon: <Mic className="text-white w-8 h-8" />,
      bgColor: "bg-brand-coral",
      image: '/screenshots/kingdom.jpg',
    },
    {
      id: 'g3',
      icon: <Activity className="text-white w-8 h-8" />,
      bgColor: "bg-brand-purple",
      image: '/screenshots/dashboard.jpg',
    }
  ];

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute w-[800px] h-[800px] bg-brand-blue rounded-full blur-[150px] -top-1/2 -left-1/4"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">{t('games.title')}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
          {games.map((game, i) => (
            <motion.div 
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-[40px] p-8 border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-colors"
            >
              <div className={`w-20 h-20 rounded-2xl ${game.bgColor} flex items-center justify-center mb-8 shadow-lg shadow-${game.bgColor}/30 -mt-16 border-4 border-brand-navy`}>
                {game.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{t(`games.${game.id}_title`)}</h3>
              <p className="text-white/70 mb-6 flex-1 min-h-[60px]">
                {t(`games.${game.id}_desc`)}
              </p>
              
              <div className="w-full bg-brand-navy/50 rounded-2xl p-4 mb-8 border border-white/5">
                <p className="text-brand-gold text-sm font-semibold">??? {t(`games.${game.id}_ai`)}</p>
              </div>

              <div className="w-full max-w-[220px] scale-90 origin-top">
                <PhoneMockup>
                  <img
                    src={game.image}
                    alt={t(`games.${game.id}_title`)}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </PhoneMockup>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
