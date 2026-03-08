import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { DocsPagination } from "@/components/DocsPagination";

export const metadata: Metadata = {
  title: "React Implementation",
  description: "Integrate Secure Input in React and Next.js using the SecureInput component or useSecureInput hook.",
  alternates: {
    canonical: "/docs/react",
  },
  openGraph: {
    title: "Secure Input for React",
    description: "Implementation guide for @secure-input/react with component and hook examples.",
    url: "https://secure-input.vercel.app/docs/react",
    type: "article",
  },
};

export default function ReactPage() {
  return (
    <div className="prose prose-invert prose-zinc max-w-4xl font-body">
      <h1 className="font-display tracking-tighter">React Implementation</h1>
      <p className="text-xl text-muted-foreground font-light leading-relaxed">
        The <code>@secure-input/react</code> package provides both a high-level drop-in component and a low-level hook to give you maximum flexibility.
      </p>

      <hr className="border-white/10 my-8" />

      <h2 className="font-display">Option 1: The SecureInput Component</h2>
      <p>
        The easiest way to get started is using the pre-built <code>&lt;SecureInput /&gt;</code> wrapper. It handles the Web Worker initialization and state management for you automatically.
      </p>

      <CodeBlock 
        filename="CouponForm.tsx"
        code={`import { SecureInput } from "@secure-input/react";

export function CouponForm() {
  const handleSubmit = async (encryptedValue: Uint8Array | string) => {
    // 1. You receive the encrypted payload
    // 2. Send it securely to your backend
    
    const response = await fetch("/api/validate-coupon", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: encryptedValue,
    });

    const result = await response.json();
    console.log("Coupon valid:", result.valid);
  };

  return (
    <SecureInput
      placeholder="Enter your secret coupon code"
      onEncryptedSubmit={handleSubmit}
      showStatus={true} 
      className="border-accent"
    />
  );
}`} 
        lang="tsx"
      />

      <h3 className="font-display mt-8">Component Props</h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[#121212] border border-white/10 font-display">
            <tr>
              <th className="px-6 py-4 font-bold border-r border-white/10">Prop</th>
              <th className="px-6 py-4 font-bold border-r border-white/10">Type</th>
              <th className="px-6 py-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody className="border border-white/10 bg-black/50">
            <tr className="border-b border-white/10">
              <td className="px-6 py-4 border-r border-white/10"><code className="bg-transparent p-0 text-accent">onEncryptedSubmit</code></td>
              <td className="px-6 py-4 border-r border-white/10"><code>(encrypted: string) =&gt; void</code></td>
              <td className="px-6 py-4 text-muted-foreground">Called on Enter key or internal form submit. Passes the cipher text.</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="px-6 py-4 border-r border-white/10"><code className="bg-transparent p-0">showStatus</code></td>
              <td className="px-6 py-4 border-r border-white/10"><code>boolean</code></td>
              <td className="px-6 py-4 text-muted-foreground">Optional. Defaults to true. Shows visual indicator of WASM loading state.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-r border-white/10"><code className="bg-transparent p-0">inputProps</code></td>
              <td className="px-6 py-4 border-r border-white/10"><code>React.InputHTMLAttributes</code></td>
              <td className="px-6 py-4 text-muted-foreground">Optional. Standard HTML input attributes to spread onto the internal input field.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-display mt-16">Option 2: The useSecureInput Hook</h2>
      <p>
        If you need to build a custom UI (like integrating into a complex form library like React Hook Form), use the <code>useSecureInput</code> hook. This gives you manual control over exactly when encryption happens.
      </p>

      <CodeBlock 
        filename="CustomCheckoutForm.tsx"
        code={`import { useSecureInput } from "@secure-input/react";
import { useState } from "react";

export function CustomCheckoutForm() {
  const [plainTextInput, setPlainTextInput] = useState("");
  
  // Initialize the worker hook
  const { encrypt, isReady, error } = useSecureInput({
    autoInit: true,
    debug: false,
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isReady) return;

    // Trigger encryption right before network request
    const encryptedPayload = await encrypt(plainTextInput);
    
    // Clear the plain text state immediately for safety
    setPlainTextInput(""); 

    await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ coupon: encryptedPayload })
    });
  };

  return (
    <form onSubmit={handleCheckout}>
      <input
        type="text"
        value={plainTextInput}
        onChange={(e) => setPlainTextInput(e.target.value)}
        disabled={!isReady}
        placeholder="Discount code"
      />
      <button type="submit" disabled={!isReady}>
        Apply & Checkout
      </button>
      
      {error && <p className="text-red-500">Encryption failed to load.</p>}
    </form>
  );
}`} 
        lang="tsx"
      />
      
      <p className="mt-4 text-sm text-muted-foreground border-l-2 border-white/20 pl-4">
        <strong>Best Practice:</strong> When using the hook, manually clear your React state (e.g. <code>setPlainTextInput("")</code>) immediately after you have generated the encrypted payload. This minimizes the window of time the plain text exists in memory.
      </p>

      <DocsPagination 
        prev={{ href: "/docs/installation", title: "Installation" }}
        next={{ href: "/docs/vanilla", title: "Vanilla JS Implementation" }}
      />
    </div>
  );
}