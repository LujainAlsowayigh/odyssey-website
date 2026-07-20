import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function Journey() {
  const { t } = useTranslation();

  const steps = [
    { id: 's1', color: 'bg-brand-blue' },
    { id: 's2', color: 'bg-brand-coral' },
    { id: 's3', color: 'bg-brand-green' },
    { id: 's4', color: 'bg-brand-purple' },
    { id: 's5', color: 'bg-brand-navy' },
    { id: 's6', color: 'bg-brand-gold' },
    { id: 's7', color: 'bg-pink-400' },
    { id: 's8', color: 'bg-brand-blue' }
  ];

  return (
    <section id="journey" className="py-24 bg-brand-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-brand-navy">{t('journey.title')}</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 md:-translate-x-1/2 rounded-full"></div>

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 md:left-1/2 w-14 h-14 rounded-full border-4 border-white ${step.color} shadow-lg md:-translate-x-1/2 z-10 flex items-center justify-center text-white font-bold text-xl`}>
                    {i + 1}
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
                      {isEven && <CheckCircle2 className="text-gray-300 hidden md:block shrink-0" />}
                      <h3 className="text-xl font-bold text-brand-navy flex-1">
                        {t(`journey.${step.id}`)}
                      </h3>
                      {!isEven && <CheckCircle2 className="text-gray-300 hidden md:block shrink-0" />}
                      {/* Mobile checkmark */}
                      <CheckCircle2 className="text-gray-300 md:hidden shrink-0" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}