import React from 'react';
import { motion } from 'motion/react';
import { Camera, Compass, Video } from 'lucide-react';

export const TargetAudience: React.FC = () => {
  const segments = [
    {
      role: 'Wedding & Event',
      badge: 'Zero Retakes Possible',
      icon: Camera,
      image: '/assets/wed-pt.webp',
      pain: 'Backing up 8–12 memory cards on reception tables amidst champagne and crowds.',
      solution: 'Dump high-speed dual SD/CFexpress cards right in your camera bag during dinner without breaking focus or hauling a fragile laptop.',
      stat: '100% Redundancy Before The Reception Ends',
    },
    {
      role: 'Wildlife & Travel Shooters',
      badge: 'Off-Grid Wilderness',
      icon: Compass,
      image: '/assets/wild-pt.webp',
      pain: 'Shooting hundreds of gigabytes in freezing tundra, humid rainforests, or dusty safari vehicles.',
      solution: 'IP-sealed dust resilience, standard USB-C power bank compatibility, and zero dependency on cellular networks or satellite links.',
      stat: 'Operates -10°C to 50°C with Handheld Power Banks',
    },
    {
      role: 'Drone & Videographers',
      badge: 'Massive Bitrates (ProRes/RAW)',
      icon: Video,
      image: '/assets/drone-pt.webp',
      pain: 'Clearing 512GB drone microSD and cinema cards between flight battery swaps.',
      solution: '5Gbps sustained transfer dumps 128GB in ~10 minutes, allowing fast turnaround on multi-battery flight days.',
      stat: '5Gbps USB 3.2 Gen 1 Sustained Transfer',
    },
  ];

  return (
    <section className="py-20 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Engineered For High-Stakes Production
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Who relies on{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              PurrfectBackup?
            </span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            From wedding chapels to arctic expeditions, see how field specialists eliminate data loss.
          </p>
        </div>

        {/* 3 Specialist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {segments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-slate-700 transition-colors"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.role}
                    className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-md bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-300 mb-5">
                      <p>
                        <span className="text-slate-400 font-medium">The Stress: </span>
                        {item.pain}
                      </p>
                      <p>
                        <span className="text-cyan-400 font-medium">The Solution: </span>
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item.stat}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
