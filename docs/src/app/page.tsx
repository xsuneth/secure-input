"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Cpu, FileCode2, Lock, GitBranch, ArrowRight, Check, Copy, BookText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
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
              <Button asChild size="lg" className="h-14 px-12 font-display uppercase tracking-widest text-xs bg-accent text-accent-foreground hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(var(--color-accent),0.5)] transition-all duration-300 rounded-none btn-shine group cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2">
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

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Card className="h-full p-8 rounded-none border-white/10 bg-card transition-colors tech-border gradient-hover-card">
                <Cpu className="w-8 h-8 mb-6 text-accent" />
                <h3 className="font-display font-bold text-xl mb-3">WASM Encryption</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Utilizes ChaCha20Poly1305 authenticated encryption compiled from Rust to WebAssembly for maximum performance and a higher barrier to reverse-engineering.
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Card className="h-full p-8 rounded-none border-white/10 bg-card transition-colors tech-border gradient-hover-card">
                <Shield className="w-8 h-8 mb-6 text-accent" />
                <h3 className="font-display font-bold text-xl mb-3">Worker Isolation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Sensitive processing occurs entirely in a separate Web Worker thread. Only the encrypted payload is accessible to browser extensions inspecting the DOM.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Card className="h-full p-8 rounded-none border-white/10 bg-card transition-colors tech-border gradient-hover-card">
                <FileCode2 className="w-8 h-8 mb-6 text-accent" />
                <h3 className="font-display font-bold text-xl mb-3">Framework Agnostic</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Usable anywhere. Core library works in Vanilla JS, with first-class React hooks and components provided out of the box.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Packages Section */}
      <section className="py-24 overflow-hidden">
        <motion.div 
          className="container mx-auto px-6"
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="md:w-1/3">
              <h2 className="font-display text-3xl font-bold mb-4">Packages</h2>
              <p className="text-muted-foreground mb-8">Modular design allows you to import exactly what you need.</p>
            </motion.div>
            
            <div className="md:w-2/3 flex flex-col gap-4 w-full">
              <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="p-6 border border-white/10 bg-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-white/30 transition-all">
                <div>
                  <h4 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                    @secure-input/core
                    <Badge variant="secondary" className="bg-white/10 text-xs rounded-none">~15KB</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground">Framework-agnostic core library + Web Worker.</p>
                </div>
                <code className="text-xs bg-white/5 p-2 text-accent font-display">npm i @secure-input/core</code>
              </motion.div>

              <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="p-6 border border-white/10 bg-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-white/30 transition-all">
                <div>
                  <h4 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                    @secure-input/react
                    <Badge variant="secondary" className="bg-white/10 text-xs rounded-none">~5KB</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground">React hooks and wrapper components.</p>
                </div>
                <code className="text-xs bg-white/5 p-2 text-accent font-display">npm i @secure-input/react</code>
              </motion.div>

              <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="p-6 border border-white/10 bg-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-white/30 transition-all">
                <div>
                  <h4 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                    @secure-input/wasm
                    <Badge variant="secondary" className="bg-white/10 text-xs rounded-none">~10KB</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground">Underlying ChaCha20 encryption module.</p>
                </div>
                <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">Internal Dep</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
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

      {/* Quick Start / Code */}
      <section className="py-24 bg-background overflow-hidden">
        <motion.div 
          className="container mx-auto px-6"
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
           <motion.h2 variants={FADE_UP_ANIMATION_VARIANTS} className="font-display text-3xl font-bold mb-12 text-center">Implementation is minimal.</motion.h2>
           
           <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="max-w-3xl mx-auto border border-white/10 bg-black">
             <div className="flex border-b border-white/10 px-4 py-3 items-center gap-2 bg-white/5">
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
               <span className="ml-4 font-display text-xs text-muted-foreground">CouponForm.tsx</span>
             </div>
             <div className="p-6 overflow-x-auto">
               <pre className="text-sm font-display leading-relaxed text-zinc-300">
                 <code>
<span className="text-accent">import</span> {"{ SecureInput }"} <span className="text-accent">from</span> <span className="text-zinc-400">"@secure-input/react"</span>;{"\n\n"}
<span className="text-accent">export function</span> CouponForm() {"{\n"}
{"  "}const handleSubmit = <span className="text-accent">async</span> (encryptedValue: <span className="text-zinc-400">string</span>) ={">"} {"{\n"}
{"    "}// Plain text is never exposed here.{"\n"}
{"    "}await <span className="text-blue-400">fetch</span>(<span className="text-zinc-400">"/api/validate"</span>, {"{\n"}
{"      "}method: <span className="text-zinc-400">"POST"</span>,{"\n"}
{"      "}body: encryptedValue,{"\n"}
{"    });\n"}
{"  };\n\n"}
{"  "}return ({"\n"}
{"    <"}<span className="text-blue-400">SecureInput</span>{"\n"}
{"      "}placeholder=<span className="text-zinc-400">"Enter coupon code"</span>{"\n"}
{"      "}onEncryptedSubmit={"{handleSubmit}"}{"\n"}
{"    />\n"}
{"  );\n"}
{"}"}
                 </code>
               </pre>
             </div>
           </motion.div>
        </motion.div>
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
