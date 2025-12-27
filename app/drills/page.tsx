"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    BrainCircuit,
    CheckCircle2,
    XCircle,
    ChevronRight,
    ArrowLeft,
    Info
} from 'lucide-react';
import Link from 'next/link';

const drills = [
    {
        id: 1,
        type: 'spot_assumptions',
        title: 'Distributed Locking',
        question: 'In a system using Redis for distributed locking with a 10s TTL, which of the following is a dangerous assumption?',
        options: [
            'The network tail latency is < 1s',
            'The lock will always be released by the client',
            'The process clock never skews significantly',
            'All of the above'
        ],
        correct: 3,
        explanation: 'Relying on clients to release locks, ignoring clock skew, and underestimating network partitions are all critical assumptions that can lead to race conditions in distributed systems.'
    }
];

export default function DrillsPage() {
    const [currentDrill, setCurrentDrill] = useState(drills[0]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isCorrect = selectedOption === currentDrill.correct;

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                        <BrainCircuit className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold">Thinking Drills</h1>
                        <p className="text-slate-400">Rapid fire exercises to sharpen your technical intuition.</p>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Today's Progress</span>
                    <div className="flex gap-1.5">
                        {[1, 1, 0, 2, 2].map((s, i) => (
                            <div key={i} className={`w-6 h-1.5 rounded-full ${s === 1 ? 'bg-emerald-500' : s === 0 ? 'bg-white/10' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-card p-10 border-white/5"
                    >
                        <div className="mb-10">
                            <span className="px-3 py-1 rounded bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                                {currentDrill.type.replace('_', ' ')}
                            </span>
                            <h2 className="text-2xl font-bold leading-relaxed text-slate-100 italic">
                                "{currentDrill.question}"
                            </h2>
                        </div>

                        <div className="space-y-4 mb-10">
                            {currentDrill.options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedOption(i)}
                                    className={`
                    w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between group
                    ${selectedOption === i
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10'
                                        }
                  `}
                                >
                                    <span className="font-semibold">{option}</span>
                                    <div className={`
                    w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold
                    ${selectedOption === i ? 'bg-white text-indigo-600 border-white' : 'border-slate-700 text-slate-600 group-hover:border-slate-500'}
                  `}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={selectedOption === null}
                            onClick={() => setIsSubmitted(true)}
                            className={`
                w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3
                ${selectedOption !== null
                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }
              `}
                        >
                            FINALIZE SELECTION
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`glass-card p-10 border-2 overflow-hidden relative ${isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}
                    >
                        {/* Background Decoration */}
                        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                        <div className="flex items-center gap-6 mb-8 relative z-10">
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                                {isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-display font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {isCorrect ? 'Outstanding Intuition!' : 'A Learning Opportunity'}
                                </h3>
                                <p className="text-slate-400 font-medium">
                                    {isCorrect ? 'You spotted the flaws instantly.' : 'Your selection was logical, but consider the nuances below.'}
                                </p>
                            </div>
                        </div>

                        <div className="bg-black/20 p-8 rounded-3xl border border-white/5 mb-8 relative z-10">
                            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                                <Info className="w-4 h-4" />
                                Expert Breakdown
                            </div>
                            <p className="text-slate-200 leading-relaxed text-lg italic">
                                {currentDrill.explanation}
                            </p>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setSelectedOption(null);
                                }}
                                className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-colors"
                            >
                                TRY AGAIN
                            </button>
                            <button className="flex-[2] py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                                NEXT DRILL
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
