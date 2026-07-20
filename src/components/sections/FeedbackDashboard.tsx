import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function FeedbackDashboard() {
  const { t } = useTranslation();

  const feedbackScreens = ['s1', 's2', 's3', 's4', 's5'];
  const rewards = [
    { id: 'r1', icon: '⭐', color: 'bg-brand-gold/20' },
    { id: 'r2', icon: '🏆', color: 'bg-brand-purple/20' },
    { id: 'r3', icon: '🔓', color: 'bg-brand-blue/20' },
    { id: 'r4', icon: '🏰', color: 'bg-pink-400/20' },
    { id: 'r5', icon: '🦊', color: 'bg-brand-coral/20' },
    { id: 'r6', icon: '🗺️', color: 'bg-brand-green/20' }
  ];

  return (
    <div className="bg-gray-50">
      {/* AI Feedback Section */}
      <section className="py-24 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-6">{t('feedback.title')}</h2>
            <p className="text-xl text-brand-navy/70">{t('feedback.desc')}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {feedbackScreens.map((screen, i) => (
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center w-40 hover:-translate-y-2 transition-transform cursor-pointer"
              >
                <div className="w-16 h-32 rounded-xl bg-gradient-to-b from-brand-navy to-brand-purple mb-4 relative overflow-hidden">
                   {/* Mini mockup screen content */}
                   <div className="absolute inset-x-2 top-4 h-2 bg-white/20 rounded-full"></div>
                   <div className="absolute inset-x-4 top-8 h-10 bg-white/10 rounded-lg"></div>
                   <div className="absolute inset-x-2 bottom-4 h-8 bg-brand-gold/80 rounded-lg"></div>
                </div>
                <p className="text-sm font-bold text-brand-navy text-center leading-tight">
                  {t(`feedback.${screen}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Dashboard Section */}
      <section className="py-24 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Dashboard mockup visual */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <div className="text-lg font-bold text-brand-navy">{t('dashboard.header')}</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-brand-blue/10 p-4 rounded-xl">
                    <div className="text-sm text-brand-navy/60 mb-1">{t('dashboard.weekly_accuracy')}</div>
                    <div className="text-3xl font-bold text-brand-blue">87%</div>
                  </div>
                  <div className="bg-brand-gold/10 p-4 rounded-xl">
                    <div className="text-sm text-brand-navy/60 mb-1">{t('dashboard.stars_earned_stat')}</div>
                    <div className="text-3xl font-bold text-brand-gold">450</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm font-bold text-brand-navy mb-4">{t('dashboard.activity')}</div>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-brand-purple/40 rounded-t-sm" style={{height: `${h}%`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-brand-navy mb-6">{t('dashboard.title')}</h2>
              <p className="text-xl text-brand-navy/70 leading-relaxed mb-8">
                {t('dashboard.desc')}
              </p>
              
              <ul className="space-y-4">
                {(['metric_progress', 'metric_accuracy', 'metric_consistency', 'metric_stars', 'metric_unlocked'] as const).map((key, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-navy font-medium">
                    <div className="w-6 h-6 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center">✓</div>
                    {t(`dashboard.${key}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-24 bg-gradient-to-br from-brand-navy via-[#2a2a5a] to-[#3a225a] relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-coral/20 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[100px] mix-blend-screen"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">{t('rewards.title')}</h2>
            <p className="text-xl text-white/80">{t('rewards.desc')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {rewards.map((reward, i) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-2 flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-full ${reward.color} flex items-center justify-center text-3xl mb-4 shadow-lg border border-white/20`}>
                  {reward.icon}
                </div>
                <div className="text-white font-bold text-sm">
                  {t(`rewards.${reward.id}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}