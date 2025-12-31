"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Calendar, 
    ArrowUpRight, 
    CheckCircle2, 
    BrainCircuit,
    Search,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useProgress } from '@/hooks/use-progress';

export default function HistoryPage() {
    const { history, loading } = useProgress();

    if (loading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Analysis History</h1>
                        <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Review your architectural progression.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-white/5 rounded-full">
                    <Search className="w-3.5 h-3.5 text-neutral-600" />
                    <input 
                        type="text" 
                        placeholder="SEARCH SCENARIOS..." 
                        className="bg-transparent border-none text-[10px] font-bold text-white placeholder:text-neutral-700 focus:outline-none w-32"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {history.length > 0 ? history.map((resp, i) => (
                    <motion.div
                        key={resp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative"
                    >
                        <Link 
                            href={`/responses/${resp.id}`}
                            className="block p-5 rounded-2xl border border-white/5 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-xl bg-black border border-white/5 flex flex-col items-center justify-center">
                                        <span className="text-lg font-black text-white">{resp.score?.toFixed(1)}</span>
                                        <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">AIX</span>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-base font-bold text-neutral-200 group-hover:text-white transition-colors mb-1">
                                            {/* We need the task title, but history usually only has task_id. 
                                                In a real app, we'd fetch the task info or include it in the response object.
                                                For now, we'll label it as Architectural Analysis. */}
                                            Architectural Analysis #{resp.id.slice(-4)}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(resp.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-neutral-800" />
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-widest">
                                                <BrainCircuit className="w-3 h-3 text-neutral-500" />
                                                Feedback Unlocked
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex flex-col items-end gap-1">
                                        <div className="flex gap-1">
                                            {[1, 1, 1, 0, 0].map((s, i) => (
                                                <div key={i} className={`w-3 h-0.5 rounded-full ${s === 1 ? 'bg-white/40' : 'bg-neutral-800'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">Logic Depth</span>
                                    </div>
                                    <div className="p-3 rounded-full bg-white/5 text-neutral-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )) : (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                        <CheckCircle2 className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">No analysis history found.</p>
                        <Link href="/dashboard" className="mt-4 text-white text-xs font-black uppercase tracking-widest underline underline-offset-4 inline-block">Start your first training</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
