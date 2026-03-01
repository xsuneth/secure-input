"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface PackageManagerCodeProps {
  packageName: string;
}

export function PackageManagerCode({ packageName }: PackageManagerCodeProps) {
  const [manager, setManager] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm");
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: `npm install ${packageName}`,
    pnpm: `pnpm add ${packageName}`,
    yarn: `yarn add ${packageName}`,
    bun: `bun add ${packageName}`,
  };

  const currentCommand = commands[manager];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 max-w-full overflow-hidden border border-white/10 bg-[#121212]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-2">
        <div className="flex font-display text-xs">
          {(["npm", "pnpm", "yarn", "bun"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setManager(m)}
              className={`px-4 py-3 border-b-2 transition-colors hover:text-white ${
                manager === m
                  ? "border-accent text-white font-bold"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-none border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="px-4 py-3 overflow-x-auto font-display text-sm text-zinc-300">
        <pre className="!bg-transparent !p-0">
          <code>
            <span className="text-accent">{manager}</span> {manager === "npm" ? "install" : "add"} <span className="text-zinc-400">{packageName}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}