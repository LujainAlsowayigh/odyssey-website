import React, { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PhoneMockup } from '../ui/phone-mockup';
import { Lightbox } from '../ui/lightbox';

export function GalleryContact() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryScreenshots = [
    '/odyssey-website/screenshots/home.jpg',
    '/odyssey-website/screenshots/challenge.jpg',
    '/odyssey-website/screenshots/complete.jpg',
    '/odyssey-website/screenshots/report.jpg',
    '/odyssey-website/screenshots/dashboard.jpg',
    '/odyssey-website/screenshots/rewards.jpg',
    '/odyssey-website/screenshots/challenge.jpg',
    '/odyssey-website/screenshots/complete.jpg',
  ];

  return (
    <>
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy">{t('gallery.title')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {galleryScreenshots.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`transform transition-transform duration-500 hover:scale-105 hover:z-10 cursor-zoom-in ${i % 2 === 0 ? 'translate-y-8' : ''}`}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="w-full aspect-[1/2] rounded-3xl bg-brand-navy p-2 shadow-xl border-4 border-gray-800 overflow-hidden">
                  <img
                    src={src}
                    alt={`Odyssey app screen ${i + 1}`}
                    className="w-full h-full object-cover object-top rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-brand-white border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">{t('contact.title')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://github.com/LujainAlsowayigh" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-navy/20 transition-all group text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-brand-navy group-hover:text-white transition-colors flex items-center justify-center text-brand-navy mb-4">
                <Github size={32} />
              </div>
              <h3 className="font-bold text-brand-navy text-lg">GitHub</h3>
            </a>
            
            <a href="https://www.linkedin.com/in/lujain-alsowayigh-69b80b280/" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0077b5]/50 transition-all group text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0077b5]/10 group-hover:bg-[#0077b5] group-hover:text-white transition-colors flex items-center justify-center text-[#0077b5] mb-4">
                <Linkedin size={32} />
              </div>
              <h3 className="font-bold text-brand-navy text-lg">LinkedIn</h3>
            </a>
            
            <a href="mailto:lujain2193@gmail.com" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-coral/30 transition-all group text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-coral/10 group-hover:bg-brand-coral group-hover:text-white transition-colors flex items-center justify-center text-brand-coral mb-4">
                <Mail size={32} />
              </div>
              <h3 className="font-bold text-brand-navy text-lg">Email</h3>
            </a>
          </div>
        </div>
      </section>

      <Lightbox
        images={galleryScreenshots}
        index={lightboxIndex}
        getAlt={(i) => `Odyssey app screen ${i + 1}`}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}