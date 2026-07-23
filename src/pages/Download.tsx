import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

// The real EAS build file lives on Expo's servers — this is the only place
// that raw URL appears. Everywhere else on the site (QR code, buttons) links
// to this page instead, so visitors see Odyssey's own branding first.
const REAL_BUILD_URL = "https://expo.dev/accounts/lujainalsowayigh/projects/odyssey/builds/bd8f70fc-d4a1-4e18-bed4-16bf846eae72";

export default function Download() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const steps = isAr
    ? [
        'امسحي الكود بكاميرا جوالك، أو اضغطي زر "تحميل" تحت.',
        'حمّلي التطبيق.',
        'لو طلب منك الجهاز إذن تثبيت من هذا المصدر، وافقي عليه.',
        'افتحي التطبيق واستمتعي بالتجربة!',
      ]
    : [
        "Scan the QR code with your phone's camera, or tap the Download button below.",
        'Download the app.',
        'If your phone asks to allow installation from this source, allow it.',
        'Open the app and enjoy the experience!',
      ];

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center px-6 py-16 text-center" dir={isAr ? 'rtl' : 'ltr'}>
      <a href="/" className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-bold">O</div>
        <span className="text-xl font-bold text-white tracking-tight">Odyssey</span>
      </a>

      <div className="inline-block bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
        {isAr ? 'نسخة تجريبية — للأندرويد فقط' : 'Demo Build — Android Only'}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-lg">
        {isAr ? 'جرّبي Odyssey على جهازك' : 'Try Odyssey on Your Device'}
      </h1>
      <p className="text-white/70 max-w-md mb-10">
        {isAr
          ? 'هذا البناء متاح حاليًا لأجهزة أندرويد فقط. افتحي هذي الصفحة من جوال أندرويد لتثبيت التطبيق.'
          : 'This build is currently available for Android devices only. Open this page on an Android phone to install.'}
      </p>

      <ol className="text-left rtl:text-right max-w-sm w-full mb-10 space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-white/85">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold text-brand-navy font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <a
        href={REAL_BUILD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-10 py-4 rounded-full bg-brand-gold text-brand-navy font-bold text-lg hover:bg-white transition-colors shadow-xl inline-block"
      >
        {isAr ? '⬇ تحميل للأندرويد' : '⬇ Download for Android'}
      </a>

      <a href="/" className="mt-8 text-white/50 text-sm hover:text-white/80 transition-colors">
        {isAr ? '← العودة للموقع الرئيسي' : '← Back to the main site'}
      </a>
    </div>
  );
}
