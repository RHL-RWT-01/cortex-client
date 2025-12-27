"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  BrainCircuit,
  Terminal,
  Trophy,
  ArrowRight,
  Target,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { CSSProperties } from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      <div className="bg-gradient" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight brand-logo">CORTEX</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Methodology</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold hover:text-indigo-400 transition-colors">Log In</Link>
          <Link href="/signup" className="btn-primary py-2.5 px-6 rounded-full text-sm">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-20 -z-10 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8">
            The Thinking Lab for Engineers
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
            Master the Art of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-500">
              Structural Thinking
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Cortex is an AI-powered training platform that sharpens your architectural mind through real-world scenarios, trade-off analysis, and instant diagnostic feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup" className="btn-primary py-4 px-10 rounded-2xl text-lg group">
              Start Free Training
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030712] bg-slate-800 flex items-center justify-center text-[10px]">
                    <User className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <span className="text-sm">Join 2,500+ Engineers</span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-20 w-full max-w-6xl mx-auto"
        >
          <div className="relative glass-card aspect-[16/10] overflow-hidden border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/80" />

            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <div className="h-2 w-32 rounded-full bg-white/10" />
              </div>

              <div className="flex-1 grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-6">
                  <div className="h-12 w-2/3 rounded-xl bg-indigo-500/20 border border-indigo-500/20" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded-full bg-white/5" />
                    <div className="h-4 w-full rounded-full bg-white/5" />
                    <div className="h-4 w-4/5 rounded-full bg-white/5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-32 rounded-2xl bg-white/5 border border-white/5" />
                    <div className="h-32 rounded-2xl bg-white/5 border border-white/5" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-48 rounded-2xl bg-indigo-600/10 border border-indigo-500/20" />
                  <div className="h-24 rounded-2xl bg-white/5 border border-white/5" />
                </div>
              </div>
            </div>

            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BrainCircuit className="w-8 h-8 text-indigo-400" />}
              title="Architectural Thinking"
              desc="Practice system design across 4 critical dimensions: Assumptions, Architecture, Trade-offs, and Failures."
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8 text-cyan-400" />}
              title="AI Diagnostic Scoring"
              desc="Get instant, detailed feedback on your reasoning clarity, constraint awareness, and simplicity."
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8 text-violet-400" />}
              title="Gamified Progression"
              desc="Maintain daily streaks, track score history, and unlock achievements as you level up your skills."
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="how-it-works" className="py-32 px-8 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Why engineers <br />
              <span className="text-indigo-400">choose Cortex</span>
            </h2>
            <div className="space-y-8">
              <PhilosophyItem
                title="Scenario-Based Learning"
                desc="Work on real-world problems curated for Backend, Frontend, and Systems roles."
              />
              <PhilosophyItem
                title="Cognitive Reframing"
                desc="Time-gated AI feedback encourages self-reflection before the solution is revealed."
              />
              <PhilosophyItem
                title="Continuous Drills"
                desc="Quick multiple-choice exercises for spotting assumptions and scaling issues."
              />
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="h-64 rounded-3xl [background:linear-gradient(to_bottom_right,#6366f1,transparent)] p-8 flex flex-col justify-end">
                <span className="text-4xl font-bold">12+</span>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest mt-2">Roles covered</p>
              </div>
              <div className="h-48 rounded-3xl bg-white/5 border border-white/10 p-8">
                <Target className="w-8 h-8 text-indigo-400 mb-4" />
                <p className="font-semibold">Precision Training</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 rounded-3xl bg-white/5 border border-white/10 p-8">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mb-4" />
                <p className="font-semibold">Expert Content</p>
              </div>
              <div className="h-64 rounded-3xl [background:linear-gradient(to_bottom_right,#06b6d4,transparent)] p-8 flex flex-col justify-end">
                <span className="text-4xl font-bold">500+</span>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest mt-2">Drills Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-slate-500 text-sm">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <Zap className="w-6 h-6" />
            <span className="font-display font-bold text-xl tracking-tight">CORTEX</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
          <p>© 2024 Cortex Systems Inc. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .brand-logo {
          letter-spacing: -0.05em;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
      <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PhilosophyItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="mt-1.5 w-5 h-5 rounded-full border-2 border-indigo-500 flex-shrink-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-slate-400">{desc}</p>
      </div>
    </div>
  );
}
