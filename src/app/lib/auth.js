// // Dynamic helper to save verified session to browser memory
// export const saveUser = (user, token) => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem("stowave_user", JSON.stringify(user));
//     if (token) {
//       localStorage.setItem("stowave_user_token", token);
//     }
//     // Alert the globally mounted header navbar component instantly
//     window.dispatchEvent(new Event("auth-change"));
//   }
// };

// // Pure dynamic helper to safely delete session on logout actions
// export const logoutUser = () => {
//   if (typeof window !== 'undefined') {
//     localStorage.removeItem("stowave_user");
//     localStorage.removeItem("stowave_user_token");
//     window.dispatchEvent(new Event("auth-change"));
//   }
// };






"use client";

// Simple placeholder auth helper using localStorage.
// If you already have a real login/auth system in your app,
// replace the functions below with calls to that system instead.

const AUTH_KEY = "app_current_user";

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

export function loginUser(user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch {
    // ignore write errors
  }
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}