"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    Loader2,
    Sparkles,
    Tag,
    X,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: (discountCode?: string) => Promise<string | null>;
    limitType: 'task' | 'drill';
    message?: string;
}

const PRO_FEATURES = [
    { text: '5 architecture tasks per day', highlight: true },
    { text: 'Unlimited thinking drills', highlight: true },
    { text: 'Advanced AI feedback & coaching', highlight: false },
    { text: 'Full performance analytics', highlight: false },
    { text: 'Score breakdowns & insights', highlight: false },
];

export default function UpgradeModal({
    isOpen,
    onClose,
    onUpgrade,
    limitType,
    message
}: UpgradeModalProps) {
    const [discountCode, setDiscountCode] = useState('');
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpgrade = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await onUpgrade(discountCode || undefined);
            if (!result) {
                setError('Failed to create checkout. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const defaultMessage = limitType === 'task'
        ? "You've used your free task. Upgrade to Pro for 5 tasks per day!"
        : "You've used your daily drill. Upgrade to Pro for unlimited drills!";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                            {/* Header */}
                            <div className="relative p-8 pb-6 border-b border-white/5">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4 text-neutral-400" />
                                </button>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white tracking-tight">
                                            Upgrade to Pro
                                        </h2>
                                        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                                            Unlock your full potential
                                        </p>
                                    </div>
                                </div>

                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {message || defaultMessage}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="p-8 space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                        Pro Includes
                                    </span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-white">$15</span>
                                        <span className="text-neutral-500 text-sm">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {PRO_FEATURES.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.highlight ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                                                <Check className={`w-3 h-3 ${feature.highlight ? 'text-emerald-400' : 'text-neutral-400'}`} />
                                            </div>
                                            <span className={`text-sm ${feature.highlight ? 'text-white font-medium' : 'text-neutral-400'}`}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Discount Code */}
                                {showDiscountInput ? (
                                    <div className="mt-6 pt-6 border-t border-white/5">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                                            Discount Code
                                        </label>
                                        <input
                                            type="text"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                            placeholder="Enter code"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors text-sm font-mono tracking-wider"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowDiscountInput(true)}
                                        className="mt-6 flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                                    >
                                        <Tag className="w-3.5 h-3.5" />
                                        <span>Have a discount code?</span>
                                    </button>
                                )}

                                {error && (
                                    <p className="text-red-400 text-sm mt-4">{error}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="p-8 pt-4 space-y-3">
                                <button
                                    onClick={handleUpgrade}
                                    disabled={loading}
                                    className="w-full premium-button flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            <span>Upgrade Now</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={onClose}
                                    disabled={loading}
                                    className="w-full py-3 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
