import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MainNav } from './main-nav';
import { BookText } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button variant="ghost" className="h-10 w-full justify-start px-2">
            <BookText className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold font-headline">
              LexiLearn
            </span>
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add header content here, e.g., breadcrumbs */}
          </div>
          {/* Can add user menu here */}
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
