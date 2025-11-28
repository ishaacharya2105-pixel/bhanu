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
  Gamepad2,
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
  {
    href: '/games',
    icon: <Gamepad2 />,
    label: 'Games',
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
