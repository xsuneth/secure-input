"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-4 w-4 text-accent" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}