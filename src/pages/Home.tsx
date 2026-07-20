import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Vision } from '../components/sections/Vision';
import { ResearchImpact } from '../components/sections/Research';
import { Features } from '../components/sections/Features';
import { Journey } from '../components/sections/Journey';
import { Games } from '../components/sections/Games';
import { Kingdom } from '../components/sections/Kingdom';
import { FeedbackDashboard } from '../components/sections/FeedbackDashboard';
import { Testimonials } from '../components/sections/Testimonials';
import { ChildrenLove } from '../components/sections/ChildrenLove';
import { TechDifferent } from '../components/sections/TechDifferent';
import { ShowcaseDemo } from '../components/sections/ShowcaseDemo';
import { RoadmapCTA } from '../components/sections/RoadmapCTA';
import { GalleryContact } from '../components/sections/GalleryContact';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white font-sans text-brand-navy overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <ResearchImpact />
        <Features />
        <Journey />
        <Games />
        <Kingdom />
        <FeedbackDashboard />
        <Testimonials />
        <ChildrenLove />
        <TechDifferent />
        <ShowcaseDemo />
        <RoadmapCTA />
        <GalleryContact />
      </main>
      <Footer />
    </div>
  );
}