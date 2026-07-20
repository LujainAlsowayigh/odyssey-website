import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { useIsScrolled } from '../hooks/use-is-scrolled';

export function Navbar() {
  const { t, language, toggleLanguage } = useTranslation();
  const isScrolled = useIsScrolled(20);

  const links = [
    { id: 'home', label: 'nav.home' },
    { id: 'about', label: 'nav.about' },
    { id: 'features', label: 'nav.features' },
    { id: 'journey', label: 'nav.journey' },
    { id: 'kingdom', label: 'nav.kingdom' },
    { id: 'gallery', label: 'nav.gallery' },
    { id: 'contact', label: 'nav.contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
          <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
            <span className="text-xl">✨</span>
          </div>
          <span className="text-xl font-bold text-brand-navy tracking-tight">Odyssey</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <button 
              key={link.id} 
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-brand-navy/70 hover:text-brand-navy transition-colors"
            >
              {t(link.label)}
            </button>
          ))}
          <button 
            onClick={toggleLanguage}
            className="ml-4 px-3 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy font-semibold text-sm hover:bg-brand-navy/10 transition-colors flex items-center gap-2"
          >
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}