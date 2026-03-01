import { CodeBlock } from "@/components/CodeBlock";
import { DocsPagination } from "@/components/DocsPagination";

export default function DocsPage() {
  return (
    <div className="prose prose-invert prose-zinc max-w-4xl font-body">
      <h1 className="font-display tracking-tighter">Introduction</h1>
      <p className="text-xl text-muted-foreground font-light leading-relaxed">
        <strong>Secure Input</strong> is a lightweight, framework-agnostic library that uses WebAssembly encryption and Web Workers to protect sensitive input data from browser extensions and client-side scrapers.
      </p>

      <hr className="border-white/10 my-8" />

      <h2 className="font-display">The Problem</h2>
      <p>
        Modern browsers are filled with extensions that help users by scraping the DOM. While tools like Honey or Capital One Shopping are great for consumers, they act as automated bots that can scrape and leak exclusive discount codes, single-use coupons, or referral links right out of your checkout flow.
      </p>
      <p>
        Standard input fields leave this data completely exposed in the DOM as plain text, allowing any extension with <code>activeTab</code> permissions to read it.
      </p>

      <h2 className="font-display">The Solution</h2>
      <p>
        Secure Input changes this by moving the sensitive data off the main thread. It intercepts keystrokes, sends them to a dedicated Web Worker, and uses a Rust-compiled WebAssembly module to encrypt the data instantly. Only the <em>encrypted ciphertext</em> is ever exposed to the React state or the DOM.
      </p>

      <DocsPagination 
        next={{ href: "/docs/how-it-works", title: "How It Works" }}
      />
    </div>
  );
}