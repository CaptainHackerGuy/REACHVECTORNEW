import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COUNTRIES } from '../data/countries.ts';
import { Send, CheckCircle2, Sparkles, Copy, Check, Shield } from 'lucide-react';

interface ContactWaitlistProps {
  initialProduct?: string;
}

export const ContactWaitlist: React.FC<ContactWaitlistProps> = ({ initialProduct }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States of America');
  const [productInterest, setProductInterest] = useState(initialProduct || 'PurrfectBackup PRO');
  const [inquiryType, setInquiryType] = useState('Early Access Waitlist (Up to 30% Off)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot

    if (!email || !country) return;

    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      const code = `RV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;
      setReservationCode(code);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Official Ingest & Waitlist Register
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Join the waitlist &amp; get in touch
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Register below to get notified when <strong>PurrfectBackup</strong> is released and receive{' '}
            <span className="text-cyan-400 font-semibold underline decoration-cyan-500/40">
              future launch discounts up to 30%
            </span>
            .
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Registration Confirmed!
              </h3>
              
              <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{fullName || 'Creator'}</strong>. You are enrolled on the ReachVector Priority Registry for <strong className="text-cyan-300">{productInterest}</strong>.
              </p>

              {/* VIP Code Voucher Box */}
              <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-5 w-full max-w-md mb-8 text-left">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono text-cyan-400 font-semibold uppercase">Early Access Pass Code</span>
                  <span className="text-emerald-400 font-medium">30% Tier Activated</span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
                  <span className="font-mono text-base font-bold text-white tracking-widest">
                    {reservationCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  A verification email has been recorded for <strong className="text-slate-200">{email}</strong>. We will notify you the moment production batch shipments commence.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-medium text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Invisible Honeypot Field */}
              <div style={{ position: 'absolute', overflow: 'hidden', height: '1px', width: '1px', zIndex: -1000, padding: 0 }}>
                <label htmlFor="country_email_trap" aria-hidden="true">Country Email</label>
                <input
                  type="text"
                  id="country_email_trap"
                  name="country_email_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Grid 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@studio.com"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Grid 2: Country & Product Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="country" className="block text-xs font-semibold text-slate-300 mb-2">
                    Country <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    id="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-slate-950 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="productInterest" className="block text-xs font-semibold text-slate-300 mb-2">
                    Product Preference
                  </label>
                  <select
                    id="productInterest"
                    value={productInterest}
                    onChange={(e) => setProductInterest(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  >
                    <optgroup label="PurrfectBackup Flagship">
                      <option value="PurrfectBackup PRO">PurrfectBackup PRO (Internal NVMe)</option>
                      <option value="PurrfectBackup Standard">PurrfectBackup Standard (External Storage)</option>
                      <option value="Both Standard & PRO">Both Standard & PRO Editions</option>
                    </optgroup>
                    <optgroup label="Future ReachVector Hardware">
                      <option value="ReachVector Station X1">ReachVector Station X1 (Expedition Hub)</option>
                      <option value="VectorField Drone Hub">VectorField Drone Hub (IP67 Off-Grid)</option>
                      <option value="PurrfectSync Wireless Bridge">PurrfectSync Wireless Bridge</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Inquiry Type Radio / Segment */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    'Early Access Waitlist (Up to 30% Off)',
                    'Enterprise & Fleet Orders',
                    'Technical & Press Questions',
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setInquiryType(type)}
                      className={`px-3 py-2.5 rounded-lg border text-left font-medium transition-all ${
                        inquiryType === type
                          ? 'bg-cyan-950/60 border-cyan-500/70 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Use Case */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-2">
                  Camera Kit / Special Notes <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Sony FX3 & RED Komodo shooter looking to back up CFexpress Type A/B on documentary shoots in Iceland..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                />
              </div>

              {/* Anti-spam & Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-cyan-500/70 shrink-0" />
                  <span>Encrypted submission. Zero spam policy.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/60 transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Waitlist Registration</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
