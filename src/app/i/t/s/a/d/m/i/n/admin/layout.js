import React from 'react';
import { Sidebar } from './sidebar'; // Ensure path is correct based on folder

export default function AdminLayout({ children }) {
  return (
    // 1. Poore container ko screen ki height pr lock kiya
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      
      {/* 2. Sidebar ko left side pr sticky aur h-full kiya taake ye fix rhe */}
      <aside className="sticky top-0 h-full flex-shrink-0 z-40">
        <Sidebar />
      </aside>
      
      {/* 3. Main content right side pr scrollable framework k sath */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0 h-full">
        {children}
      </main>
    </div>
  );
}
