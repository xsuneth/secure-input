import { DocsSidebar } from "@/components/DocsSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Lock, GitBranch, BookText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center px-6">
          <div className="md:hidden mr-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] border-white/10 bg-background sm:w-[400px]">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <Lock className="h-5 w-5 text-accent" />
                  <span className="font-display text-lg font-bold tracking-tight">Secure Input</span>
                </div>
                <DocsSidebar />
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center gap-2 mr-auto">
            <Lock className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-bold tracking-tight hidden sm:inline-block">Secure Input</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="font-display text-xs uppercase tracking-wider">
                <BookText className="mr-2 h-4 w-4" />
                Docs
              </Button>
            </Link>
            <Link href="https://github.com/xSuneth/secure-input" target="_blank">
              <Button variant="ghost" size="sm" className="font-display text-xs uppercase tracking-wider">
                <GitBranch className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8 border-r border-white/5">
            <DocsSidebar />
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] px-6 md:px-0">
          <div className="mx-auto w-full min-w-0 pb-24 lg:pb-32">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}