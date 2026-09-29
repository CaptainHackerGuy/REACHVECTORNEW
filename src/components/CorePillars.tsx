import React from 'react';
import { motion } from 'motion/react';
import { Check, FolderSync, ShieldAlert, Cpu } from 'lucide-react';

export const CorePillars: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'One-button copy',
      subtitle: 'Zero friction on location',
      description: 'Plug in your memory card reader and backup drive, press copy. No app to pair, no bluetooth sync, no dropdown menus to get lost in.',
      image: '/assets/4-moments-01.webp',
      badge: 'Instant Ingest',
      icon: Check,
    },
    {
      num: '02',
      title: 'Dated or Just Copy',
      subtitle: 'Intelligent folder organization',
      description: 'Auto-sort your shoot by EXIF creation date into dated-backup/MM-DD-YYYY/, or mirror your card’s folder tree exactly with Just Copy.',
      image: '/assets/4-moments-02.webp',
      badge: 'Dual Mode',
      icon: FolderSync,
    },
    {
      num: '03',
      title: 'Never re-copies',
      subtitle: 'Smart duplicate prevention',
      description: 'Smart SHA duplicate detection skips already preserved files, eliminating wasted storage even if your camera resets file naming back to 0001 after 9999.',
      image: '/assets/4-moments-03.webp',
      badge: 'Safe Skip',
      icon: ShieldAlert,
    },
    {
      num: '04',
      title: 'Fits in a jacket pocket',
      subtitle: 'Runs on standard power banks',
      description: 'No proprietary heavy bricks. Runs reliably off standard 20W+ USB-C Power Delivery banks — yielding roughly 2 to 3 hours of continuous offload per 10,000mAh.',
      image: '/assets/4-moments-04.webp',
      badge: 'Ultra Compact',
      icon: Cpu,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
            Pure Engineering Restraint
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Built for the moment your laptop{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
              isn’t there.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            No companion phone apps, no spotty mountain Wi-Fi, no recurring monthly subscriptions — just rock-solid offline backups in any remote geography.
          </p>
        </div>

        {/* 4 Pillars Grid with Bento Style & Rich Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 lg:p-7 shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold text-sm">
                      {item.num}.
                    </span>
                    <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Visual Asset Container */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 mb-6 group-hover:border-slate-700 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
