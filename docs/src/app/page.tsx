"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Cpu, FileCode2, Lock, GitBranch, ArrowRight, Check, Copy, BookText } from "lucide-react";
import { CpuIcon } from "@/components/icons/CpuIcon";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { FileCodeIcon } from "@/components/icons/FileCodeIcon";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePostHog } from "posthog-js/react";

import { useState } from "react";

const FRAMEWORKS = [
  {
    id: "react",
    name: "React",
    subtitle: "Modern Hooks & Components",
    version: "v18.0+",
    color: "#61DAFB",
    file: "CouponForm.tsx",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    code: `import { SecureInput } from "@secure-input/react";

export function CouponForm() {
  const handleSubmit = async (encryptedValue: string) => {
    // Plain text is never exposed here.
    await fetch("/api/validate", {
      method: "POST",
      body: encryptedValue,
    });
  };

  return (
    <SecureInput
      placeholder="Enter coupon code"
      onEncryptedSubmit={handleSubmit}
    />
  );
}`
  },
  {
    id: "vue",
    name: "Vue",
    subtitle: "Composition API Ready",
    version: "v3.0+",
    color: "#42B883",
    file: "SecureCoupon.vue",
    icon: (
      <svg viewBox="0 0 256 221" className="w-6 h-6">
        <path fill="currentColor" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"/>
      </svg>
    ),
    code: `<script setup>
import { SecureInput } from "@secure-input/vue";

const handleApply = async (encrypted) => {
  // Direct to your secure backend
  await fetch('/api/coupon', {
    method: 'POST',
    body: JSON.stringify({ data: encrypted })
  });
};
</script>

<template>
  <SecureInput 
    placeholder="SPRING24"
    @submit="handleApply"
  />
</template>`
  },
  {
    id: "vanilla",
    name: "Vanilla JS",
    subtitle: "Lightweight & Universal",
    version: "ES6+",
    color: "#F7DF1E",
    file: "main.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="currentColor" d="M3 3h18v18H3V3zm13.5 15.5c1.2 0 2.1-.6 2.1-1.5 0-.9-.9-1.3-2.1-1.3-.6 0-1.1.1-1.5.3v1.2c.4-.2.9-.2 1.5-.2.6 0 .9.2.9.5 0 .3-.3.5-.9.5-.6 0-1.1-.1-1.5-.3l-.3 1.1c.4.2 1.1.2 1.8.2zm-5.2 0c1.1 0 1.8-.6 1.8-1.5v-4.5H12V17c0 .4-.2.6-.6.6-.3 0-.6-.1-.9-.2l-.3 1.1c.4.2 1 .2 1.6.2z"/>
      </svg>
    ),
    code: `import { createSecureInput } from "@secure-input/core";

// Initialize directly on any DOM element
const input = createSecureInput({
  element: document.querySelector("#coupon-field"),
  onEncryptedValue: (ciphertext) => {
    console.log("Secure Payload:", ciphertext);
    sendToBackend(ciphertext);
  }
});

// Clean and isolated
input.mount();

// Support for custom validation
input.on("error", (err) => {
  console.error("Input Error:", err);
});`
  }
];


const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 100 } },
};

