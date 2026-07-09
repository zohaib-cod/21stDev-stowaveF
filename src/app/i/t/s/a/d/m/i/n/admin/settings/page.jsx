// "use client";
// import React, { useState } from 'react';
// import { Shield, KeyRound, User, CheckCircle2, AlertCircle } from 'lucide-react';

// export default function AdminSettings() {
//   const [username, setUsername] = useState('stowave_admin'); // Current preview username
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   const [status, setStatus] = useState({ type: '', message: '' });
//   const [loading, setLoading] = useState(false);

//   const handleUpdateSettings = async (e) => {
//     e.preventDefault();
//     setStatus({ type: '', message: '' });

//     // 1. Client-side validations
//   //   if (newPassword !== confirmPassword) {
//   //     setStatus({ type: 'error', message: 'New password and confirm password do not match!' });
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     // Baad me hum yahan real Backend API hit kren gy backend save k liye
//   //     // const res = await fetch('/api/admin/update-credentials', { method: 'POST', body: JSON.stringify({...}) });
      
//   //     // Temporary Success Simulation for test
//   //     setTimeout(() => {
//   //       setStatus({ type: 'success', message: 'Portal credentials updated successfully in real-time!' });
//   //       setCurrentPassword('');
//   //       setNewPassword('');
//   //       setConfirmPassword('');
//   //       setLoading(false);
//   //     }, 1000);

//   //   } catch (err) {
//   //     setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
//   //     setLoading(false);
//   //   }
//   // };

// // app/i/t/s/a/d/m/i/n/admin/settings/page.jsx k andar handleUpdateSettings function ko is se replace karein:
// const handleUpdateSettings = async (e) => {
//   e.preventDefault();
//   setStatus({ type: '', message: '' });

//   if (newPassword !== confirmPassword) {
//     setStatus({ type: 'error', message: 'New password and confirm password do not match!' });
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await fetch('http://localhost:5000/api/admin/update', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         currentUsername: "stowave_admin", // Baad me isay auth state se recover kr skty hain
//         newUsername: username,
//         currentPassword: currentPassword,
//         newPassword: newPassword
//       })
//     });

//     const data = await response.json();

//     if (data.success) {
//       setStatus({ type: 'success', message: 'Portal credentials updated in database in real-time!' });
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } else {
//       setStatus({ type: 'error', message: data.message || 'Failed to update credentials.' });
//     }
//   } catch (err) {
//     setStatus({ type: 'error', message: 'Failed to communicate with database server.' });
//   } finally {
//     setLoading(false);
//   }
// };

// return (
//     <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
//       {/* Top Header Section */}
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portal Settings</h1>
//         <p className="text-slate-500 text-sm mt-1">Manage your Stowave administrative profile and real-time security logs.</p>
//       </div>

//       {/* Main Alert Message Status Area */}
//       {status.message && (
//         <div className={`p-4 rounded-lg border flex items-center space-x-3 text-sm font-medium ${
//           status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
//         }`}>
//           {status.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />}
//           <span>{status.message}</span>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Left Side: Info Meta Cards */}
//         <div className="space-y-4">
//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
//             <div className="flex items-center space-x-2.5 text-slate-900 font-bold mb-2">
//               <Shield className="h-5 w-5 text-slate-800" />
//               <h2>Security Level</h2>
//             </div>
//             <p className="text-slate-500 text-xs leading-relaxed">Changing these credentials will instantly update the gate locks. Your active session will remain tokenized for 24 hours.</p>
//           </div>
//         </div>

//         {/* Right Side: Real-time Form Management Console */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <form onSubmit={handleUpdateSettings} className="space-y-6">
            
//             {/* Username block */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
//                 <User className="h-4 w-4 text-slate-400" /> Admin Username
//               </label>
//               <input 
//                 type="text" 
//                 required 
//                 value={username} 
//                 onChange={(e) => setUsername(e.target.value)} 
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium text-sm bg-slate-50"
//               />
//             </div>

//             <div className="border-t border-slate-100 my-4 pt-4">
//               <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
//                 <KeyRound className="h-4 w-4 text-slate-400" /> Change Password
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-slate-600">Current Password</label>
//                   <input 
//                     type="password" 
//                     required 
//                     value={currentPassword} 
//                     onChange={(e) => setCurrentPassword(e.target.value)} 
//                     className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm"
//                     placeholder="Enter current portal password"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs font-semibold text-slate-600">New Password</label>
//                     <input 
//                       type="password" 
//                       required 
//                       value={newPassword} 
//                       onChange={(e) => setNewPassword(e.target.value)} 
//                       className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm"
//                       placeholder="Minimum 8 characters"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs font-semibold text-slate-600">Confirm New Password</label>
//                     <input 
//                       type="password" 
//                       required 
//                       value={confirmPassword} 
//                       onChange={(e) => setConfirmPassword(e.target.value)} 
//                       className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm"
//                       placeholder="Repeat new password"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons Submit Block */}
//             <div className="flex justify-end pt-4 border-t border-slate-100">
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="px-5 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-sm flex items-center"
//               >
//                 {loading ? 'Saving Changes...' : 'Update Portal Secrets'}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
//   }
// }



















"use client";
import React, { useState } from 'react';
import { Shield, KeyRound, User, CheckCircle2, AlertCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminSettings() {
  const [username, setUsername] = useState('stowave_admin'); // Current preview username
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // app/i/t/s/a/d/m/i/n/admin/settings/page.jsx k andar handleUpdateSettings function
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'New password and confirm password do not match!' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUsername: "stowave_admin", // Baad me isay auth state se recover kr skty hain
          newUsername: username,            // 🟢 username change bhi isi call mein bhej raha hai
          currentPassword: currentPassword,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Portal credentials updated in database in real-time!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to update credentials.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to communicate with database server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portal Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your Stowave administrative profile and real-time security logs.</p>
      </div>

      {/* Main Alert Message Status Area */}
      {status.message && (
        <div className={`p-4 rounded-lg border flex items-center space-x-3 text-sm font-medium ${
          status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Info Meta Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2.5 text-slate-900 font-bold mb-2">
              <Shield className="h-5 w-5 text-slate-800" />
              <h2>Security Level</h2>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">Changing these credentials will instantly update the gate locks. Your active session will remain tokenized for 24 hours.</p>
          </div>
        </div>

        {/* Right Side: Real-time Form Management Console */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <form onSubmit={handleUpdateSettings} className="space-y-6">

            {/* Username block */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="h-4 w-4 text-slate-400" /> Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium text-sm bg-slate-50"
              />
            </div>

            <div className="border-t border-slate-100 my-4 pt-4">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                <KeyRound className="h-4 w-4 text-slate-400" /> Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm"
                    placeholder="Enter current portal password"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm"
                      placeholder="Minimum 8 characters"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm"
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Submit Block */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-sm flex items-center"
              >
                {loading ? 'Saving Changes...' : 'Update Portal Secrets'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}