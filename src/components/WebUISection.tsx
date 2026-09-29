import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Eye, History, ShieldCheck, Smartphone, Laptop } from 'lucide-react';

export const WebUISection: React.FC = () => {
  const capabilities = [
    {
      title: 'Copy data on the fly',
      desc: 'Remotely trigger custom offloads, select target partitions, and monitor real-time transfer telemetry from your phone in your pocket.',
      icon: Wifi,
    },
    {
      title: 'Verify & preview your backups',
      desc: 'Run bit-for-bit checksum validation, inspect RAW image thumbnails, and stream proxy video clips straight to an iPad or laptop.',
      icon: Eye,
    },
    {
      title: 'Auditable backup history',
      desc: 'Browse past job logs, storage capacity meters, card serial logs, and transfer speeds in a sleek local web interface.',
      icon: History,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mobile & WebUI Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-3xl blur-2xl opacity-70" />
              
              <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex items-center justify-center">
                <img
                  src="/assets/PB-WEBUI-PHONE-IL-CLEAR.webp"
                  alt="PurrfectBackup WebUI Interface on smartphone and tablet"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: WebUI Proposition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              For Advanced Users & Production Teams
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              PurrfectBackup <span className="text-cyan-400">WebUI</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              While PurrfectBackup is 100% self-sufficient using its OLED screen and joystick, power users can toggle an ad-hoc local 5.0 GHz Wi-Fi hotspot to connect seamlessly with any smartphone, iPad, or laptop browser.
            </p>

            <div className="space-y-6 mb-8">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                iOS & Android
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Laptop className="w-4 h-4 text-cyan-400" />
                macOS & Windows
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-emerald-400">Zero App Store Installation</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
