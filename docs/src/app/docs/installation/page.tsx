import { CodeBlock } from "@/components/CodeBlock";
import { PackageManagerCode } from "@/components/PackageManagerCode";
import { DocsPagination } from "@/components/DocsPagination";

export default function InstallationPage() {
  return (
    <div className="prose prose-invert prose-zinc max-w-4xl font-body">
      <h1 className="font-display tracking-tighter">Installation</h1>
      <p className="text-xl text-muted-foreground font-light leading-relaxed">
        Choose the package that fits your technology stack. Secure Input is built to be modular so you only ship what you need.
      </p>

      <hr className="border-white/10 my-8" />

      <h2 className="font-display">React / Next.js</h2>
      <p>
        If you are using React, you should install the <code>@secure-input/react</code> package. This package automatically includes the core logic and provides easy-to-use hooks and drop-in components.
      </p>

      <PackageManagerCode packageName="@secure-input/react" />

      <h2 className="font-display mt-12">Vanilla JavaScript / Other Frameworks</h2>
      <p>
        If you are using Vue, Svelte, Angular, or plain HTML/JS, you should install the framework-agnostic <code>@secure-input/core</code> package.
      </p>

      <PackageManagerCode packageName="@secure-input/core" />

      <h2 className="font-display mt-12">Bundle Sizes</h2>
      <p>
        The library is highly optimized for performance and minimal network impact. WebAssembly and Web Worker files are lazy-loaded dynamically.
      </p>
      
      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[#121212] border border-white/10 font-display">
            <tr>
              <th className="px-6 py-4 font-bold border-r border-white/10">Package</th>
              <th className="px-6 py-4 font-bold border-r border-white/10">Environment</th>
              <th className="px-6 py-4 font-bold">Gzipped Size</th>
            </tr>
          </thead>
          <tbody className="border border-white/10 bg-black/50">
            <tr className="border-b border-white/10">
              <td className="px-6 py-4 border-r border-white/10"><code className="bg-transparent p-0 text-accent">@secure-input/react</code></td>
              <td className="px-6 py-4 border-r border-white/10 text-muted-foreground">Client (React)</td>
              <td className="px-6 py-4">~5KB</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="px-6 py-4 border-r border-white/10"><code className="bg-transparent p-0 text-accent">@secure-input/core</code></td>
              <td className="px-6 py-4 border-r border-white/10 text-muted-foreground">Client (Vanilla JS)</td>
              <td className="px-6 py-4">~15KB</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-r border-white/10"><code className="bg-transparent p-0 text-accent">@secure-input/wasm</code></td>
              <td className="px-6 py-4 border-r border-white/10 text-muted-foreground">Worker Thread</td>
              <td className="px-6 py-4">~10KB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsPagination 
        prev={{ href: "/docs/how-it-works", title: "How It Works" }}
        next={{ href: "/docs/react", title: "React Implementation" }}
      />
    </div>
  );
}