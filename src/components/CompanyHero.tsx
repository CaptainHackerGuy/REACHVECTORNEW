import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Network, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { Logo } from './Logo.tsx';

export const CompanyHero: React.FC = () => {
  return (
    <section id="company" className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Subtle clean background grid */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-50" />
      
      {/* Soft Ambient Radial Accents */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-slate-100 via-sky-50/50 to-emerald-50/30 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Prominent Logo Presentation with Natural Stretched Geometry */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="flex justify-center mb-8"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow inline-flex items-center">
            <Logo size="lg" theme="light" />
          </div>
        </motion.div>

        {/* Clean Unboxed Metadata Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6"
        >
          <span>Applied Edge AI</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Zero-Telemetry Hardware</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-emerald-700">Autonomous Computing</span>
        </motion.div>

        {/* Reverted Main Headline to Old Quote as Requested */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6 max-w-4xl mx-auto text-balance"
        >
          Direction. Magnitude. Intelligence.
        </motion.h1>

        {/* Refined Narrative blending AI company positioning without over-hyping */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10 text-balance"
        >
          ReachVector Intelligence LLP builds edge AI architectures and autonomous physical systems designed to process, preserve, and protect critical data directly where it originates.
        </motion.p>

        {/* CTAs with interactive hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all duration-200"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#privacy"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200"
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Data Privacy &amp; Security</span>
          </motion.a>
        </motion.div>

        {/* 3 Value Pillars with subtle hover lift and animated borders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100 max-w-4xl mx-auto text-left"
        >
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 mt-0.5">
              <Network className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Decentralized Intelligence</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Adaptive on-device processing designed to execute reliably without dependency on persistent cloud connectivity.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 mt-0.5">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Applied Computing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Purpose-engineered physical computing architectures combining specialized silicon with seamless human ergonomics.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 mt-0.5">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Deterministic Reliability</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero-telemetry systems engineered for uncompromising data integrity, security, and hardware longevity.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};