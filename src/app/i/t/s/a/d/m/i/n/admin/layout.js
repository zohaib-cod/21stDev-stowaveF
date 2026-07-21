"use client"; 
import React from 'react';
import { usePathname } from 'next/navigation'; 
import { Sidebar } from './sidebar'; 
export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Check karein ga k kia user login page par hai
  const isLoginPage = pathname.endsWith("/login");

  return (
    // 1. Poore container ko screen ki height pr lock kiya
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      
      {/* 2. Sidebar sirf tabhi dikhay ga jab user login page pr NAHI hoga */}
      {!isLoginPage && (
        <aside className="sticky top-0 h-full flex-shrink-0 z-40">
          <Sidebar />
        </aside>
      )}
      
      {/* 3. Main content right side pr scrollable framework k sath */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0 h-full">
        {children}
      </main>
    </div>
  );
}
