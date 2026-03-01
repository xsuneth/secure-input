import { codeToHtml } from "shiki";
import { Copy } from "lucide-react";
import { CodeCopyButton } from "./CodeCopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({ code, lang = "typescript", filename }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
  });

  return (
    <div className="my-6 max-w-full overflow-hidden rounded-none border border-white/10 bg-[#121212]">
      {filename && (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-white/20"></div>
            <div className="h-3 w-3 rounded-full bg-white/20"></div>
            <div className="h-3 w-3 rounded-full bg-white/20"></div>
            <span className="ml-4 font-display text-xs text-muted-foreground">{filename}</span>
          </div>
          <CodeCopyButton code={code} />
        </div>
      )}
      <div className="relative group">
        {!filename && (
          <div className="absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <CodeCopyButton code={code} />
          </div>
        )}
        <div 
          className="overflow-x-auto p-4 font-display text-sm leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}