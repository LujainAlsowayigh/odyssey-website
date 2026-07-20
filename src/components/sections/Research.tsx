import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';

function CountUp({ end, suffix = "", prefix = "", text = "" }: { end: number, suffix?: string, prefix?: string, text?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        const percentage = Math.min(progress / duration, 1);
        const currentCount = Math.floor(end * percentage);
        
        setCount(currentCount);
        
        if (progress < duration) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-bold">
      {text || `${prefix}${count}${suffix}`}
    </span>
  );
}

export function ResearchImpact() {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('research.card1_title'),
      text: t('research.card1_text'),
      color: "bg-brand-coral",
      textColor: "text-brand-coral",
      isNumber: false,
      staticText: "1 in 14"
    },
    {
      title: "100%", // Daily practice conceptually
      text: t('research.card2_text'),
      color: "bg-brand-blue",
      textColor: "text-brand-blue",
      isNumber: true,
      end: 100,
      suffix: "%"
    },
    {
      title: "< 1s", // AI feedback conceptually
      text: t('research.card3_text'),
      color: "bg-brand-purple",
      textColor: "text-brand-purple",
      isNumber: true,
      end: 1,
      prefix: "< ",
      suffix: "s"
    }
  ];

  return (
    <section className="py-24 bg-brand-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-navy">{t('research.title')}</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 shadow-xl shadow-brand-navy/5 border border-brand-navy/5 text-center flex flex-col items-center hover-elevate transition-transform"
            >
              <div className={`w-24 h-24 rounded-full ${card.color}/10 flex items-center justify-center mb-6`}>
                <div className={`text-4xl ${card.textColor}`}>
                  {card.isNumber ? (
                    <CountUp end={card.end!} suffix={card.suffix} prefix={card.prefix} />
                  ) : (
                    <span className="font-bold">{card.title}</span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                {card.isNumber ? (i === 1 ? t('research.card2_title') : t('research.card3_title')) : t('research.card1_title')}
              </h3>
              <p className="text-brand-navy/70 leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}