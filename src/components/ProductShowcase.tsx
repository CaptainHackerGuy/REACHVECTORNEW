import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECH_SPECS } from '../data/specs.ts';
import { Check, ChevronDown, ChevronUp, ExternalLink, HardDrive, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProductShowcaseProps {
  onPreBookClick?: (model?: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onPreBookClick }) => {
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeModel, setActiveModel] = useState<'standard' | 'pro'>('pro');

  const standardFeatures = [
    'One-button automated backup',
    'Supports SD, microSD, CFexpress, CFast via USB reader',
    'Dual USB 3.2 Gen 1 (5Gbps) ports',
    '1.3″ High-contrast OLED display with tactile joystick',
    'Optional WebUI over local ad-hoc Wi-Fi',
    'Requires external USB storage (SSD or HDD)',
    'Ultra-compact 145g pocket footprint',
  ];

  const proFeatures = [
    'One-button automated backup',
    'Supports SD, microSD, CFexpress, CFast via USB reader',
    'Dual USB 3.2 Gen 1 (5Gbps) ports',
    '1.3″ High-contrast OLED display with tactile joystick',
    'Optional WebUI over local ad-hoc Wi-Fi',
    'Internal M.2 NVMe slot (support 128GB to 4TB)',
    'Zero loose cables: self-contained internal storage',
    'Can still output to external USB drive simultaneously',
  ];

  return (
    <section id="purrfectbackup" className="py-20 md:py-28 bg-slate-900/50 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Flagship Hardware Editions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Standard vs. PRO
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Both models back up the same cards, the same way, at the same 5Gbps port speed. PRO adds an empty internal NVMe slot so you can carry storage inside the device instead of tethering an external drive — install your own 128GB–4TB M.2 NVMe SSD, or use it exactly like Standard.
          </p>

          {/* Seamless Product Designated Website Link */}
          <div className="mt-5 inline-flex items-center gap-2 p-1.5 px-3 bg-slate-950/80 border border-slate-800 rounded-full text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Dedicated Product Portal:</span>
            <a
              href="https://purrfectbackup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              purrfectbackup.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Comparison Cards: Standard vs PRO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-14">
          
          {/* Standard Model Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden p-7 sm:p-9 ${
              activeModel === 'standard'
                ? 'bg-slate-900 border-cyan-500/80 shadow-2xl ring-1 ring-cyan-500/40'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
            onClick={() => setActiveModel('standard')}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white">Standard</h3>
                  <p className="text-xs text-slate-400 mt-0.5">External Storage Dedicated</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                  Matte Graphite
                </span>
              </div>

              {/* Product Visual */}
              <div className="relative aspect-square max-w-[260px] mx-auto my-6 flex items-center justify-center bg-slate-950/80 rounded-2xl border border-slate-800 p-4">
                <img
                  src="/assets/PB-STD-IL-CLEAR.webp"
                  alt="PurrfectBackup Standard"
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                {standardFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 block">Early Access Pass</span>
                <span className="text-xl font-extrabold text-white">$1 / ₹99</span>
              </div>
              <a
                href="#pre-book"
                onClick={() => onPreBookClick && onPreBookClick('Standard')}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                Pre-Book Standard
              </a>
            </div>
          </motion.div>

          {/* PRO Model Card (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden p-7 sm:p-9 relative ${
              activeModel === 'pro'
                ? 'bg-slate-900 border-cyan-400/90 shadow-2xl shadow-cyan-950/50 ring-2 ring-cyan-500/40'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
            onClick={() => setActiveModel('pro')}
          >
            {/* Top Recommended Tag */}
            <div className="absolute top-0 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-b-lg shadow-md">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    <span>PRO</span>
                    <span className="text-cyan-400 text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                      M.2 NVMe SLED
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Self-Contained Storage Bay</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                  Titanium Sled
                </span>
              </div>

              {/* Product Visual */}
              <div className="relative aspect-square max-w-[260px] mx-auto my-6 flex items-center justify-center bg-slate-950/80 rounded-2xl border border-slate-800 p-4">
                <img
                  src="/assets/PB-PRO-IL-CLEAR.webp"
                  alt="PurrfectBackup PRO with NVMe"
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 mb-8 text-sm text-slate-200">
                {proFeatures.map((feat, i) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${i >= 5 ? 'text-emerald-400 font-bold' : 'text-cyan-400'}`} />
                    <span className={i >= 5 ? 'font-medium text-white' : ''}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 block">Early Access Pass</span>
                <span className="text-xl font-extrabold text-cyan-300">$1 / ₹99</span>
              </div>
              <a
                href="#pre-book"
                onClick={() => onPreBookClick && onPreBookClick('PRO')}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-950 transition-all active:scale-[0.98]"
              >
                Pre-Book PRO (40% Off)
              </a>
            </div>
          </motion.div>

        </div>

        {/* Technical Specs Expandable Accordion */}
        <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full flex items-center justify-between px-6 py-4.5 text-left text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-900/60 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>Full Hardware Technical Specifications (Standard & PRO)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
              <span>{specsOpen ? 'Collapse Specs' : 'View All Specs'}</span>
              {specsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {specsOpen && (
            <div className="border-t border-slate-800 p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-normal">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px] tracking-wider">
                      <th className="pb-3 pr-4 font-semibold">Component</th>
                      <th className="pb-3 px-4 font-semibold">Standard Model</th>
                      <th className="pb-3 px-4 font-semibold text-cyan-400">PRO Model</th>
                      <th className="pb-3 pl-4 font-semibold hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {TECH_SPECS.map((spec) => (
                      <tr key={spec.parameter} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 pr-4 font-medium text-white">{spec.parameter}</td>
                        <td className="py-3 px-4 text-slate-300">{spec.standard}</td>
                        <td className="py-3 px-4 text-cyan-300 font-medium">{spec.pro}</td>
                        <td className="py-3 pl-4 text-slate-400 text-xs hidden md:table-cell">{spec.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