const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  const posthog = usePostHog();
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedFw, setSelectedFw] = useState("react");

  const handleCopy = () => {
    posthog.capture("hero_command_copied");
    navigator.clipboard.writeText("npm install @secure-input/react");

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            <span className="font-display font-bold tracking-tight text-lg">Secure Input</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="font-display text-xs uppercase tracking-wider">
                <BookText className="w-4 h-4 mr-2" />
                Docs
              </Button>
            </Link>
            <Link href="https://github.com/xSuneth/secure-input" target="_blank">
              <Button variant="ghost" size="sm" className="font-display text-xs uppercase tracking-wider">
                <GitBranch className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="hero-glow-bg pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            variants={STAGGER_CONTAINER_VARIANTS}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Badge variant="outline" className="mb-8 font-display uppercase tracking-widest text-[10px] border-accent/50 text-accent bg-accent/5 px-3 py-1">
                WASM-Powered Protection
              </Badge>
            </motion.div>
            
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-5xl leading-[1.1]">
              Protect your checkout <br className="hidden md:block" />
              <span className="text-muted-foreground">from coupon-stealing extensions.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-light">
              Stop extensions like Honey from scraping and leaking your discount codes. A lightweight WebAssembly library that obfuscates sensitive e-commerce inputs from client-side bots.
            </motion.p>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
              <Button asChild size="lg" onClick={() => posthog.capture("get_started_clicked")} className="h-14 px-12 font-display uppercase tracking-widest text-xs bg-accent text-accent-foreground hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(var(--color-accent),0.5)] transition-all duration-300 rounded-none btn-shine group cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2">

                <Link href="/docs">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleCopy}
                className="h-14 px-6 font-display uppercase tracking-widest text-xs rounded-none border-white/20 !bg-transparent hover:!bg-white/10 hover:!text-white transition-colors cursor-pointer w-full sm:w-auto min-w-[320px] flex items-center justify-between group"
              >
                <span>npm install @secure-input/react</span>
                {copied ? <Check className="w-4 h-4 text-accent ml-4 shrink-0" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors ml-4 shrink-0" />}
              </Button>
            </motion.div>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mt-16 md:mt-24 flex items-center justify-center gap-8 text-sm font-display text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> ~30KB Gzipped</div>
              <div className="hidden sm:flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Zero Dependencies</div>
              <div className="hidden md:flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Type Safe</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Separator className="bg-white/5" />

      {/* Features Grid */}
      <section className="py-24 bg-card/30 overflow-hidden">
        <motion.div 
          className="container mx-auto px-6"
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-16">
            <h2 className="font-display text-3xl font-bold mb-4">Core Architecture</h2>
            <p className="text-muted-foreground max-w-xl">Designed for performance and isolation. Plain text never exists in the main thread or DOM.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 cards-group">
            <motion.div 
              variants={FADE_UP_ANIMATION_VARIANTS}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full p-8 rounded-none border-white/10 bg-card tech-border gradient-hover-card">
                <CpuIcon isHovered={hoveredCard === 0} className="w-8 h-8 mb-6 text-accent" />
                <h3 className="font-display font-bold text-xl mb-3">WASM Encryption</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Utilizes ChaCha20Poly1305 authenticated encryption compiled from Rust to WebAssembly for maximum performance and a higher barrier to reverse-engineering.
                </p>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={FADE_UP_ANIMATION_VARIANTS}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full p-8 rounded-none border-white/10 bg-card tech-border gradient-hover-card">
                <ShieldIcon isHovered={hoveredCard === 1} className="w-8 h-8 mb-6 text-accent" />
                <h3 className="font-display font-bold text-xl mb-3">Worker Isolation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Sensitive processing occurs entirely in a separate Web Worker thread. Only the encrypted payload is accessible to browser extensions inspecting the DOM.
                </p>
              </Card>
            </motion.div>

            <motion.div 
              variants={FADE_UP_ANIMATION_VARIANTS}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full p-8 rounded-none border-white/10 bg-card tech-border gradient-hover-card">
                <FileCodeIcon isHovered={hoveredCard === 2} className="w-8 h-8 mb-6 text-accent" />
                <h3 className="font-display font-bold text-xl mb-3">Framework Agnostic</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Usable anywhere. Core library works in Vanilla JS, with first-class React hooks and components provided out of the box.
                </p>
              </Card>
            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* Packages Section - Reimagined as Technical Registry */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-20">
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase tracking-[0.2em]">Packages</h2>
            <div className="w-20 h-1 bg-accent mt-4"></div>
          </motion.div>

          <div className="flex flex-col">
            {/* Package 01 */}
            <motion.div 
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="group relative grid md:grid-cols-[1fr_2fr] gap-8 py-12 border-t border-white/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="flex flex-col justify-between relative z-10 transition-colors duration-500">
                <div>
                  <span className="font-mono text-accent text-sm mb-4 block opacity-50 group-hover:opacity-100 transition-all duration-500">MODULE_01</span>
                  <h3 className="font-display font-bold text-2xl group-hover:text-accent transition-all duration-500">@secure-input/core</h3>
                </div>
                <div className="mt-8 md:mt-0">
                  <Badge variant="outline" className="rounded-none border-white/10 text-[10px] font-mono uppercase tracking-widest px-2 py-1 transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent">Runtime Engine</Badge>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div className="max-w-md">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 transition-colors duration-500 group-hover:text-foreground">
                    The standalone orchestration layer. Handles secure communication with Web Workers, manages encryption lifecycles, and exposes a high-level API for any JS environment.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-accent/60 transition-colors duration-500 group-hover:text-accent">
                    <span>SIZE: ~15KB</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>DEPS: ZERO</span>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <code className="text-[11px] bg-white/5 p-3 text-zinc-400 font-mono border border-white/5 block group-hover:border-accent/30 group-hover:text-accent transition-all duration-500 cursor-pointer select-all">
                    npm i @secure-input/core
                  </code>
                </div>
              </div>
            </motion.div>

            {/* Package 02 */}
            <motion.div 
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="group relative grid md:grid-cols-[1fr_2fr] gap-8 py-12 border-t border-white/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="flex flex-col justify-between relative z-10 transition-colors duration-500">
                <div>
                  <span className="font-mono text-accent text-sm mb-4 block opacity-50 group-hover:opacity-100 transition-all duration-500">MODULE_02</span>
                  <h3 className="font-display font-bold text-2xl group-hover:text-accent transition-all duration-500">@secure-input/react</h3>
                </div>
                <div className="mt-8 md:mt-0">
                  <Badge variant="outline" className="rounded-none border-white/10 text-[10px] font-mono uppercase tracking-widest px-2 py-1 transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent">UI Adaptation</Badge>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div className="max-w-md">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 transition-colors duration-500 group-hover:text-foreground">
                    First-class React support. Includes hooks for managing worker state and optimized wrapper components that prevent DOM-based scraping out of the box.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-accent/60 transition-colors duration-500 group-hover:text-accent">
                    <span>SIZE: ~5KB</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>TYPE: STRONGLY TYPED</span>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <code className="text-[11px] bg-white/5 p-3 text-zinc-400 font-mono border border-white/5 block group-hover:border-accent/30 group-hover:text-accent transition-all duration-500 cursor-pointer select-all">
                    npm i @secure-input/react
                  </code>
                </div>
              </div>
            </motion.div>

            {/* Package 03 */}
            <motion.div 
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="group relative grid md:grid-cols-[1fr_2fr] gap-8 py-12 border-t border-b border-white/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="flex flex-col justify-between relative z-10 transition-colors duration-500">
                <div>
                  <span className="font-mono text-accent text-sm mb-4 block opacity-50 group-hover:opacity-100 transition-all duration-500">MODULE_03</span>
                  <h3 className="font-display font-bold text-2xl group-hover:text-accent transition-all duration-500">@secure-input/wasm</h3>
                </div>
                <div className="mt-8 md:mt-0">
                  <Badge variant="outline" className="rounded-none border-white/10 text-[10px] font-mono uppercase tracking-widest px-2 py-1 transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent">Binary Core</Badge>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div className="max-w-md">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 transition-colors duration-500 group-hover:text-foreground">
                    The cryptographic heart. Contains the Rust-compiled ChaCha20Poly1305 implementation. Usually installed as a dependency of the core runtime.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-accent/60 transition-colors duration-500 group-hover:text-accent">
                    <span>SIZE: ~10KB</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>RUNTIME: WASM32</span>
                  </div>
                </div>
                <div className="w-full md:w-auto self-start md:self-center relative z-10">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-white/5 px-4 py-2 border border-dashed border-white/10 group-hover:border-accent/30 group-hover:text-accent transition-all duration-500">Internal Dependency</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Notice / Warning */}
      <section className="py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row gap-8 items-center p-8 md:p-10 border border-destructive/30 bg-destructive/5 relative"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
            <div className="w-16 h-16 shrink-0 bg-destructive/20 flex items-center justify-center rounded-full">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-destructive mb-2 uppercase tracking-widest text-sm">Security Notice</h3>
              <p className="text-muted-foreground">
                This library provides <strong className="text-foreground">obfuscation</strong>, not absolute security. 
                It defeats basic extensions, DOM inspection, and simple JS injection. 
                It <strong className="text-destructive">does not</strong> protect against low-level keyloggers, network traffic inspection, 
                or determined reverse-engineering. Always pair with robust server-side validation and rate limiting.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Implementation Section - Interactive Framework Switcher */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            variants={FADE_UP_ANIMATION_VARIANTS} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Implementation is minimal.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">One component. Total isolation. Zero friction.</p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_2fr] gap-4 items-stretch max-w-6xl mx-auto min-h-[450px]">
            {/* Left Side: Framework Tiles - Horizontal on mobile */}
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide h-full">
              {FRAMEWORKS.map((fw) => (
                <motion.button
                  key={fw.id}
                  className={`relative p-6 lg:p-8 text-left border transition-all duration-500 group shrink-0 lg:flex-1 min-w-[200px] lg:min-w-0 flex flex-col justify-center overflow-hidden ${
                    fw.id === selectedFw ? 'border-accent bg-accent/[0.03]' : 'border-white/5 bg-white/[0.01] hover:border-white/20'
                  }`}
                  onClick={() => {
                    setSelectedFw(fw.id);
                    posthog.capture("framework_switched", { framework: fw.id });
                  }}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono text-accent">{fw.version}</span>
                  </div>
                  
                  <div className="relative z-10">
                    <div 
                      className="mb-4 transition-all duration-500 group-hover:scale-105"
                      style={{ color: fw.id === selectedFw ? fw.color : 'rgba(255,255,255,0.3)' }}
                    >
                      {fw.icon}
                    </div>
                    <h4 className={`font-display font-bold text-lg lg:text-xl mb-1 transition-colors ${fw.id === selectedFw ? 'text-white' : 'text-muted-foreground group-hover:text-zinc-200'}`}>
                      {fw.name}
                    </h4>
                    <p className="text-[10px] text-muted-foreground/60 leading-relaxed max-w-[180px]">
                      {fw.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4 flex items-center gap-2">
                    <div 
                      className="w-1 h-1 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: fw.id === selectedFw ? fw.color : 'rgba(255,255,255,0.1)',
                        boxShadow: fw.id === selectedFw ? `0 0 10px ${fw.color}` : 'none'
                      }}
                    />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground/40">Active Instance</span>
                  </div>

                  {fw.id === selectedFw && (
                    <motion.div 
                      layoutId="active-fw-pill"
                      className="absolute inset-0 bg-accent/[0.03] z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Side: Code Window */}
            <div className="relative group w-full min-w-0 h-full flex flex-col">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 via-transparent to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              
              <div className="relative border border-white/10 bg-black shadow-2xl overflow-hidden rounded-xl h-full flex flex-col flex-1">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5 shrink-0">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={selectedFw}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/60"
                      >
                        {FRAMEWORKS.find(f => f.id === selectedFw)?.file}
                      </motion.span>
                    </AnimatePresence>
                    <button 
                      onClick={() => {
                        const code = FRAMEWORKS.find(f => f.id === selectedFw)?.code;
                        if (code) navigator.clipboard.writeText(code);
                      }}
                      className="p-2 hover:bg-white/5 rounded-md transition-colors group/copy"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground group-hover/copy:text-accent transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Code Content - Fixed height to prevent layout shift */}
                <div className="relative flex-1 bg-black/40">
                  <div className="absolute inset-0 p-6 lg:p-8 overflow-auto">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={selectedFw}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <pre className="text-xs lg:text-sm font-mono leading-[1.6] text-zinc-400">
                          <code dangerouslySetInnerHTML={{ 
                            __html: (FRAMEWORKS.find(f => f.id === selectedFw)?.code || '')
                              .replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/import/g, '<span class="text-accent">import</span>')
                              .replace(/from/g, '<span class="text-accent">from</span>')
                              .replace(/export/g, '<span class="text-accent">export</span>')
                              .replace(/function/g, '<span class="text-accent">function</span>')
                              .replace(/const/g, '<span class="text-accent">const</span>')
                              .replace(/await/g, '<span class="text-blue-400">await</span>')
                              .replace(/async/g, '<span class="text-accent">async</span>')
                              .replace(/return/g, '<span class="text-accent">return</span>')
                              .replace(/"([^"]+)"/g, '<span class="text-zinc-300">"$1"</span>')
                              .replace(/\/\/.*$/gm, '<span class="text-zinc-600">$&</span>')
                          }} />
                        </pre>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            variants={FADE_UP_ANIMATION_VARIANTS}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link 
              href="/docs" 
              onClick={() => posthog.capture("view_docs_clicked", { section: "implementation" })}
              className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors group"
            >
              <span>View Documentation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/30 overflow-hidden">
        <motion.div 
          className="container mx-auto px-6 max-w-4xl"
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about protecting your checkout flow.</p>
          </motion.div>

          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="font-display hover:text-accent hover:no-underline">How do I block the Honey extension from stealing coupon codes?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Extensions like Honey scan the standard React DOM and input field <code className="bg-white/10 px-1 py-0.5 rounded text-white">value</code> attributes. Secure Input moves the plain text processing off the main thread into an isolated Web Worker, meaning these extensions only ever see the encrypted ciphertext.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="font-display hover:text-accent hover:no-underline">Does this prevent users from manually sharing promo codes?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No. Secure Input specifically targets automated DOM scraping and browser extensions. If a legitimate user wants to copy and paste a code to a friend on Reddit, they still can. This library is designed to stop automated mass-leaking at checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="font-display hover:text-accent hover:no-underline">Is this library compatible with React and Next.js checkouts?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, absolutely. We provide a dedicated <code className="bg-white/10 px-1 py-0.5 rounded text-white">@secure-input/react</code> package that handles the Web Worker lifecycle automatically, making it incredibly easy to drop into Next.js, Create React App, or Vite projects.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="font-display hover:text-accent hover:no-underline">Can DOM inspectors read the plain text?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  By the time the React state updates, the value has already been sent to the Web Worker and encrypted. The raw string never persists in the observable DOM or standard React DevTools state.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="font-display font-bold text-sm text-muted-foreground">Secure Input</span>
          </div>
          <p className="text-xs text-muted-foreground font-display uppercase tracking-widest">
            MIT License &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
