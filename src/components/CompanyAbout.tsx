import React, { useState } from 'react';
import { Building2, Mail, MapPin, Globe, Check, Copy } from 'lucide-react';

interface CompanyAboutProps {
  onOpenTerms?: () => void;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = ({ onOpenTerms }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@reachvector.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('38 Bellandur, Bengaluru, Karnataka, India - 560103');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-[#fafbfc] border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Company Overview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            About ReachVector Intelligence
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            ReachVector Intelligence LLP is an advanced technology company engineering intelligent edge architectures, adaptive physical computing platforms, and specialized autonomous devices.
          </p>
        </div>

        {/* Narrative & Principles Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Mission & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              As computing increasingly transitions toward distributed edge environments, real-world workloads require physical hardware that can execute complex operations with speed, autonomy, and zero latency.
            </p>
            <p>
              At <strong className="text-slate-900">ReachVector Intelligence</strong>, we develop intelligent systems designed around operational sovereignty. We combine purpose-built embedded hardware architectures with adaptive on-device processing, delivering reliable tools that perform under demanding conditions without artificial software complexity.
            </p>
            <p>
              Our product engineering initiatives span standalone hardware instruments, intelligent edge pipelines, and field-grade appliances designed to solve specific physical computing challenges.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <span className="text-2xl font-extrabold text-slate-900 block font-mono">Edge</span>
                <span className="text-xs text-slate-500 mt-1 block">Dedicated On-Device Silicon</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <span className="text-2xl font-extrabold text-slate-900 block font-mono">Applied</span>
                <span className="text-xs text-slate-500 mt-1 block">Purpose-Built Physical Systems</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <span className="text-2xl font-extrabold text-slate-900 block font-mono">100%</span>
                <span className="text-xs text-slate-500 mt-1 block">Operational Sovereignty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Information Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building2 className="w-4.5 h-4.5 text-slate-700" />
                <span>Corporate Registration</span>
              </span>
              <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                LLPIN: ADC-7323
              </span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 pb-3.5 border-b border-slate-100">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-slate-500 block text-xs">Official Inquiries</span>
                  <div className="flex items-center gap-2">
                    <a href="mailto:contact@reachvector.in" className="font-semibold text-slate-900 hover:text-cyan-700 transition-colors">
                      contact@reachvector.in
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                      title="Copy email"
                      aria-label="Copy email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3.5 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-slate-500 block text-xs">Registered Address</span>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-slate-800 leading-snug">
                      #38, Bellandur<br />
                      Bengaluru, Karnataka 560103, India
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors mt-0.5 shrink-0"
                      title="Copy address"
                      aria-label="Copy address"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3.5 border-b border-slate-100">
                <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs">Legal Structure &amp; Operations</span>
                  <span className="font-medium text-slate-800">
                    ReachVector Intelligence LLP (LLPIN: ADC-7323)<br />
                    <span className="text-xs text-slate-500 font-normal">
                      Physical Computing, Embedded Systems Architecture &amp; Global Distribution
                    </span>
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 underline underline-offset-4 transition-colors"
                >
                  View Terms &amp; Conditions / Privacy Policy →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};