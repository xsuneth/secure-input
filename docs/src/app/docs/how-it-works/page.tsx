import type { Metadata } from "next";
import { DocsPagination } from "@/components/DocsPagination";
import { Cpu, Shield, FileCode2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand Secure Input architecture: keystroke capture, worker isolation, and WASM encryption flow.",
  alternates: {
    canonical: "/docs/how-it-works",
  },
  openGraph: {
    title: "How Secure Input Works",
    description: "Architecture walkthrough of worker-based isolation and WASM-powered encryption.",
    url: "https://secure-input.vercel.app/docs/how-it-works",
    type: "article",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="prose prose-invert prose-zinc max-w-4xl font-body">
      <h1 className="font-display tracking-tighter">How It Works</h1>
      <p className="text-xl text-muted-foreground font-light leading-relaxed">
        Secure Input changes the paradigm of form handling by ensuring the raw text value never exists in the main thread's React state or the DOM in a way that is easily scannable by external scripts.
      </p>

      <hr className="border-white/10 my-8" />

      <h2 className="font-display">The Architecture Flow</h2>
      
      <ol className="mt-8 space-y-6 list-none pl-0">
        <li className="relative">
          <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-display text-xs font-bold">1</div>
          <div className="ml-10">
            <strong className="text-white block mb-1">Keystroke Capture</strong>
            As the user types, each keystroke is intercepted immediately at the input level before typical React or Vanilla JS state updates occur.
          </div>
        </li>
        <li className="relative">
          <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-display text-xs font-bold">2</div>
          <div className="ml-10">
            <strong className="text-white block mb-1">Worker Isolation</strong>
            The plain text is sent to an isolated Web Worker. This means the sensitive processing occurs completely off the main thread, making it invisible to extensions inspecting the standard DOM or window object.
          </div>
        </li>
        <li className="relative">
          <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-display text-xs font-bold text-accent">3</div>
          <div className="ml-10">
            <strong className="text-accent block mb-1">WASM Encryption</strong>
            Inside the worker, a highly optimized, Rust-compiled WebAssembly module uses ChaCha20Poly1305 to instantly encrypt the payload.
          </div>
        </li>
        <li className="relative">
          <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-display text-xs font-bold">4</div>
          <div className="ml-10">
            <strong className="text-white block mb-1">Safe Output</strong>
            The main thread only ever receives and holds the <em>encrypted ciphertext</em>. The plain text never touches the form's `value` attribute or the generic component state.
          </div>
        </li>
      </ol>

      <h2 className="font-display mt-16">The Three Packages</h2>
      <p>
        The project is broken down into three modular packages to keep bundle sizes incredibly small:
      </p>
      
      <div className="grid md:grid-cols-3 gap-4 not-prose mt-8">
              <Card className="p-6 rounded-none border-white/10 bg-card transition-colors tech-border h-full gradient-hover-card">
          <FileCode2 className="w-6 h-6 mb-4 text-accent" />
          <h3 className="font-display font-bold text-lg mb-2">@secure-input/core</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            The framework-agnostic engine that manages the Web Worker and encryption lifecycle. Use this in Vanilla JS or other frameworks.
          </p>
        </Card>
        
              <Card className="p-6 rounded-none border-white/10 bg-card transition-colors tech-border h-full gradient-hover-card">
          <Cpu className="w-6 h-6 mb-4 text-accent" />
          <h3 className="font-display font-bold text-lg mb-2">@secure-input/react</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Lightweight hooks and components wrapping the core for seamless React and Next.js integration.
          </p>
        </Card>

              <Card className="p-6 rounded-none border-white/10 bg-card transition-colors tech-border h-full gradient-hover-card">
          <Shield className="w-6 h-6 mb-4 text-accent" />
          <h3 className="font-display font-bold text-lg mb-2">@secure-input/wasm</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            The raw ChaCha20 encryption module. (You typically do not interact with this directly, it's used internally).
          </p>
        </Card>
      </div>

      <div className="my-16 rounded-none border-l-4 border-accent bg-accent/5 p-6 text-sm">
        <h4 className="mt-0 font-display font-bold text-accent uppercase tracking-widest text-xs mb-2">Security Notice</h4>
        <p className="mb-0 text-muted-foreground">
          This library provides <strong>obfuscation</strong>, not absolute security. It raises the bar significantly against automated scrapers and basic extensions, making it annoying enough that standard bots fail. However, determined attackers with reverse-engineering skills, network traffic inspectors, or low-level OS keyloggers can still extract data. <strong>Always implement server-side validation and rate limiting.</strong>
        </p>
      </div>

      <DocsPagination 
        prev={{ href: "/docs", title: "Introduction" }}
        next={{ href: "/docs/installation", title: "Installation" }}
      />
    </div>
  );
}