// src/lib/auth.js (or wherever your auth file is located)
export const saveUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stowave_user', JSON.stringify(user));
    // Trigger a custom event or state reload so the navbar reflects the changes
    window.dispatchEvent(new Event('auth-change'));
  }
};
