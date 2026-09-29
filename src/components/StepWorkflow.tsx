import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plug, HardDrive, Play, CheckCircle2, RotateCcw } from 'lucide-react';

export const StepWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [simState, setSimState] = useState<'idle' | 'copying' | 'verifying' | 'done'>('idle');
  const [simProgress, setSimProgress] = useState(0);
  const [simMode, setSimMode] = useState<'dated' | 'just'>('dated');

  const steps = [
    {
      num: '01',
      title: 'Power on',
      desc: 'Plug in any standard 20W+ USB-C power bank or the supplied 27W high-efficiency wall adapter.',
      image: '/assets/step-01.png',
      badge: 'USB-C Power Delivery',
      icon: Plug,
    },
    {
      num: '02',
      title: 'Connect',
      desc: 'Insert your multi-card reader (SD, CFexpress, microSD) into Port A, and target SSD/HDD into Port B.',
      image: '/assets/step-02.png',
      badge: 'Dual 5Gbps High-Speed I/O',
      icon: HardDrive,
    },
    {
      num: '03',
      title: 'Copy',
      desc: 'The OLED screen displays connected drives. Tap joystick down for Dated Copy or up for Just Copy. ~100GB in ~10 mins.',
      image: '/assets/step-03.png',
      badge: 'Autonomous Dual Engine',
      icon: Play,
    },
    {
      num: '04',
      title: 'Verify',
      desc: 'Files are automatically SHA-validated. A green checkmark confirms complete data parity and drives unmount safely.',
      image: '/assets/step-04.png',
      badge: 'Zero Bit-Rot Parity',
      icon: CheckCircle2,
    },
  ];

  // Simulator timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simState === 'copying') {
      interval = setInterval(() => {
        setSimProgress((prev) => {
          if (prev >= 90) {
            setSimState('verifying');
            return 95;
          }
          return prev + 6;
        });
      }, 140);
    } else if (simState === 'verifying') {
      interval = setInterval(() => {
        setSimProgress((prev) => {
          if (prev >= 100) {
            setSimState('done');
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [simState]);

  const startSimulation = (mode: 'dated' | 'just') => {
    setSimMode(mode);
    setSimProgress(0);
    setSimState('copying');
  };

  const resetSimulation = () => {
    setSimState('idle');
    setSimProgress(0);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Tactile Four-Step Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Four steps to absolute{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              card peace of mind.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No complex terminal commands or app configuration. Just plug, press, and get back to shooting.
          </p>
        </div>

        {/* 4 Interactive Step Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-xl font-extrabold ${
                        isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-400'
                      }`}
                    >
                      {step.num}.
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400/90 uppercase tracking-wider">
                  {step.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Display & OLED Simulator Showcase */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Step Illustration */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full relative aspect-[16/9] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 shadow-inner flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="max-h-full max-w-full object-contain"
                  />
                </AnimatePresence>
                
                <div className="absolute top-3 left-4 font-mono text-xs text-cyan-400 bg-slate-900/90 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  STEP {steps[activeStep].num} / 04
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between w-full px-2 text-xs text-slate-400">
                <span>Selected: <strong>{steps[activeStep].title}</strong></span>
                <span className="font-mono text-slate-500">Autonomous Linux SoC</span>
              </div>
            </div>

            {/* Interactive Hardware OLED Simulator */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-mono font-semibold text-slate-300">
                      LIVE HARDWARE OLED SIMULATOR
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">128 × 64 PIXELS</span>
                </div>

                {/* The Simulated Glowing OLED Screen */}
                <div className="bg-black border-2 border-slate-800 rounded-xl p-5 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] font-mono text-cyan-400 relative overflow-hidden min-h-[170px] flex flex-col justify-between">
                  {/* Subtle Scanline Texture */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

                  {simState === 'idle' && (
                    <div className="space-y-3 z-10">
                      <div className="flex items-center justify-between text-xs border-b border-cyan-900/60 pb-1.5">
                        <span className="text-cyan-300 font-bold">PURRFECTBACKUP</span>
                        <span className="text-[10px] text-cyan-500">BAT: 98% ⚡</span>
                      </div>
                      
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">SRC:</span>
                          <span className="text-white">CFexpress (128GB)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">DST:</span>
                          <span className="text-white">NVMe Samsung 990 (2TB)</span>
                        </div>
                      </div>

                      <div className="pt-2 text-[11px] text-center text-cyan-200 animate-pulse bg-cyan-950/40 py-1.5 rounded border border-cyan-800/40">
                        [TAP JOYSTICK TO START]
                      </div>
                    </div>
                  )}

                  {simState === 'copying' && (
                    <div className="space-y-2.5 z-10">
                      <div className="flex items-center justify-between text-xs border-b border-cyan-900/60 pb-1">
                        <span className="font-bold text-white uppercase">{simMode} COPY...</span>
                        <span className="text-cyan-300 font-mono text-xs">{simProgress}%</span>
                      </div>

                      <div className="w-full bg-cyan-950/80 rounded h-3 overflow-hidden border border-cyan-800/60">
                        <div
                          className="bg-cyan-400 h-full transition-all duration-150 shadow-[0_0_10px_#22d3ee]"
                          style={{ width: `${simProgress}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-300">
                        <div>
                          <span className="text-slate-500 block text-[9px]">SPEED</span>
                          <span className="text-emerald-400 font-bold">164.2 MB/s</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">FILES</span>
                          <span>{Math.round((simProgress / 100) * 842)} / 842</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {simState === 'verifying' && (
                    <div className="space-y-3 z-10 text-center py-2">
                      <div className="text-xs text-amber-300 font-bold tracking-widest animate-pulse">
                        VALIDATING PARITY CHECKSUMS...
                      </div>
                      <div className="text-[11px] text-slate-300">
                        SHA-256 verifying 842 RAW frames against source
                      </div>
                      <div className="w-full bg-cyan-950 rounded h-2 overflow-hidden">
                        <div className="bg-amber-400 h-full w-full animate-pulse" />
                      </div>
                    </div>
                  )}

                  {simState === 'done' && (
                    <div className="space-y-2.5 z-10 text-center py-1">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>BACKUP VERIFIED 100%</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        842 / 842 Files Validated (96.4 GB)
                        <br />
                        <span className="text-emerald-400 font-semibold">✓ SAFE TO EJECT STORAGE</span>
                      </p>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-cyan-900/40">
                        Total duration: 9 mins 48 secs
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hardware JoyStick & Mode Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startSimulation('dated')}
                    disabled={simState === 'copying' || simState === 'verifying'}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-all shadow-md shadow-cyan-950"
                  >
                    Simulate: Dated Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => startSimulation('just')}
                    disabled={simState === 'copying' || simState === 'verifying'}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 transition-all"
                  >
                    Simulate: Just Copy
                  </button>
                </div>

                {simState !== 'idle' && (
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
