import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface CompanyAboutProps {
  onOpenTerms?: () => void;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#fafbfc] border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2.5 block">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Small team. Fewer, sharper products.
          </h2>
        </div>

        {/* Engineering Workspace Image Placeholder */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[2.6/1] bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 mb-10 overflow-hidden transition-colors hover:border-slate-400">
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-500">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-slate-700 font-mono tracking-wide">
              Add Image
            </span>
            <span className="text-xs text-slate-500 max-w-sm">
              ReachVector Intelligence hardware engineering workspace
            </span>
          </div>
        </div>

        {/* About Copy Narrative */}
        <div className="max-w-3xl space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed mb-14">
          <p>
            ReachVector Intelligence designs and builds products for people who need dependable tools — starting with hardware, and extending into AI-powered software.
          </p>
          <p>
            We start with a specific, well-understood problem, then engineer the smallest, most considered solution for it. That's meant hardware first — like PurrfectBackup — and it's now extending to AI-based software for tasks like identifying, sorting, and processing photos.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
          {/* Principle 1: DIR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 tracking-wider">
                DIR
              </span>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight">Direction</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We choose one problem at a time and go deep, instead of spreading across categories.
            </p>
          </div>

          {/* Principle 2: MAG */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 tracking-wider">
                MAG
              </span>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight">Magnitude</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built to hold up under real, repeated use — whether that's a device in the field or software people rely on daily.
            </p>
          </div>

          {/* Principle 3: INT */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 tracking-wider">
                INT
              </span>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight">Intelligence</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Considered engineering over feature count. Fewer decisions left for the user to make.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
