import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COUNTRIES } from '../data/countries.ts';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, AlertCircle, Loader2 } from 'lucide-react';

export const CompanyContact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [inquiryType, setInquiryType] = useState('General Company Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🚀 [ReachVector Contact] "Send Message" triggered.');
    console.log('Form State:', { fullName, email, country, inquiryType, messageLength: message.length });

    // Validation
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      console.warn('⚠️ Validation failed: Missing full name');
      setStatusMessage({ type: 'error', text: 'Please enter your full name.' });
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      console.warn('⚠️ Validation failed: Invalid email address', trimmedEmail);
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address (e.g. name@domain.com).' });
      return;
    }

    if (!trimmedMessage) {
      console.warn('⚠️ Validation failed: Missing message');
      setStatusMessage({ type: 'error', text: 'Please enter a message or description of your inquiry.' });
      return;
    }

    setStatusMessage(null);
    setIsSubmitting(true);

    const generatedCode = `RV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;
    console.log('Generated Reference Code:', generatedCode);

    try {
      console.log('Sending POST request to /api/contact...');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: trimmedName,
          email: trimmedEmail,
          country,
          inquiryType,
          message: trimmedMessage,
          code: generatedCode,
        }),
      });

      console.log('HTTP Response Status:', res.status, res.statusText);
      const data = await res.json().catch((err) => {
        console.warn('Could not parse JSON response from /api/contact:', err);
        return null;
      });

      console.log('Server Payload:', data);

      if (res.ok && (data?.success || data?.status === 'ok')) {
        console.log('✅ Submission successful! Transitioning to confirmation view.');
        setReservationCode(data.referenceCode || generatedCode);
        setSubmitted(true);
      } else {
        const errorText = data?.error || data?.message || 'Unable to process inquiry at this moment.';
        console.error('❌ Server returned failure:', errorText);
        setStatusMessage({
          type: 'error',
          text: `${errorText} If this persists, write to contact@reachvector.in.`,
        });
      }
    } catch (networkError: any) {
      console.error('❌ Network error submitting form:', networkError);
      setStatusMessage({
        type: 'error',
        text: 'Network connection error. Please check your internet or email contact@reachvector.in directly.',
      });
    } finally {
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

  const handleReset = () => {
    setSubmitted(false);
    setStatusMessage(null);
    setMessage('');
    console.log('[ReachVector Contact] Form reset for new submission.');
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
                <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{fullName || 'Inquirer'}</strong>. Your message regarding <strong className="text-slate-900">{inquiryType}</strong> has been received by the ReachVector Intelligence team.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full max-w-sm mb-6 text-left">
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

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {statusMessage && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                      statusMessage.type === 'error'
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {statusMessage.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed font-medium">{statusMessage.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="fEmail" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="fEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fCountry" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Country / Region
                    </label>
                    <select
                      id="fCountry"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fInquiry" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Inquiry Topic
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
                    Message <span className="text-rose-500">*</span>
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
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
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
