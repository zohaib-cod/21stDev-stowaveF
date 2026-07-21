"use client";

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

export const saveUser = (user, token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    window.dispatchEvent(new Event("auth-change"));
  }
};

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