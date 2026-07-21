"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsPersonCircle } from "react-icons/bs";
import { LogOut } from "lucide-react";
import { getUser, clearUser } from "../lib/auth";

export default function ProfileIcon() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

 
  useEffect(() => {
    setUser(getUser());

    const syncUser = () => setUser(getUser());
    window.addEventListener("auth-changed", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("auth-changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    clearUser();
    setUser(null);
    setOpen(false);
    router.push("/");
  };

  if (!user) {
    return (
      <Link
        href="/signUp"
        className="hidden md:inline-flex h-10 px-2 items-center text-sm font-normal text-muted-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <BsPersonCircle className="h-6 w-6" />
      </Link>
    );
  }

  return (
    <div className="relative hidden md:inline-flex" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="h-10 px-2 inline-flex items-center text-sm font-normal text-muted-foreground/60 hover:text-foreground/80 transition-colors"
      >
        <BsPersonCircle className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg py-2 z-50"
        >
          <div className="px-3.5 py-2 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
              {user.name}
            </p>
            {user.email && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {user.email}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}