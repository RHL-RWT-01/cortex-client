"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Clock,
    BarChart2,
    ArrowRight,
    ChevronDown,
    Lock,
    MessageSquare
} from 'lucide-react';

const roles = ['All Roles', 'Backend Engineer', 'Frontend Engineer', 'Systems Engineer', 'Data Engineer'];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const taskList = [
    {
        id: 1,
        title: 'Design a URL Shortener',
        role: 'Backend Engineer',
        difficulty: 'Intermediate',
        time: '30m',
        responses: 1240,
        score: 8.5,
        locked: false
    },
    {
        id: 2,
        title: 'Collaborative Document Editor',
        role: 'Systems Engineer',
        difficulty: 'Advanced',
        time: '45m',
        responses: 856,
        score: null,
        locked: false
    },
    {
        id: 3,
        title: 'High-Performance Image Gallery',
        role: 'Frontend Engineer',
        difficulty: 'Beginner',
        time: '20m',
        responses: 2100,
        score: 9.1,
        locked: false
    },
    {
        id: 4,
        title: 'Real-time Analytics Dashboard',
        role: 'Data Engineer',
        difficulty: 'Intermediate',
        time: '40m',
        responses: 540,
        score: null,
        locked: true
    },
    {
        id: 5,
        title: 'Distributed Key-Value Store',
        role: 'Backend Engineer',
        difficulty: 'Advanced',
        time: '60m',
        responses: 320,
        score: 7.2,
        locked: false
    },
    {
        id: 6,
        title: 'Micro-Frontend Architecture',
        role: 'Frontend Engineer',
        difficulty: 'Intermediate',
        time: '35m',
        responses: 780,
        score: null,
        locked: false
    },
];

export default function TasksPage() {
    const [selectedRole, setSelectedRole] = useState('All Roles');
    const [selectedDiff, setSelectedDiff] = useState('All Levels');

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Engineering Tasks</h1>
                    <p className="text-slate-400">Apply your architectural thinking to real-world scenarios.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 w-64"
                        />
                    </div>

                    <FilterDropdown label={selectedRole} items={roles} onSelect={setSelectedRole} />
                    <FilterDropdown label={selectedDiff} items={difficulties} onSelect={setSelectedDiff} />
                </div>
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {taskList.map((task, i) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`
              glass-card flex flex-col p-6 border-white/5 hover:border-indigo-500/30 transition-all group relative
              ${task.locked ? 'opacity-75 grayscale' : ''}
            `}
                    >
                        {task.locked && (
                            <div className="absolute top-4 right-4 text-slate-500">
                                <Lock className="w-5 h-5" />
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            <span className={`
                px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest
                ${task.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                ${task.difficulty === 'Intermediate' ? 'bg-indigo-500/10 text-indigo-400' : ''}
                ${task.difficulty === 'Advanced' ? 'bg-rose-500/10 text-rose-400' : ''}
              `}>
                                {task.difficulty}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">{task.role}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-200 mb-4 group-hover:text-white transition-colors">
                            {task.title}
                        </h3>

                        <div className="flex-1" />

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-xs font-semibold">{task.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-xs font-semibold">{task.responses}</span>
                                </div>
                            </div>

                            {task.score ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Score</span>
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-sm">
                                        {task.score}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    disabled={task.locked}
                                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white text-slate-300 text-xs font-bold transition-all flex items-center gap-2"
                                >
                                    START
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function FilterDropdown({ label, items, onSelect }: { label: string, items: string[], onSelect: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full mt-2 w-full min-w-[180px] bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-2 z-20 overflow-hidden">
                        {items.map(item => (
                            <button
                                key={item}
                                onClick={() => {
                                    onSelect(item);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${label === item ? 'text-indigo-400 font-bold bg-indigo-500/5' : 'text-slate-400'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
