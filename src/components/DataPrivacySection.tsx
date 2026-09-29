import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  WifiOff, 
  EyeOff, 
  FileCheck2, 
  CheckCircle2 
} from 'lucide-react';

export const DataPrivacySection: React.FC = () => {
  const privacyPillars = [
    {
      num: '01',
      title: 'Zero-Telemetry Guarantee',
      desc: 'No background call-home daemons, telemetry beacons, or user tracking. ReachVector devices operate in complete network silence.',
      icon: EyeOff,
      badge: 'Zero Telemetry',
    },
    {
      num: '02',
      title: 'Physical Air-Gap Isolation',
      desc: 'Hardware operates 100% offline. No cellular modems, no mandatory accounts, and no reliance on cloud authentication servers.',
      icon: WifiOff,
      badge: 'Air-Gapped',
    },
    {
      num: '03',
      title: 'Strict Read-Only Mounting',
      desc: 'All media card inputs are mounted strictly read-only at the kernel level, ensuring zero risk of ransomware or accidental file corruption.',
      icon: Lock,
      badge: 'Write-Blocker',
    },
    {
      num: '04',
      title: 'Cryptographic Parity Verification',
      desc: 'Bit-for-bit SHA-256 validation calculates checksums in real-time, outputting immutable tamper-evident audit logs directly to your drive.',
      icon: FileCheck2,
      badge: 'Deterministic',
    },
  ];

  return (
    <section id="privacy" className="py-20 md:py-28 bg-[#fafbfc] border-b border-slate-200/80 relative overflow-hidden">
      {/* Ambient background grid */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Architectural Sovereignty</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance"
          >
            Zero telemetry. Complete data privacy.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance"
          >
            In an era where consumer hardware quietly harvests usage analytics and mandates cloud tethering, ReachVector Intelligence LLP engineers systems around absolute physical privacy.
          </motion.p>
        </div>

        {/* 4 Privacy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {privacyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {pillar.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{pillar.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
