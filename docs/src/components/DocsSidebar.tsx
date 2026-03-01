"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/how-it-works", label: "How It Works" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/react", label: "React Implementation" },
  { href: "/docs/vanilla", label: "Vanilla JS Implementation" },
  { href: "/docs/server", label: "Server-Side Decryption" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full space-y-6">
      <div>
        <h4 className="mb-2 px-2 font-display text-sm font-bold tracking-widest text-muted-foreground uppercase">
          Getting Started
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex w-full items-center rounded-none border-l-2 border-transparent px-4 py-2 hover:bg-white/5",
                  isActive
                    ? "border-accent bg-white/5 font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}