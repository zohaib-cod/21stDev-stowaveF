// COMPONENT: Navbar (AcmeHero) 

"use client";

import React, { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

export default function AcmeHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ====== LIVE SESSION CAPTURE PIPELINE ======
  useEffect(() => {
    const checkUserAuthStatus = () => {
      const savedUser = localStorage.getItem("stowave_user");
      const savedToken = localStorage.getItem("stowave_user_token");
      
      if (savedUser && savedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // Initial load checks execution
    checkUserAuthStatus();

    window.addEventListener("auth-change", checkUserAuthStatus);
    return () => window.removeEventListener("auth-change", checkUserAuthStatus);
  }, []);

  return (
    <div className="w-full max-w-full mx-auto px-4">
      <header className="relative pt-4">
        <nav className="flex items-center justify-between rounded-xl bg-background py-2 px-4 shadow-lg border border-border">
          <div className="flex items-center space-x-6">
            
            {/* Logo Link with Fixed Absolute Path Slash */}
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/black-red-transparent.png" 
                alt="Stowave Logo"
                width={120}           
                height={40}          
                className="object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Home
              </a>
              <a
                href="/regularFitt"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Regular Fitt
              </a>
              <a
                href="/overSized"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Oversized
              </a>
              <a
                href="/sweatShirt"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                SweatShirt
              </a>
              <a
                href="/aboutUs"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                About Us
              </a>
              <a
                href="/contactUs"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Vertical Separator Line */}
            <div className="h-6 w-[1px] bg-border" />
            
            {/* =======================================================================
                ✅ DESKTOP ROUTING FILTER: User state authentication determines destination route link
               ======================================================================= */}
            <Link
              href={isLoggedIn ? "/profile" : "/signUp"}
              className={`hidden md:inline-flex h-10 px-2 items-center text-sm font-normal transition-colors ${
                isLoggedIn ? "text-blue-500 hover:text-blue-600" : "text-muted-foreground/60 hover:text-foreground/80"
              }`}
            >
              <BsPersonCircle className="h-6 w-6" />
            </Link>

            <Link
              href="/bag"
              className="hidden md:inline-flex h-7 items-center gap-1.5 rounded-full bg-foreground px-3 text-sm font-normal text-background hover:bg-foreground/90 transition-colors"
            >
              Bag <HiOutlineShoppingBag className="h-4 w-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="h-7 w-7 flex items-center justify-center md:hidden text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <Menu className="h-[15px] w-[15px]" />
            </button>

            {/* Mobile Sidebar Drawer */}
            {isOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
                <div 
                  className="absolute right-0 top-0 h-full w-[240px] sm:w-[300px] bg-background p-6 shadow-xl border-l border-border flex flex-col space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setIsOpen(false)} className="self-end p-1 rounded-md hover:bg-muted text-foreground transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                  <nav className="flex flex-col space-y-4 pt-4">
                    <a href="/" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Home</a>
                    <a href="/regularFitt" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Regular Fitt</a>
                    <a href="/overSized" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Oversized</a>
                    <a href="/sweatShirt" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">SweatShirt</a>
                    <a href="/aboutUs" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">About Us</a>
                    <a href="/contactUs" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Contact Us</a>
                    
                    {/* =======================================================================
                        ✅ MOBILE MOBILE ROUTING RE-DIRECTION LAYER
                       ======================================================================= */}
                    <Link
                      href={isLoggedIn ? "/profile" : "/signUp"}
                      onClick={() => setIsOpen(false)}
                      className={`text-left h-7 text-sm font-normal transition-colors ${
                        isLoggedIn ? "text-blue-500 font-medium" : "text-muted-foreground/60 hover:text-foreground/80"
                      }`}
                    >
                      {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
                    </Link>

                    <Link 
                      href="/bag"
                      onClick={() => setIsOpen(false)}
                      className="h-9 flex items-center justify-center rounded-full bg-foreground px-3 text-sm font-normal text-background hover:bg-foreground/90 transition-colors"
                    >
                      Bag <HiOutlineShoppingBag className="inline ml-1"/> 
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}