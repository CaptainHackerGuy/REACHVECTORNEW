import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Check, ShieldCheck, Sparkles } from 'lucide-react';

export const PreBookSection: React.FC = () => {
  return (
    <section id="pre-book" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Guaranteed Priority Batch 1
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Pay $1 or ₹99, save{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                40% at launch.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              PurrfectBackup is finishing production with our high-precision manufacturing partners. Reserve your unit now with a fully refundable pass and lock in early-access pricing.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Full discounted purchase balance is due only once devices ship in 2026. If your plans change, refund your reservation pass with a single click at any time.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Risk-Free Refund Guarantee</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Valid for either PurrfectBackup Standard or PRO. One pass reserves up to two units in the same shipment.
              </p>
            </div>
          </div>

          {/* Right Column: Two Store Cards (International & India) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* International Store Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 rounded-3xl p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    Global Shipments
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    40% OFF PASS
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  International Store
                </h3>

                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    $1
                  </span>
                  <span className="text-xs text-slate-400">USD reservation</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Priority production batch fulfillment</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Valid for one Standard or PRO unit</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Add both Std and PRO in same cart</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Worldwide air courier tracking</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://us.purrfectbackup.com/product/purrfectbackup-early-access-pass/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950 transition-all active:scale-[0.98]"
              >
                <span>Pre-Book Pass ($1)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* India Store Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 hover:border-slate-700 rounded-3xl p-7 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    India Distribution
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    GST INVOICE
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  India Store
                </h3>

                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    ₹99
                  </span>
                  <span className="text-xs text-slate-400">INR reservation</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Domestic express priority shipping</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Valid for one Standard or PRO unit</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Add both Std and PRO in same cart</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Local warranty & support hub</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://india.purrfectbackup.com/product/purrfectbackup-early-access-pass/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all active:scale-[0.98]"
              >
                <span>Pre-Book Pass (₹99)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
