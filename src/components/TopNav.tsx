'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useMapStore } from '@/store/mapStore';

const navItems = [
  { label: 'خريطة تفاعلية', href: '/' },
  { label: 'هندسة الطرق', href: '/road-engineering' },
  { label: 'الكميات والتكلفة', href: '/quantity-cost' },
];

export default function TopNav() {
  const pathname = usePathname();
  const transferred = useMapStore((s) => s?.transferred);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-bold text-base text-primary hidden sm:block">RoadSurvey</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems?.map((item) => {
            const isActive =
              item?.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item?.href);
            return (
              <Link
                key={`nav-${item?.href}`}
                href={item?.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item?.label}
              </Link>
            );
          })}
        </nav>
        {transferred && (
          <span className="hidden md:flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-md">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
            بيانات الخريطة محفوظة
          </span>
        )}
      </div>
    </header>
  );
}