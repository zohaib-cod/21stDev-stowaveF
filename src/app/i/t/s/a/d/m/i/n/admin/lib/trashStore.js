// NOT A ROUTE — helper file (no URL of its own).
// Used by: app/orders/page.jsx and app/orders/trash/page.jsx
//
// Manages which orders are in the Trash, plus the date/time each one was trashed.
// Backed by localStorage for now; swap readAll/writeAll for API calls once a
// backend exists (see ordersTodo notes in pdfGenerator/statusStore for the pattern).

const STORAGE_KEY = "stowave_order_trash_v1";
const EVENT_NAME = "stowave-order-trash-changed";

function readAll() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(map) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function notify(detail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }));
}

// Returns { [orderId]: { trashedAt: ISOString } } for every trashed order.
export function getTrashMap() {
  return readAll();
}

export function isTrashed(orderId) {
  const all = readAll();
  return Boolean(all[orderId]);
}

export function moveToTrash(orderId) {
  const all = readAll();
  all[orderId] = { trashedAt: new Date().toISOString() };
  writeAll(all);
  notify({ type: "trash", orderId });
}

export function moveManyToTrash(orderIds) {
  const all = readAll();
  const now = new Date().toISOString();
  orderIds.forEach((id) => {
    all[id] = { trashedAt: now };
  });
  writeAll(all);
  notify({ type: "trash-bulk", orderIds });
}

export function restoreFromTrash(orderId) {
  const all = readAll();
  delete all[orderId];
  writeAll(all);
  notify({ type: "restore", orderId });
}

export function permanentlyDelete(orderId) {
  const all = readAll();
  delete all[orderId];
  writeAll(all);
  notify({ type: "permanent-delete", orderId });
}

export function subscribeToTrashChanges(callback) {
  if (typeof window === "undefined") return () => {};
  const handler = (e) => callback(e.detail);
  window.addEventListener(EVENT_NAME, handler);
  const storageHandler = (e) => {
    if (e.key === STORAGE_KEY) callback(null);
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}