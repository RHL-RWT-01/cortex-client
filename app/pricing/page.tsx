"use client";

import { useSubscription } from '@/hooks/use-subscription';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Brain,
    Check,
    ChevronDown,
    Crown,
    Loader2,
    Sparkles,
    Tag,
    X,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const COMPARISON_FEATURES = [
    {
        category: 'Tasks & Drills',
        features: [
            { name: 'Architecture Tasks', free: '1 total', pro: '5 per day' },
            { name: 'Thinking Drills', free: '1 per day', pro: 'Unlimited' },
        ]
    },
    {
        category: 'AI Assistance',
        features: [
            { name: 'AI Feedback', free: 'Basic', pro: 'Advanced' },
            { name: 'Score Breakdowns', free: true, pro: true },
            { name: 'Improvement Suggestions', free: false, pro: true },
        ]
    },
    {
        category: 'Analytics',
        features: [
            { name: 'Progress Tracking', free: 'Limited', pro: 'Full' },
            { name: 'Performance Trends', free: false, pro: true },
            { name: 'Skill Matrix', free: false, pro: true },
        ]
    },
];

const FAQ_ITEMS = [
    {
        question: 'How does the free tier work?',
        answer: 'The free tier gives you 1 architecture task to experience Cortex, plus 1 thinking drill per day. It\'s designed to let you understand the value before committing.'
    },
    {
        question: 'Can I cancel anytime?',
        answer: 'Yes! You can cancel your Pro subscription at any time. You\'ll retain access until the end of your billing period.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and various local payment methods through our secure payment partner.'
    },
    {
        question: 'Do you offer refunds?',
        answer: 'If you\'re not satisfied within the first 7 days, contact us for a full refund. No questions asked.'
    },
];

export default function PricingPage() {
    const { subscription, createCheckout, loading: subscriptionLoading } = useSubscription();
    const [discountCode, setDiscountCode] = useState('');
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';

    const handleUpgrade = async () => {
        setCheckoutLoading(true);
        try {
            await createCheckout(discountCode || undefined);
        } finally {
            setCheckoutLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 dot-pattern opacity-30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/[0.02] to-transparent rounded-full blur-3xl" />

                <div className="relative container-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 bg-white/5 border border-white/10 rounded-full">
                            Simple Pricing
                        </span>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                            Invest in Your
                            <br />
                            <span className="text-neutral-500">Engineering Mind</span>
                        </h1>

                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            One plan. Full access. Build the architectural thinking skills that set senior engineers apart.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="container-center">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-card rounded-3xl p-8 relative"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                <Brain className="w-6 h-6 text-neutral-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Free</h3>
                                <p className="text-xs text-neutral-500">Get a taste</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">$0</span>
                                <span className="text-neutral-500">/forever</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-neutral-300">1 architecture task</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-neutral-300">1 drill per day</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-neutral-300">Basic AI feedback</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-neutral-600">
                                <X className="w-4 h-4" />
                                <span>Limited analytics</span>
                            </li>
                        </ul>

                        {!isPro ? (
                            <Link
                                href="/signup"
                                className="block w-full py-3 text-center border border-white/10 rounded-xl text-sm font-bold text-neutral-300 hover:bg-white/5 hover:border-white/20 transition-all"
                            >
                                Get Started Free
                            </Link>
                        ) : (
                            <div className="py-3 text-center text-sm text-neutral-500">
                                You have a Pro subscription
                            </div>
                        )}
                    </motion.div>

                    {/* Pro Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-3xl p-8 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10"
                    >
                        {/* Popular Badge */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="px-4 py-1 bg-white text-black text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                                Most Popular
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                <Crown className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Pro</h3>
                                <p className="text-xs text-neutral-500">Full access</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">$15</span>
                                <span className="text-neutral-500">/month</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-white font-medium">5 tasks per day</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-white font-medium">Unlimited drills</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-neutral-300">Advanced AI coaching</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-neutral-300">Full performance analytics</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-neutral-300">Priority support</span>
                            </li>
                        </ul>

                        {/* Discount Code */}
                        {showDiscountInput ? (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                    placeholder="Enter discount code"
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors text-sm font-mono tracking-wider"
                                />
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowDiscountInput(true)}
                                className="mb-4 flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                            >
                                <Tag className="w-3.5 h-3.5" />
                                <span>Have a discount code?</span>
                            </button>
                        )}

                        {isPro ? (
                            <div className="py-3 text-center text-sm text-emerald-400 font-medium bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <Check className="w-4 h-4 inline mr-2" />
                                You're on Pro
                            </div>
                        ) : (
                            <button
                                onClick={handleUpgrade}
                                disabled={checkoutLoading || subscriptionLoading}
                                className="w-full premium-button flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {checkoutLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        <span>Get Pro Access</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="container-center mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-black text-white text-center mb-12 tracking-tight">
                        Compare Plans
                    </h2>

                    <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
                            <div className="p-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                                Feature
                            </div>
                            <div className="p-4 text-center text-xs font-bold uppercase tracking-widest text-neutral-400">
                                Free
                            </div>
                            <div className="p-4 text-center text-xs font-bold uppercase tracking-widest text-white">
                                Pro
                            </div>
                        </div>

                        {/* Features */}
                        {COMPARISON_FEATURES.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                {/* Category Header */}
                                <div className="px-4 py-3 bg-white/[0.02] border-b border-white/5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                                        {section.category}
                                    </span>
                                </div>

                                {/* Category Features */}
                                {section.features.map((feature, featureIndex) => (
                                    <div
                                        key={featureIndex}
                                        className="grid grid-cols-3 border-b border-white/5 last:border-b-0"
                                    >
                                        <div className="p-4 text-sm text-neutral-300">
                                            {feature.name}
                                        </div>
                                        <div className="p-4 text-center">
                                            {typeof feature.free === 'boolean' ? (
                                                feature.free ? (
                                                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                                                ) : (
                                                    <X className="w-4 h-4 text-neutral-700 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-sm text-neutral-500">{feature.free}</span>
                                            )}
                                        </div>
                                        <div className="p-4 text-center">
                                            {typeof feature.pro === 'boolean' ? (
                                                feature.pro ? (
                                                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                                                ) : (
                                                    <X className="w-4 h-4 text-neutral-700 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-sm text-white font-medium">{feature.pro}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="container-center mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-black text-white text-center mb-12 tracking-tight">
                        Frequently Asked Questions
                    </h2>

                    <div className="max-w-2xl mx-auto space-y-3">
                        {FAQ_ITEMS.map((item, index) => (
                            <div
                                key={index}
                                className="border border-white/10 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                                >
                                    <span className="font-medium text-white">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4 text-sm text-neutral-400 leading-relaxed">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container-center mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center glass-card rounded-3xl p-12 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                            Ready to Level Up?
                        </h2>
                        <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                            Join engineers who are investing in their architectural thinking skills. Start your journey today.
                        </p>

                        {!isPro && (
                            <button
                                onClick={handleUpgrade}
                                disabled={checkoutLoading}
                                className="premium-button inline-flex items-center gap-2 px-8 py-4"
                            >
                                {checkoutLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        <span>Upgrade to Pro</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
