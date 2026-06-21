"use client";

const AUTH_KEY = "auth_user";

export function saveUser(user) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    // Let other components (e.g. navbar) in the same tab know auth changed
    window.dispatchEvent(new Event("auth-changed"));
  } catch (err) {
    console.error("Could not save user to localStorage:", err);
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Could not read user from localStorage:", err);
    return null;
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("auth-changed"));
  } catch (err) {
    console.error("Could not clear user from localStorage:", err);
  }
}