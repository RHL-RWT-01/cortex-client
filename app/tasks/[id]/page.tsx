"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Send,
    Clock,
    ShieldAlert,
    Lightbulb,
    Layers,
    Maximize2,
    Minimize2,
    Timer
} from 'lucide-react';
import Link from 'next/link';

const steps = [
    { id: 'assumptions', label: 'Assumptions', icon: Lightbulb, color: 'text-amber-400' },
    { id: 'architecture', label: 'Architecture', icon: Layers, color: 'text-indigo-400' },
    { id: 'trade-offs', label: 'Trade-offs', icon: ShieldAlert, color: 'text-rose-400' },
    { id: 'failure-modes', label: 'Failure Modes', icon: Timer, color: 'text-cyan-400' },
];

export default function TaskWorkspace() {
    const [activeTab, setActiveTab] = useState('assumptions');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [answers, setAnswers] = useState({
        assumptions: '',
        architecture: '',
        'trade-offs': '',
        'failure-modes': '',
    });

    const handleInputChange = (val: string) => {
        setAnswers({ ...answers, [activeTab]: val });
    };

    return (
        <div className="h-[calc(100vh-160px)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <Link href="/tasks" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-sm">Back to Tasks</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 rounded-xl border border-white/10 text-slate-400 font-bold text-sm hover:bg-white/5 transition-colors">
                        SAVE DRAFT
                    </button>
                    <button className="btn-primary py-2 px-8 rounded-xl text-sm">
                        SUBMIT ANALYSIS
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className={`flex-1 flex gap-8 min-h-0 ${isFullscreen ? 'fixed inset-0 z-[60] bg-[#030712] p-8' : ''}`}>
                {/* Left Side: Scenario */}
                <div className={`flex flex-col gap-6 ${isFullscreen ? 'w-1/3' : 'w-2/5'} min-h-0`}>
                    <div className="glass-card flex-1 p-8 border-white/5 overflow-y-auto custom-scrollbar">
                        <div className="sticky top-0 bg-[#0f172a]/80 backdrop-blur-xl -mt-8 -mx-8 p-8 border-b border-white/5 mb-8">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded mb-4 inline-block">Scenario</span>
                            <h1 className="text-3xl font-display font-bold text-white">Design a URL Shortener</h1>
                            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 30m EST</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                <span>Backend Engineer</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed">
                            <p>
                                You are tasked with designing a system like Bitly. This service will provide short aliases for long URLs.
                            </p>
                            <h3 className="text-white font-bold text-lg">System Requirements:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Users should be able to enter a long URL and get a unique short alias.</li>
                                <li>When users access a short link, the service should redirect them to the original link as fast as possible.</li>
                                <li>The system should be highly available and handle massive read traffic.</li>
                            </ul>
                            <h3 className="text-white font-bold text-lg">Scale Constraints:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>100 million new URLs per month.</li>
                                <li>Read/Write ratio: 100:1.</li>
                                <li>Aliases should be 7-8 characters long.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side: Workspace */}
                <div className="flex-1 flex flex-col min-h-0 relative">
                    <div className="glass-card flex-1 flex flex-col border-white/10 overflow-hidden">
                        {/* Workspace Tabs */}
                        <div className="flex items-center px-4 pt-4 border-b border-white/5 gap-1 shrink-0">
                            {steps.map((step) => {
                                const isActive = activeTab === step.id;
                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => setActiveTab(step.id)}
                                        className={`
                      px-6 py-3 rounded-t-xl text-sm font-bold flex items-center gap-3 transition-all relative
                      ${isActive ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-slate-300'}
                    `}
                                    >
                                        <step.icon className={`w-4 h-4 ${isActive ? step.color : ''}`} />
                                        {step.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-tab-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                            <div className="flex-1" />
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-3 text-slate-500 hover:text-white transition-colors"
                                title="Toggle Fullscreen"
                            >
                                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-1 p-8 min-h-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full flex flex-col"
                                >
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 block">
                                        Write your notes for <span className="text-white">{activeTab.replace('-', ' ')}</span>
                                    </label>
                                    <textarea
                                        autoFocus
                                        value={(answers as any)[activeTab]}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        placeholder="Structure your thoughts here..."
                                        className="flex-1 bg-transparent border-none text-slate-200 text-lg leading-relaxed placeholder:text-slate-700 focus:outline-none resize-none custom-scrollbar"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* AI Assistant Hint */}
                        <div className="p-4 bg-indigo-600/5 border-t border-white/5 flex items-center justify-between text-[11px] font-bold shrink-0">
                            <div className="flex items-center gap-2 text-indigo-400 uppercase tracking-widest">
                                <BrainCircuit className="w-3.5 h-3.5" />
                                AI Prompt Ready
                            </div>
                            <div className="text-slate-500 uppercase tracking-widest">
                                Characters: {(answers as any)[activeTab].length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
