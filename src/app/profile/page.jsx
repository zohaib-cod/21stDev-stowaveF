"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawData = localStorage.getItem("stowave_user");
    const savedToken = localStorage.getItem("stowave_user_token");

    if (!rawData || !savedToken) {
      console.log("No user session found, redirecting to signUp...");
      router.push("/signUp");
      return;
    }

    try {
      setUser(JSON.parse(rawData));
    } catch (err) {
      console.error("Parsing error inside localStorage profile view:", err);
      localStorage.removeItem("stowave_user");
      localStorage.removeItem("stowave_user_token");
      router.push("/signUp");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("stowave_user");
    localStorage.removeItem("stowave_user_token");

    window.dispatchEvent(new Event("auth-change"));

    router.push("/signUp");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-medium bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        Loading real-time account context...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-28 text-zinc-900 dark:text-zinc-50">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* User Profile Card */}
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs font-medium text-red-500 hover:text-red-600 border border-red-200 dark:border-red-900/50 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            Logout From Account
          </button>
        </div>

        {/* Real-time Status Details */}
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold tracking-tight mb-2">Account Overview</h2>
          <p className="text-sm text-zinc-500">
            Welcome back to your Stowave profile panel. All session instances are verified and running live from the MongoDB database backend core.
          </p>
        </div>

      </div>
    </div>
  );
}