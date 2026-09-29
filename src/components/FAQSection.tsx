import React, { useState } from 'react';
import { FAQS, KNOWLEDGE_ARTICLES } from '../data/faq.ts';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('how-it-works');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  return (
    <section className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Knowledge Articles Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Field Guides &amp; Documentation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Technical Guides &amp; Knowledge Base
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Deep dive into off-grid media workflows, file verification hashing, and hardware calibration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KNOWLEDGE_ARTICLES.map((article) => (
              <a
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
                    <span className="font-semibold">{article.tag}</span>
                    <span className="text-slate-500">{article.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Read Article</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://purrfectbackup.com/pb-kb/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-medium transition-all"
            >
              <span>Explore All PurrfectBackup Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-slate-900">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              Quick Answers
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Everything you need to know about PurrfectBackup hardware, speed, and operation.
            </p>

            {/* Filter buttons */}
            <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'general', label: 'General' },
                { id: 'performance', label: 'Speed & Data' },
                { id: 'hardware', label: 'Hardware' },
                { id: 'workflow', label: 'Workflow' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setActiveCategory(btn.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === btn.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion list */}
          <div className="space-y-3.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-md bg-slate-800 text-cyan-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://purrfectbackup.com/faq/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-400 hover:text-cyan-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
            >
              <span>View additional FAQs on official documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
