"use client";

import { TERMS_INTRO, TERMS_LAST_UPDATED, TERMS_SECTIONS } from '@/lib/terms-content';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollText, X } from 'lucide-react';
import { useEffect } from 'react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-4 md:inset-10 lg:inset-20 bg-neutral-950 border border-white/10 rounded-2xl z-[10000] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-neutral-900/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <ScrollText className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Terms & Conditions</h2>
                                    <p className="text-xs text-neutral-500">Last updated: {TERMS_LAST_UPDATED}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <div className="max-w-3xl mx-auto">
                                {/* Intro */}
                                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                                    {TERMS_INTRO}
                                </p>

                                {/* Sections */}
                                <div className="space-y-8">
                                    {TERMS_SECTIONS.map((section, index) => (
                                        <div key={index}>
                                            <h3 className="text-white font-bold mb-3">
                                                {section.title}
                                            </h3>
                                            <div className="text-neutral-400 text-sm leading-relaxed whitespace-pre-line">
                                                {section.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer note */}
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <p className="text-neutral-600 text-xs text-center">
                                        By using Cortex, you acknowledge that you have read, understood,
                                        and agree to be bound by these Terms and Conditions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10 bg-neutral-900/50">
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-neutral-200 transition-all"
                            >
                                I Understand
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
