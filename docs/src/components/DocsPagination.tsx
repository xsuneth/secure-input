import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationLink {
  href: string;
  title: string;
}

interface DocsPaginationProps {
  prev?: PaginationLink;
  next?: PaginationLink;
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  return (
    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex w-full sm:w-1/2 flex-col items-start gap-1 rounded-none border border-white/10 bg-black p-4 transition-colors hover:border-white/30"
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase flex items-center gap-1">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Previous
          </span>
          <span className="font-display font-bold text-accent">{prev.title}</span>
        </Link>
      ) : (
        <div className="w-full sm:w-1/2 hidden sm:block"></div>
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex w-full sm:w-1/2 flex-col items-end gap-1 rounded-none border border-white/10 bg-black p-4 transition-colors hover:border-white/30 text-right ml-auto"
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase flex items-center gap-1">
            Next
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="font-display font-bold text-accent">{next.title}</span>
        </Link>
      ) : (
        <div className="w-full sm:w-1/2 hidden sm:block"></div>
      )}
    </div>
  );
}