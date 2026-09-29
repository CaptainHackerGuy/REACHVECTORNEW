import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Bell, Radio, Layers, HardDriveDownload, Sparkles, Check } from 'lucide-react';

interface RoadmapProps {
  onSelectProductForWaitlist?: (productName: string) => void;
}

export const RoadmapComingSoon: React.FC<RoadmapProps> = ({ onSelectProductForWaitlist }) => {
  const [subscribedProducts, setSubscribedProducts] = useState<string[]>([]);

  const futureProducts = [
    {
      id: 'station-x1',
      name: 'ReachVector Station X1',
      edition: 'Cinema & Multi-Camera Expedition Hub',
      timeline: 'Target Release: Q1 2027',
      status: 'In Hardware Prototyping',
      description:
        'A high-throughput 4-channel card ingest station featuring dual internal PCIe Gen 5 NVMe RAID mirrors, 10GbE fiber output, and hot-swap battery bays for multi-camera cinema crews (RED, ARRI, Sony FX9).',
      highlights: [
        '4× Simultaneous CFexpress Type B & SD Slots',
        'Dual PCIe 5.0 NVMe RAID 1 Mirrored Ingest',
        'Direct 10GbE NAS uplink or standalone operation',
        'V-Mount & Gold-Mount battery plate adapters',
      ],
      icon: Layers,
      accent: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'vector-field-hub',
      name: 'VectorField Drone Hub',
      edition: 'Weather-Sealed Automated Drop Storage',
      timeline: 'Target Release: Q2 2027',
      status: 'Thermal & Enclosure Validation',
      description:
        'An IP67 ruggedized field drop-box specifically engineered for drone pilots and aerial surveyors. Insert full microSD/CFexpress media, and it automatically triggers parity backups into dual encrypted drives.',
      highlights: [
        'IP67 Dust, Rain & Sand Sealed Enclosure',
        'Dual Independent Encrypted Offload Targets',
        'Integrated solar & 12V vehicle charging circuitry',
        'OLED environmental & telemetry sensor display',
      ],
      icon: HardDriveDownload,
      accent: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'purrfect-sync-bridge',
      name: 'PurrfectSync Wireless Bridge',
      edition: 'Zero-Latency Wi-Fi 6E Camera Tether Module',
      timeline: 'Target Release: Q3 2027',
      status: 'RF Engineering Phase',
      description:
        'A snap-on wireless transceiver module designed exclusively for PurrfectBackup PRO. Enables direct camera-to-PurrfectBackup wireless offloading over high-bandwidth ad-hoc Wi-Fi 6E as you shoot in real-time.',
      highlights: [
        '2.4Gbps Ultra-Low Latency Wi-Fi 6E Stream',
        'Magnetic pogo-pin dock for PurrfectBackup PRO',
        'Automatic background ingest between shutter bursts',
        '100m Line-of-sight transmitter range',
      ],
      icon: Radio,
      accent: 'from-emerald-500 to-teal-500',
    },
  ];

  const handleNotify = (productName: string) => {
    if (!subscribedProducts.includes(productName)) {
      setSubscribedProducts([...subscribedProducts, productName]);
    }
    if (onSelectProductForWaitlist) {
      onSelectProductForWaitlist(productName);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Hardware Engineering Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Coming Soon from <span className="text-cyan-400">ReachVector</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            PurrfectBackup is our first breakthrough release. Explore the upcoming rugged field hardware instruments currently undergoing rapid engineering and thermal testing in our labs.
          </p>
        </div>

        {/* 3 Future Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {futureProducts.map((prod, idx) => {
            const Icon = prod.icon;
            const isSubscribed = subscribedProducts.includes(prod.name);

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
              >
                {/* Subtle Glow Top Edge */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prod.accent}`} />

                <div>
                  {/* Top Status & Timeline */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
                    <span className="text-cyan-400 font-semibold">{prod.timeline}</span>
                    <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {prod.status}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-400">{prod.edition}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {prod.description}
                  </p>

                  {/* Key Architecture Bullets */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-900 text-xs text-slate-300">
                    {prod.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">·</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Notify Action */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleNotify(prod.name)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isSubscribed
                        ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white shadow-sm'
                    }`}
                  >
                    {isSubscribed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pre-Selected for Early Ingest</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Notify Me At Prototype Stage</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
