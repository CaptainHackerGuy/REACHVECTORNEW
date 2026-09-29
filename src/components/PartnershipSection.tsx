import React, { useState } from 'react';
import { 
  Handshake, 
  Mail, 
  Check, 
  Copy, 
  ArrowUpRight, 
  Store, 
  Cpu, 
  Compass
} from 'lucide-react';

export const PartnershipSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@reachvector.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const areas = [
    {
      icon: Store,
      title: 'Retail & Distribution',
      desc: 'Collaborate with us to stock and distribute PurrfectBackup in your regional camera store, gear rental house, or online retail channel.',
    },
    {
      icon: Cpu,
      title: 'Hardware & OEM Integration',
      desc: 'Partner on dedicated offline storage controllers, custom field ingestion hardware, and applied edge computing projects.',
    },
    {
      icon: Compass,
      title: 'Field Testing & Expeditions',
      desc: 'Connect with our team to deploy PurrfectBackup on film shoots, nature expeditions, and remote production environments.',
    },
  ];

  return (
    <section id="partnerships" className="py-20 md:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium mb-3">
            <Handshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open for Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Partnerships
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            ReachVector Intelligence is actively open to strategic partnerships. Whether you are an international distributor, camera retailer, or hardware partner, we welcome collaborations that align with our focus on offline-first, autonomous computing.
          </p>
        </div>

        {/* 3 Clear Collaboration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-[#fafbfc] border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sleek Partnership Contact Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
              Direct Contact
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to discuss a partnership?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach out to our partnership team with your brief or proposal at our official email address.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center justify-between gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                  contact@reachvector.in
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer active:scale-95"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            <a
              href="mailto:contact@reachvector.in?subject=Partnership%20Inquiry%20-%20ReachVector%20Intelligence"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-colors cursor-pointer active:scale-95"
            >
              <span>Email Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};