import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Clock, 
  Maximize2,
  X,
  CheckCircle2
} from 'lucide-react';
import { 
  YouTubeIcon, 
  InstagramIcon, 
  XIcon, 
  GlobeIcon, 
  VideoDemoIcon 
} from './SocialIcons.tsx';

interface ProductsSectionProps {
  onPreBookSelect?: (model: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'purrfectbackup' | 'coming-soon'>('purrfectbackup');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const purrfectBackupSocials = [
    {
      name: 'Official Website',
      href: 'https://purrfectbackup.com/',
      icon: GlobeIcon,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@PurrfectBackup',
      icon: YouTubeIcon,
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/purrfectbackup',
      icon: XIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/purrfectbackup',
      icon: InstagramIcon,
    },
    {
      name: 'Field Demos',
      href: 'https://purrfectbackup.com/purrfectbackup-videos/',
      icon: VideoDemoIcon,
    },
  ];

  const features = [
    '100% offline backup — no laptop, computer, app, or internet connection required',
    'Direct connection: plug in your card reader and external drive (or internal NVMe in PRO) to back up',
    'Ultra-fast transfer speeds demonstrated copying ~14GB in approximately one minute',
    'Standard Edition: Direct 1-to-1 card offload to external USB SSDs, hard drives, and flash storage',
    'PRO Edition: Built-in tool-less M.2 2280 NVMe SSD bay supporting internal storage up to 4TB',
    '1.3" OLED screen with tactile 5-way joystick for intuitive, standalone field operation',
    'Strict read-only mounting ensures memory cards are never modified, erased, or corrupted',
    'Dual organizational modes: supports "Just Copy" and timestamped "Dated Copy"',
    'Built-in Real-Time Clock (RTC) ensures accurate offline folder and file timestamps',
    'Optional local WebUI: host local offline Wi-Fi to inspect files and preview photos directly in any browser',
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen && e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section id="products" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Products
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Physical hardware and intelligent computing systems from ReachVector Intelligence LLP.
            </p>
          </div>

          {/* Segmented Tab Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('purrfectbackup')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'purrfectbackup'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              PurrfectBackup
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coming-soon')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'coming-soon'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* ================= TAB 1: PURRFECTBACKUP ================= */}
        {activeTab === 'purrfectbackup' && (
          <div className="bg-[#fafbfc] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs animate-in fade-in duration-300">
            
            {/* Top Product Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  <span>Dedicated Field Hardware</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-emerald-700 font-semibold">Official Product</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  PurrfectBackup
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Pocket-sized, laptop-free autonomous backup for photographers, videographers, and travelers.
                </p>
              </div>

              {/* Official Store & Website Links */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://purrfectbackup.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs active:scale-95"
                >
                  <span>Visit purrfectbackup.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://us.purrfectbackup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors active:scale-95"
                >
                  <span>International Store</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://india.purrfectbackup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors active:scale-95"
                >
                  <span>India Store</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* 2-Column Product Showcase: Single Picture & Comprehensive Both-Editions Description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 items-start">
              
              {/* Left Column: Visual Stage (Single Both-Editions Picture) */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs overflow-hidden group">
                  <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-slate-50/70 rounded-xl overflow-hidden">
                    <img
                      src="/Productpage.webp"
                      alt="PurrfectBackup Standard & PRO Editions"
                      className="w-full h-full object-contain p-2 cursor-pointer transition-transform duration-300 group-hover:scale-102"
                      onClick={() => setLightboxOpen(true)}
                    />

                    {/* Enlarge Button */}
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/95 hover:bg-white text-slate-700 border border-slate-200 shadow-xs text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      aria-label="Enlarge image"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">Click to Enlarge</span>
                    </button>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-500 font-mono text-center">
                    PurrfectBackup Standard and PRO editions.
                  </p>
                </div>
              </div>

              {/* Right Column: Unified Description & Features */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Headline & Overview Description */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                    Both Editions — Standard &amp; PRO Overview
                  </span>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                    PurrfectBackup Standard &amp; PRO
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    A dedicated portable backup device for photographers, videographers, travelers, and content creators. Offload SD cards, microSD, CFexpress, and CFast cards directly to storage without a laptop, computer, or phone.
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                    Key Capabilities &amp; Design
                  </span>
                  <div className="space-y-2.5">
                    {features.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Card Footer: Social & Media Channels with Official Brand Colors */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-mono">
                Official Channels &amp; Community:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {purrfectBackupSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300 text-xs transition-colors active:scale-95 shadow-2xs"
                      title={`Follow PurrfectBackup on ${social.name}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: COMING SOON ================= */}
        {activeTab === 'coming-soon' && (
          <div className="bg-[#fafbfc] border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-2">
              ReachVector Hardware Pipeline
            </span>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
              Coming Soon
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
              More products will be announced as our engineering roadmap progresses. For partnership inquiries or product announcements, reach out to our team at{' '}
              <a href="mailto:contact@reachvector.in" className="text-slate-900 font-semibold underline hover:text-cyan-700">
                contact@reachvector.in
              </a>.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors active:scale-95"
            >
              Contact Us
            </a>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar with Title and Close Button */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-10">
            <div className="text-white">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Hardware Inspection
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                PurrfectBackup Standard &amp; PRO
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image */}
          <div className="max-w-4xl max-h-[80vh] p-2 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src="/Productpage.webp" 
              alt="PurrfectBackup Standard & PRO" 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl drop-shadow-2xl select-none" 
            />
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-4 sm:bottom-6 text-center text-xs text-slate-400 font-mono">
            Press Esc or click anywhere to exit
          </div>
        </div>
      )}
    </section>
  );
};
