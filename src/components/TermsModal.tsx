import React, { useState } from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'terms'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'privacy'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Privacy Policy
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeTab === 'terms' ? (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">ReachVector Intelligence — Terms &amp; Conditions</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>Effective Date: September 2026</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Acceptance of Terms</h4>
                <p className="text-slate-600">
                  By accessing the ReachVector Intelligence website or ordering hardware devices (including PurrfectBackup), you agree to be bound by these Terms of Service and applicable commercial regulations.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Hardware Pre-Orders &amp; Reservations</h4>
                <p className="text-slate-600">
                  Early access passes ($1 USD / ₹99 INR) constitute refundable reservations for priority production allocations. Final retail prices are billed only upon verified dispatch. You may request a full cancellation and refund of your reservation deposit at any time prior to shipping by emailing <a href="mailto:contact@reachvector.in" className="text-slate-900 underline font-medium">contact@reachvector.in</a>.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Warranty &amp; Hardware Liability</h4>
                <p className="text-slate-600">
                  ReachVector Intelligence warrants that our physical hardware units are free from manufacturing defects for a period of one (1) full year from the date of receipt. Because storage memory cards and third-party host drives are manufactured independently, creators are advised to maintain verified dual backups according to industry standard procedures.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. Notices &amp; Correspondence</h4>
                <p className="text-slate-600">
                  ReachVector Intelligence<br />
                  #38, Bellandur, Bengaluru, Karnataka 560103, India<br />
                  Direct correspondence: <a href="mailto:contact@reachvector.in" className="text-slate-900 underline font-medium">contact@reachvector.in</a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">ReachVector Intelligence — Privacy Policy</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>Effective Date: September 2026</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Zero Telemetry &amp; Offline Privacy Commitment</h4>
                <p className="text-slate-600">
                  ReachVector devices, including PurrfectBackup, do not collect, transmit, or store personal telemetry, photo metadata, or file manifests back to ReachVector servers. All card copying is performed 100% locally on the device’s internal hardware.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Website Inquiries &amp; Order Data</h4>
                <p className="text-slate-600">
                  When you submit an inquiry or pre-order reservation through our site, we collect your name, email address, country, and kit notes exclusively to provide order status updates and customer support. We never sell, rent, or lease your personal information to third-party advertisers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Data Retention &amp; Erasure</h4>
                <p className="text-slate-600">
                  You may request complete deletion of your registration details or inquiry history at any time by contacting our privacy compliance desk at <a href="mailto:contact@reachvector.in" className="text-slate-900 underline font-medium">contact@reachvector.in</a>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>ReachVector Intelligence</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
