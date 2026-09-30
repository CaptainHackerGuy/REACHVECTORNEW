import React from 'react';

interface CompanyAboutProps {
  onOpenTerms?: () => void;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = () => {
  return (
    <section id="about" className="py-12 md:py-16 bg-[#fafbfc] border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-5">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
            About
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Small team. Fewer, sharper products.
          </h2>
        </div>

        {/* Engineering Hardware Architecture Showcase (Compact single-screen fitted banner) */}
        <div className="relative w-full max-h-[220px] sm:max-h-[260px] md:max-h-[280px] aspect-[2.36/1] bg-white border border-slate-200/90 rounded-2xl mb-6 overflow-hidden shadow-xs">
          <img
            src="/assets/about-hardware-pb.jpeg"
            alt="ReachVector Intelligence PurrfectBackup hardware architecture"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/about-hardware-pb.png';
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />

          {/* Minimal Persistent Engineering Badge */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200/80 shadow-xs text-[11px] sm:text-xs font-mono text-slate-700">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-900">PurrfectBackup Hardware Architecture</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="hidden sm:inline text-slate-500">Dual USB · OLED Matrix · Custom PCB</span>
          </div>
        </div>

        {/* About Copy Narrative */}
        <div className="max-w-3xl space-y-2 text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          <p>
            ReachVector Intelligence designs and builds products for people who need dependable tools — starting with hardware, and extending into AI-powered software.
          </p>
          <p>
            We start with a specific, well-understood problem, then engineer the smallest, most considered solution for it. That's meant hardware first — like PurrfectBackup — and it's now extending to AI-based software for tasks like identifying, sorting, and processing photos.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
          {/* Principle 1: DIR */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 tracking-wider">
                DIR
              </span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">Direction</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We choose one problem at a time and go deep, instead of spreading across categories.
            </p>
          </div>

          {/* Principle 2: MAG */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 tracking-wider">
                MAG
              </span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">Magnitude</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Built to hold up under real, repeated use — whether that's a device in the field or software people rely on daily.
            </p>
          </div>

          {/* Principle 3: INT */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 tracking-wider">
                INT
              </span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">Intelligence</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Considered engineering over feature count. Fewer decisions left for the user to make.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
