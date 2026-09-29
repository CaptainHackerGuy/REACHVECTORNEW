import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, ShieldCheck, Zap, HardDrive, BatteryCharging, Play, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onWatchDemo?: () => void;
  onPreBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchDemo, onPreBookClick }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots = [
    {
      id: 'oled',
      title: '1.3″ OLED Cat-Eye Screen',
      desc: 'High-contrast real-time status with live progress bar, file count, and transfer rate.',
      top: '48%',
      left: '34%',
    },
    {
      id: 'joystick',
      title: '5-Way Tactile Joystick',
      desc: 'One-thumb navigation built to operate effortlessly even with heavy winter gloves.',
      top: '60%',
      left: '37%',
    },
    {
      id: 'usb',
      title: 'Dual 5Gbps USB 3.2 Ports',
      desc: 'Connect your multi-card reader to Port A and your target SSD to Port B.',
      top: '80%',
      left: '36%',
    },
    {
      id: 'nvme',
      title: 'M.2 NVMe Sled (PRO Model)',
      desc: 'Install up to 4TB internal M.2 SSD for self-contained, cable-free card dumps.',
      top: '55%',
      left: '72%',
    },
    {
      id: 'power',
      title: '20W+ USB-C PD Input',
      desc: 'Powered directly by camera or phone power banks for 2–3 hours per 10,000mAh.',
      top: '48%',
      left: '12%',
    },
  ];

  return (
    <section id="overview" className="relative pt-12 pb-20 md:pt-18 md:pb-28 overflow-hidden">
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Unboxed Brand Subtitle / Field Status */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              <span>ReachVector Flagship Hardware</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Zero Laptop Required</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400">Production 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance">
              Your card’s full.{' '}
              <br />
              There’s no laptop{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                in sight.
              </span>
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
              <strong className="text-white font-semibold">PurrfectBackup</strong> is a pocket-sized, laptop-free backup device for photographers, travelers, and content creators. Copy your <strong className="text-cyan-300 font-medium">SD, microSD, CFexpress, and CFast</strong> cards directly to fast internal storage or external SSD — no phone, no Wi-Fi, and no apps required.
            </p>

            {/* Unboxed Feature Metrics */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400 mb-8 border-y border-slate-800/80 py-3.5">
              <div className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5Gbps Dual USB 3.2</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <div className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1-Button Copy</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <div className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Read-Only Source</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <div className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100GB in ~10 Mins</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <a
                href="#pre-book"
                onClick={onPreBookClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-950/60 hover:shadow-cyan-500/25 transition-all duration-200 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Pre-Book Pass ($1 / ₹99)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#purrfectbackup"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                <span>Standard vs PRO Specs</span>
              </a>

              {onWatchDemo && (
                <button
                  type="button"
                  onClick={onWatchDemo}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <span>Watch Demo</span>
                </button>
              )}
            </div>

            {/* Trust and Outbound Link */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Pre-launch pass: <strong>40% off list price</strong></span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href="https://purrfectbackup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors underline underline-offset-2"
              >
                <span>Official purrfectbackup.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase (Productpage.webp) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center"
          >
            {/* Ambient Backlight Rim */}
            <div className="relative w-full max-w-lg lg:max-w-none group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700" />

              {/* Hardware Frame Container */}
              <div className="relative bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-sm overflow-hidden">
                
                {/* Header bar of hardware preview */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-slate-300">PURRFECTBACKUP DUAL-EDITION</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">STD · PRO (NVME)</span>
                </div>

                {/* Primary Uploaded Product Image */}
                <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-slate-950/70 rounded-xl overflow-hidden border border-slate-800/50">
                  <img
                    src="/Productpage.webp"
                    alt="PurrfectBackup Standard and PRO laptop-free backup devices"
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Interactive Hotspot Trigger Dots */}
                  {hotspots.map((spot) => (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      onMouseEnter={() => setActiveHotspot(spot.id)}
                      className="absolute group/spot p-1 focus:outline-none"
                      style={{ top: spot.top, left: spot.left }}
                      aria-label={`Inspect ${spot.title}`}
                    >
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border border-white/80 shadow-md shadow-cyan-500/80" />
                      </span>
                    </button>
                  ))}

                  {/* Hotspot Floating Tooltip Card */}
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-cyan-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md z-30 pointer-events-auto"
                    >
                      {(() => {
                        const spot = hotspots.find((h) => h.id === activeHotspot);
                        if (!spot) return null;
                        return (
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-cyan-300">{spot.title}</span>
                              <button
                                type="button"
                                onClick={() => setActiveHotspot(null)}
                                className="text-slate-400 hover:text-white text-xs px-1"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-xs text-slate-300 leading-normal">{spot.desc}</p>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </div>

                {/* Sub-label banner */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Standard (Matte Graphite)</span>
                  <span className="font-mono text-cyan-400 text-[11px]">Click nodes to inspect</span>
                  <span>PRO (Titanium Sled)</span>
                </div>
              </div>
            </div>

            {/* Quick Hardware Highlights Cards Below Hero Image */}
            <div className="grid grid-cols-3 gap-2.5 w-full mt-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                <HardDrive className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-semibold text-white">Up to 4TB</div>
                <div className="text-[10px] text-slate-400">Internal NVMe</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                <Zap className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-semibold text-white">5 Gbps</div>
                <div className="text-[10px] text-slate-400">Dual USB 3.2</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                <BatteryCharging className="w-4 h-4 text-sky-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-semibold text-white">20W+ PD</div>
                <div className="text-[10px] text-slate-400">Power Banks</div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
