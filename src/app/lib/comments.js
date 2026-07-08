// // Simple localStorage based comments store

// const STORAGE_KEY = "product_comments";

// function getAllComments() {
//   if (typeof window === "undefined") return {};
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : {};
//   } catch {
//     return {};
//   }
// }

// function saveAllComments(data) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// }

// // Get comments for a specific product slug
// export function getComments(slug) {
//   const all = getAllComments();
//   return all[slug] || [];
// }

// // Add a new comment for a product slug
// export function addComment(slug, comment) {
//   const all = getAllComments();
//   const existing = all[slug] || [];
//   const newComment = {
//     id: Date.now().toString(),
//     name: comment.name?.trim() || "Anonymous",
//     text: comment.text.trim(),
//     date: new Date().toISOString(),
//   };
//   all[slug] = [newComment, ...existing];
//   saveAllComments(all);
//   return all[slug];
// }










"use client";

// Simple localStorage-based comments store, keyed by product slug.
// Swap the internals of these two functions for real API calls
// whenever you add a backend for comments.

const COMMENTS_KEY = "product_comments";

function getAllComments() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllComments(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(data));
  } catch {
    // ignore write errors
  }
}

export function getCommentsForProduct(slug) {
  const all = getAllComments();
  return all[slug] || [];
}

export function addCommentToProduct(slug, { text, userName }) {
  const all = getAllComments();
  const list = all[slug] || [];
  const newComment = {
    id: Date.now().toString(),
    text,
    userName: userName || "Anonymous",
    createdAt: new Date().toISOString(),
  };
  all[slug] = [newComment, ...list];
  saveAllComments(all);
  return newComment;
}