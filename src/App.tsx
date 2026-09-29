import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { CompanyHero } from './components/CompanyHero.tsx';
import { CompanyAbout } from './components/CompanyAbout.tsx';
import { ProductsSection } from './components/ProductsSection.tsx';
import { PartnershipSection } from './components/PartnershipSection.tsx';
import { CompanyContact } from './components/CompanyContact.tsx';
import { Footer } from './components/Footer.tsx';
import { TermsModal } from './components/TermsModal.tsx';

export default function App() {
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsDefaultTab, setTermsDefaultTab] = useState<'terms' | 'privacy'>('terms');

  const handleOpenTerms = (tab: 'terms' | 'privacy' = 'terms') => {
    setTermsDefaultTab(tab);
    setTermsModalOpen(true);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar onContactClick={scrollToContact} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Company Hero (ReachVector Intelligence) */}
        <CompanyHero />

        {/* 2. About ReachVector Intelligence (Company Overview & Philosophy) */}
        <CompanyAbout onOpenTerms={() => handleOpenTerms('terms')} />

        {/* 3. Unified Products Section (PurrfectBackup & Coming Soon) */}
        <ProductsSection onPreBookSelect={scrollToContact} />

        {/* 4. Strategic Partnerships & Collaborations */}
        <PartnershipSection />

        {/* 5. Contact & Inquiries */}
        <CompanyContact />
      </main>

      {/* Global Corporate Footer */}
      <Footer onOpenTerms={handleOpenTerms} />

      {/* Terms & Conditions / Privacy Policy Modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        defaultTab={termsDefaultTab}
      />
    </div>
  );
}
