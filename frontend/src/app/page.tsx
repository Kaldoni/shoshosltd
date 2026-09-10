import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import WhatWeDo from '@/components/sections/WhatWeDo';
import WhyPartner from '@/components/sections/WhyPartner';
import { CTABanner, Footer } from '@/components/sections/CTAAndFooter';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
  title:
    'Shoshos Oil and Gas Intl. Limited | Engineering, Energy, Marine & Logistics',
  description:
    'Shoshos Oil and Gas Intl. Limited provides well intervention, marine, pipeline, engineering and logistics support for onshore and offshore energy operations.',
  keywords:
    'oil and gas engineering, Nigeria, procurement, marine services, Warri, shoshos',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <WhatWeDo />
        <WhyPartner />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
