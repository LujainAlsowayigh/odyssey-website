import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useTranslation();

  const links = [
    { id: 'home', label: 'nav.home' },
    { id: 'about', label: 'nav.about' },
    { id: 'features', label: 'nav.features' },
    { id: 'contact', label: 'nav.contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white tracking-tight">Odyssey <span className="text-brand-gold">✨</span></span>
            </div>
            <p className="text-white/70">
              {t('footer.desc')}
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {links.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {t(link.label)}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}