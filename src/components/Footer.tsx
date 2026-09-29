import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { Mail, MapPin, ExternalLink, ArrowUp, Check, Copy } from 'lucide-react';
import { YouTubeIcon, InstagramIcon, XIcon, GlobeIcon, VideoDemoIcon } from './SocialIcons.tsx';

interface FooterProps {
  onOpenTerms?: (tab?: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@reachvector.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Team Narrative */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="inline-block" aria-label="ReachVector Intelligence Home">
              <Logo size="md" theme="light" />
            </a>

            <div className="text-slate-600 leading-relaxed text-xs sm:text-sm max-w-sm space-y-3">
              <p>
                We're a small team, and we like it that way. Every product starts with us actually understanding the problem — talking to the people who'll use it, not just guessing at features.
              </p>
              <p>
                PurrfectBackup came out of watching photographers run out of laptop battery in the field. Our next project, currently in development, comes from the same place — watching wildlife photographers spend hours manually sorting thousands of images after a single shoot.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href="mailto:contact@reachvector.in" className="hover:text-slate-900 font-medium text-slate-800 transition-colors">
                  contact@reachvector.in
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-600">
                  #38, Bellandur, Bengaluru, Karnataka 560103, India
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Company Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3.5">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#company" className="hover:text-slate-950 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-slate-950 transition-colors">
                  About ReachVector
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-slate-950 transition-colors">
                  Products Portfolio
                </a>
              </li>
              <li>
                <a href="#partnerships" className="hover:text-slate-950 transition-colors">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-950 transition-colors">
                  Contact &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: PurrfectBackup Outbound Portal & Socials with Authentic Colors */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3.5">
              PurrfectBackup
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://purrfectbackup.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-slate-950 transition-colors font-medium text-slate-800 group"
                >
                  <GlobeIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@PurrfectBackup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-slate-950 transition-colors text-slate-700"
                >
                  <YouTubeIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>YouTube Channel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/purrfectbackup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-slate-950 transition-colors text-slate-700"
                >
                  <XIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/purrfectbackup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-slate-950 transition-colors text-slate-700"
                >
                  <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://purrfectbackup.com/purrfectbackup-videos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-slate-950 transition-colors text-slate-700"
                >
                  <VideoDemoIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Field Demonstrations</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Legal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3.5">
              Policies &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenTerms && onOpenTerms('terms')}
                  className="hover:text-slate-950 transition-colors text-left cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenTerms && onOpenTerms('privacy')}
                  className="hover:text-slate-950 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center md:text-left">
            <span>© 2026 ReachVector Intelligence. All rights reserved.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium active:scale-95 cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
