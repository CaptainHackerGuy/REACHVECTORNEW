import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COUNTRIES } from '../data/countries.ts';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export const CompanyContact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States of America');
  const [inquiryType, setInquiryType] = useState('General Company Inquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<{
    customerSent?: boolean;
    teamSent?: boolean;
    error?: string;
    logs?: string[];
  } | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trap

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const generatedCode = `RV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;

    console.group('📨 [ReachVector] Submitting Inquiry');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Reference Code:', generatedCode);
    console.log('Sender:', fullName, `<${email}>`);
    console.log('Topic:', inquiryType);
    console.log('Destination:', '/api/contact');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          country,
          inquiryType,
          message,
          code: generatedCode,
        }),
      });

      console.log('HTTP Status:', res.status, res.statusText);
      const data = await res.json().catch((parseErr) => {
        console.warn('Could not parse response as JSON:', parseErr);
        return null;
      });

      console.log('API Response:', data);

      if (data?.logs && Array.isArray(data.logs)) {
        console.group('📋 [SMTP Server Logs]');
        data.logs.forEach((line: string) => console.log(line));
        console.groupEnd();
      }

      if (data?.error) {
        console.warn('⚠️ SMTP Result Note:', data.error);
      }

      setDeliveryStatus({
        customerSent: data?.customerEmailSent,
        teamSent: data?.teamEmailSent,
        error: data?.error,
        logs: data?.logs,
      });

      setReservationCode(data?.referenceCode || generatedCode);
      setSubmitted(true);
    } catch (err: any) {
      console.error('❌ Network error contacting /api/contact:', err);
      setDeliveryStatus({
        customerSent: false,
        teamSent: false,
        error: err?.message || 'Network unreachable',
      });
      setReservationCode(generatedCode);
      setSubmitted(true);
    } finally {
      console.groupEnd();
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@reachvector.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('38 Bellandur, Bengaluru, Karnataka, India - 560103');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fafbfc] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Contact &amp; Inquiries
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Reach out to ReachVector Intelligence for inquiries, questions, or collaborations. For direct correspondence, email us at <strong className="text-slate-900">contact@reachvector.in</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Company Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Direct Inquiries
                </h3>
                <span className="text-xs text-slate-500">
                  ReachVector Intelligence Team
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-slate-500 text-xs block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <a href="mailto:contact@reachvector.in" className="font-semibold text-slate-900 hover:text-cyan-700 transition-colors">
                        contact@reachvector.in
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title="Copy email"
                        aria-label="Copy email"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-slate-500 text-xs block">Location</span>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-slate-800 leading-snug">
                        #38, Bellandur<br />
                        Bengaluru, Karnataka 560103<br />
                        India
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors mt-0.5 shrink-0 cursor-pointer"
                        title="Copy address"
                        aria-label="Copy address"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Registration Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent</h3>
                <p className="text-sm text-slate-600 max-w-md mb-6">
                  Thank you, <strong className="text-slate-900">{fullName || 'Inquirer'}</strong>. Our team has received your communication regarding <strong className="text-slate-900">{inquiryType}</strong>.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full max-w-sm mb-4 text-left">
                  <div className="text-[11px] font-mono text-slate-500 uppercase mb-1">Inquiry Reference Number</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-bold text-slate-900">{reservationCode}</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 text-xs font-medium rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Email Delivery Diagnostics Box */}
                <div className="w-full max-w-sm mb-6 text-left space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Customer Receipt:</span>
                      <span className={deliveryStatus?.customerSent ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                        {deliveryStatus?.customerSent ? 'Dispatched' : 'Queued / Host Notice'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Team Delivery:</span>
                      <span className={deliveryStatus?.teamSent ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                        {deliveryStatus?.teamSent ? 'Delivered' : 'Queued for Team'}
                      </span>
                    </div>
                  </div>

                  {/* Direct Mail Client Fallback */}
                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      href={`mailto:contact@reachvector.in?subject=${encodeURIComponent(`[${reservationCode}] ${inquiryType} - ${fullName}`)}&body=${encodeURIComponent(`Inquiry Reference: ${reservationCode}\nName: ${fullName}\nEmail: ${email}\nCountry: ${country}\nTopic: ${inquiryType}\n\n${message}`)}`}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-950 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Pre-filled Email in Mail App</span>
                    </a>

                    {deliveryStatus?.logs && deliveryStatus.logs.length > 0 && (
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowDiagnostics(!showDiagnostics)}
                          className="text-[11px] text-slate-500 hover:text-slate-800 underline block mx-auto cursor-pointer"
                        >
                          {showDiagnostics ? 'Hide Server Console Logs' : 'View Server Console Logs'}
                        </button>
                        {showDiagnostics && (
                          <div className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-lg text-[10px] font-mono overflow-x-auto max-h-40 text-left space-y-1">
                            {deliveryStatus.logs.map((logLine, idx) => (
                              <div key={idx} className="leading-tight">{logLine}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot trap */}
                <div style={{ position: 'absolute', overflow: 'hidden', height: '1px', width: '1px', zIndex: -1000, padding: 0 }}>
                  <label htmlFor="comp_trap" aria-hidden="true">Country Email</label>
                  <input
                    type="text"
                    id="comp_trap"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="fEmail" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="fEmail"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@reachvector.in"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fCountry" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Country / Region <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="fCountry"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fInquiry" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      id="fInquiry"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    >
                      <option value="General Company Inquiry">General Company Inquiry</option>
                      <option value="PurrfectBackup Order / Pre-Book">PurrfectBackup Order / Pre-Book</option>
                      <option value="Hardware Architecture & Partnerships">Hardware Architecture &amp; Partnerships</option>
                      <option value="Distribution & Fleet Procurement">Distribution &amp; Fleet Procurement</option>
                      <option value="Press & Media Relations">Press &amp; Media Relations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="fMessage" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="fMessage"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, camera kit, fleet, or integration requirements..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500">
                    Direct email: <a href="mailto:contact@reachvector.in" className="underline text-slate-700 hover:text-slate-900 font-medium">contact@reachvector.in</a>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50 active:scale-95"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};