'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BookText,
  Album,
  ClipboardCheck,
} from 'lucide-react';

const navItems = [
  {
    href: '/',
    icon: <LayoutDashboard />,
    label: 'Dashboard',
  },
  {
    href: '/vocabulary',
    icon: <BookText />,
    label: 'Vocabulary',
  },
  {
    href: '/flashcards',
    icon: <Album />,
    label: 'Flashcards',
  },
  {
    href: '/quizzes',
    icon: <ClipboardCheck />,
    label: 'Quizzes',
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            }
            tooltip={{
              children: item.label,
              className: 'bg-primary text-primary-foreground',
            }}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
