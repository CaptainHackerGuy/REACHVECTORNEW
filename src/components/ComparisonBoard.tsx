import React from 'react';
import { motion } from 'motion/react';
import { Check, Minus } from 'lucide-react';

export const ComparisonBoard: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'No laptop required',
      pb: true,
      gnar: true,
      nexto: true,
      dji: true,
      others: true,
    },
    {
      feature: 'No phone or app needed',
      pb: true,
      gnar: false,
      nexto: true,
      dji: true,
      others: false,
    },
    {
      feature: 'No internet or Wi-Fi required',
      pb: true,
      gnar: false,
      nexto: true,
      dji: true,
      others: false,
    },
    {
      feature: 'One-button direct copy',
      pb: true,
      gnar: false,
      nexto: true,
      dji: true,
      others: false,
    },
    {
      feature: 'Use your own SSD / M.2 NVMe',
      pb: true,
      gnar: false,
      nexto: false,
      dji: false,
      others: false,
    },
    {
      feature: 'SD / CFexpress / CFast / MicroSD*',
      pb: true,
      gnar: false,
      nexto: false,
      dji: false,
      others: false,
    },
    {
      feature: 'Organize backups automatically by date',
      pb: true,
      gnar: false,
      nexto: false,
      dji: false,
      others: false,
    },
    {
      feature: 'Hardware history & checksum verification',
      pb: true,
      gnar: true,
      nexto: false,
      dji: false,
      others: false,
    },
  ];

  return (
    <section id="comparison" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Market Landscape
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            How <span className="text-cyan-400">PurrfectBackup</span> compares
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A simpler, reliable way to back up photos and videos directly in the field.
          </p>
        </div>

        {/* Comparison Board Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              
              {/* Header Row */}
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase font-mono tracking-wider">
                  <th className="py-5 px-6 font-bold text-slate-400 w-1/3">Key Feature</th>
                  <th className="py-5 px-4 font-bold text-cyan-400 bg-cyan-950/30 border-x border-cyan-500/20 text-center relative">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-extrabold text-white">PurrfectBackup</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Available Now
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-4 font-medium text-slate-500 text-center">
                    <span className="line-through decoration-slate-600">GNARBOX</span>
                    <span className="block text-[10px] text-slate-600 font-mono mt-0.5">Discontinued</span>
                  </th>
                  <th className="py-5 px-4 font-medium text-slate-500 text-center">
                    <span className="line-through decoration-slate-600">NextoDI</span>
                    <span className="block text-[10px] text-slate-600 font-mono mt-0.5">Discontinued</span>
                  </th>
                  <th className="py-5 px-4 font-medium text-slate-500 text-center">
                    <span className="line-through decoration-slate-600">DJI Copilot</span>
                    <span className="block text-[10px] text-slate-600 font-mono mt-0.5">Discontinued</span>
                  </th>
                  <th className="py-5 px-4 font-medium text-slate-500 text-center">
                    <span className="line-through decoration-slate-600">Others</span>
                    <span className="block text-[10px] text-slate-600 font-mono mt-0.5">Discontinued</span>
                  </th>
                </tr>
              </thead>

              {/* Body Rows */}
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-800/30 transition-colors">
                    
                    {/* Feature Label */}
                    <td className="py-4 px-6 font-medium text-slate-200 text-sm">
                      {row.feature}
                    </td>

                    {/* PurrfectBackup Col */}
                    <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20 text-center">
                      <div className="flex items-center justify-center">
                        <span className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold shadow-sm shadow-cyan-500/30">
                          <Check className="w-4 h-4 text-cyan-300" />
                        </span>
                      </div>
                    </td>

                    {/* GNARBOX */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {row.gnar ? (
                          <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </div>
                    </td>

                    {/* NextoDI */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {row.nexto ? (
                          <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </div>
                    </td>

                    {/* DJI Copilot */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {row.dji ? (
                          <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </div>
                    </td>

                    {/* Others */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {row.others ? (
                          <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </div>
                    </td>

                  </tr>
                ))}

                {/* Final Summary Row */}
                <tr className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 font-bold border-t-2 border-slate-700">
                  <td className="py-4 px-6 text-white uppercase font-mono text-xs">
                    Verdict
                  </td>
                  <td className="py-4 px-4 bg-cyan-950/40 border-x border-cyan-500/30 text-center text-cyan-300 font-bold text-xs tracking-wide">
                    ✓ Available & Supported
                  </td>
                  <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
                    Dead
                  </td>
                  <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
                    Dead
                  </td>
                  <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
                    Dead
                  </td>
                  <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
                    Dead
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
            <span>* Compatible camera media connects via standard USB multi-card readers.</span>
            <span className="font-mono text-[11px] text-cyan-400">PurrfectBackup: Active Firmware Roadmap</span>
          </div>
        </div>

      </div>
    </section>
  );
};
