"use client";
import React from "react";
import { usePathname } from "next/navigation";
import AcmeHero from "../components/navbar/Navbar"; // Agar path ka issue ho tou correct kr lein
import { Footer7 } from "../components/Footer/Footer";
import ChatAssistant from "../components/hopingAssistant/assistant";
import VisitorTracker from "../components/VisitorTracker";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/i/t/s/a/d/m/i/n/admin");

  return (
    <>
      {/* 0. Live Visitor Tracking — sirf storefront pages pe, admin panel pe nahi */}
      {!isAdminPage && <VisitorTracker />}

      {/* 1. Global Fixed Layer Container — Admin page pr nahi dikhay ga */}
      {!isAdminPage && (
        <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
          <AcmeHero />
        </div>
      )}

      {/* 2. Chat Assistant — Admin page pr nahi dikhay ga */}
      {!isAdminPage && <ChatAssistant />}

      {/* 3. Page Content Render Area */}
      <main className="relative min-h-screen">
        {children}

        {/* Footer — Admin page pr nahi dikhay ga */}
        {!isAdminPage && <Footer7 />}
      </main>
    </>
  );
}