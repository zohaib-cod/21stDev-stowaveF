// "use client";

// // Simple placeholder auth helper using localStorage.
// // If you already have a real login/auth system in your app,
// // replace the functions below with calls to that system instead.

// const AUTH_KEY = "app_current_user";

// export function getCurrentUser() {
//   if (typeof window === "undefined") return null;
//   try {
//     const raw = localStorage.getItem(AUTH_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function isLoggedIn() {
//   return !!getCurrentUser();
// }

// export function loginUser(user) {
//   if (typeof window === "undefined") return;
//   try {
//     localStorage.setItem(AUTH_KEY, JSON.stringify(user));
//   } catch {
//     // ignore write errors
//   }
// }

// export function logoutUser() {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem(AUTH_KEY);
// }











"use client";

// Auth helper using localStorage.
// 🟢 FIX: pehle isLoggedIn()/getCurrentUser() key "app_current_user" check kar rahe
// thay, jabke asal login flow "stowave_user" key mein data save karta hai — isi
// mismatch ki wajah se comment box hamesha "login required" dikhata tha chahe
// user login ho ya na ho. Ab dono ek hi key use karte hain.

const AUTH_KEY = "stowave_user";
const TOKEN_KEY = "stowave_user_token";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

// 🟢 Session save karne wala asli helper (login page isko call karega)
export const saveUser = (user, token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    // Header/navbar jaise components ko turant batao ke auth state badal gayi
    window.dispatchEvent(new Event("auth-change"));
  }
};

// 🟢 Backward-compatible alias — agar kahin loginUser() use ho raha ho
export function loginUser(user, token) {
  saveUser(user, token);
}

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event("auth-change"));
  }
};