import React from 'react';

export function PhoneMockup({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`phone-mockup w-[280px] h-[580px] flex-shrink-0 bg-brand-navy ${className}`}>
      <div className="phone-notch"></div>
      <div className="w-full h-full rounded-[32px] overflow-hidden bg-brand-white relative">
        {children}
      </div>
    </div>
  );
}