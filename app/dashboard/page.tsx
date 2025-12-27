"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Terminal,
    BrainCircuit,
    Trophy,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    TrendingUp,
    Target
} from 'lucide-react';

const stats = [
    { label: 'Tasks Completed', value: '15', icon: CheckCircle2, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Think Score', value: '8.2', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Drill Accuracy', value: '92%', icon: BrainCircuit, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Global Rank', value: '#128', icon: Trophy, color: 'text-orange-400', bg: 'bg-orange-400/10' },
];

const recentTasks = [
    { id: 1, title: 'Design a URL Shortener', role: 'Backend', score: 8.5, date: '2 hours ago' },
    { id: 2, title: 'Real-time Chat Sync', role: 'Systems', score: 7.8, date: '1 day ago' },
    { id: 3, title: 'Distributed Locking Service', role: 'Backend', score: 9.2, date: '3 days ago' },
];

export default function Dashboard() {
    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stats</span>
                        </div>
                        <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-slate-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Section */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Daily Challenge */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                                <Zap className="w-6 h-6 text-orange-400 fill-orange-400" />
                                Daily Challenge
                            </h2>
                        </div>
                        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 shadow-2xl shadow-indigo-500/20">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Terminal className="w-40 h-40" />
                            </div>
                            <div className="relative z-10 max-w-lg">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                                    Intermediate • 30 Mins
                                </span>
                                <h3 className="text-3xl font-display font-bold text-white mb-4">
                                    Architecting a Global Content Delivery Network (CDN)
                                </h3>
                                <p className="text-indigo-100 mb-8 leading-relaxed">
                                    Design a system to cache and serve heavy assets globally with minimal latency and high cache hit ratios.
                                </p>
                                <button className="px-8 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                                    Launch Task
                                    <ArrowUpRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Recent History */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-display font-bold">Recent History</h2>
                            <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">View All</button>
                        </div>
                        <div className="space-y-4">
                            {recentTasks.map((task, i) => (
                                <div key={task.id} className="glass-card p-4 flex items-center justify-between border-white/5 hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center font-display font-bold text-indigo-400">
                                            {task.score}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-200">{task.title}</h4>
                                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                <span>{task.role}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                <span>{task.date}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    <section className="glass-card p-6 border-white/5 bg-indigo-500/5">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-400" />
                            Skill Breakdown
                        </h3>
                        <div className="space-y-6">
                            <SkillProgress label="Assumptions" value={85} color="bg-indigo-500" />
                            <SkillProgress label="Architecture" value={72} color="bg-cyan-500" />
                            <SkillProgress label="Trade-offs" value={95} color="bg-violet-500" />
                            <SkillProgress label="Failure Analysis" value={64} color="bg-pink-500" />
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-slate-400">Overall Progress</span>
                                <span className="text-indigo-400 font-bold">Level 14</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[78%]" />
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-6 border-white/5">
                        <h3 className="text-lg font-bold mb-4">Thinking Drills</h3>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Warm up your brain with a quick exercise in scaling under pressure.
                        </p>
                        <button className="w-full py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                            Start Drill
                            <BrainCircuit className="w-5 h-5" />
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}

function SkillProgress({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-300">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}
