"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Terminal,
    BrainCircuit,
    Trophy,
    Settings,
    LogOut,
    ChevronRight,
    User,
    Zap,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Engineering Tasks', icon: Terminal, href: '/tasks' },
    { name: 'Thinking Drills', icon: BrainCircuit, href: '/drills' },
    { name: 'Achievements', icon: Trophy, href: '/achievements' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // If we are on the landing page, we might not want the sidebar
    const isLandingPage = pathname === '/';

    if (isLandingPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#030712] text-slate-100 overflow-hidden">
            <div className="bg-gradient" />

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? '260px' : '80px',
                    x: isMobileMenuOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -300 : 0)
                }}
                className={`fixed lg:relative z-50 h-screen flex flex-col bg-[#0f172a]/80 backdrop-blur-xl border-r border-white/5 transition-all duration-300`}
            >
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                            <Zap className="w-6 h-6 text-white fill-white" />
                        </div>
                        {isSidebarOpen && (
                            <span className="font-display font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                CORTEX
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5 text-slate-400 transition-colors"
                    >
                        <ChevronRight className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                                        ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                    }
                `}>
                                    <item.icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-indigo-400' : 'group-hover:text-slate-200'}`} />
                                    {isSidebarOpen && (
                                        <span className="font-medium whitespace-nowrap">{item.name}</span>
                                    )}
                                    {isActive && isSidebarOpen && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link href="/profile">
                        <div className={`
              flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all group
              ${isSidebarOpen ? '' : 'justify-center'}
            `}>
                            <User className="w-6 h-6 shrink-0" />
                            {isSidebarOpen && <span className="font-medium">Profile</span>}
                        </div>
                    </Link>
                    <button className={`
            flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group w-full
            ${isSidebarOpen ? '' : 'justify-center'}
          `}>
                        <LogOut className="w-6 h-6 shrink-0" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#030712]/50 backdrop-blur-md z-30 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-display font-semibold text-slate-200">
                            {sidebarItems.find(i => i.href === pathname)?.name || 'Cortex'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold">
                            <Zap className="w-4 h-4 fill-orange-400" />
                            <span>5 DAY STREAK</span>
                        </div>

                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-200 leading-none">John Doe</p>
                                <p className="text-xs text-slate-500 mt-1">Backend Engineer</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-indigo-400 font-bold">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
