"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const basePath = "/i/t/s/a/d/m/i/n/admin";

  // const handleLogin = (e) => {
  //   e.preventDefault();
    
    // Stowave credentials
  //   if (username === "stowave_admin" && password === "stowave_secure_2026") {
  //     document.cookie = "stowave_admin_session=true; path=/; max-age=86400"; // 24 Hours lock open
  //     router.push(basePath); // Redirect to main dashboard straight
  //   } else {
  //     setError('Invalid username or password!');
  //   }
  // };
// app/i/t/s/a/d/m/i/n/admin/login/page.jsx k andar handleLogin function ko is se replace karein:
const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      // Create session code lock open
      document.cookie = "stowave_admin_session=true; path=/; max-age=86400"; 
      router.push(basePath);
    } else {
      setError(data.message || 'Invalid username or password!');
    }
  } catch (err) {
    setError('Cannot connect to backend server. Ensure node server.js is running!');
  }
};


  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-slate-900 px-4 z-[9999]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto shadow-md">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Stowave Portal Lock</h2>
          <p className="mt-2 text-sm text-slate-500">Sign in to access secure clothing admin tools.</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-md font-medium">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900" placeholder="Enter admin username" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 px-4 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors shadow-md">
            Unlock Portal
          </button>
        </form>
      </div>
    </div>
  );
}
